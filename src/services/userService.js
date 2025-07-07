import BaseError from '../exception/BaseError.js';
import db from '../models/index.js';
import errorThrower from '../utils/errorThrower.js';
import { StatusCodes } from 'http-status-codes';
import { createToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';

const { User, Role, UserRole, Seller, Address } = db;

const actualEmailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/;
const actualPhoneRegex = /^(?:\+62|08)\d{9,11}$/;

export const register = async ({
	username,
	fullname,
	email_or_phone_number,
	password,
}) => {
	try {
		const isEmail = actualEmailRegex.test(email_or_phone_number);
		const isPhoneNumber = actualPhoneRegex.test(email_or_phone_number);
		const form = {
			username,
			password_hash: password,
			full_name: fullname,
		};
		if (isPhoneNumber) {
			const isUserExist = await User.findOne({
				where: {
					phone_number: email_or_phone_number,
				},
			});
			if (isUserExist) {
				throw new BaseError({
					status: StatusCodes.BAD_REQUEST,
					message: 'phone number already used',
				});
			}
			form['phone_number'] = email_or_phone_number;
		}

		if (isEmail) {
			const isUserExist = await User.findOne({
				where: { email: email_or_phone_number },
			});
			if (isUserExist) {
				throw new BaseError({
					status: StatusCodes.BAD_REQUEST,
					message: 'email already used',
				});
			}
			form['email'] = email_or_phone_number;
		}

		const findRole = await Role.findOne({
			where: {
				name: 'customer',
			},
		});

		const createdUser = await db.sequelize.transaction(async () => {
			const user = await User.create(form);
			await UserRole.create({
				user_id: user.id,
				role_id: findRole.id,
			});

			const findUser = await UserRole.findOne({
				where: {
					user_id: user.id,
				},
				include: [
					{
						model: User,
						as: 'user',
						attributes: [
							'id',
							'username',
							'email',
							'phone_number',
							'full_name',
						],
					},
					{
						model: Role,
						as: 'role',
						attributes: ['name'],
					},
				],
			});

			return {
				id: findUser.user.id,
				username: findUser.user.username,
				email: findUser.user.email,
				phone_number: findUser.user.phone_number,
				full_name: findUser.user.full_name,
				role: findUser.role.name,
			};
		});

		const token = await createToken({
			payload: {
				id: createdUser.id,
				username: createdUser.username,
			},
		});

		return {
			data: createdUser,
			token: token,
		};
	} catch (err) {
		errorThrower(err);
	}
};

export const login = async ({ email_or_phone_number, password }) => {
	try {
		const user = await findUserByEmailOrPhone(email_or_phone_number);

		validateUserCredentials(user, password);

		const userWithRole = await getUserWithRoleDetails(user.id);

		const token = await createToken({
			payload: {
				id: user.id,
				username: user.username,
			},
		});
		const response = buildUserResponse(userWithRole);

		return {
			data: response,
			token,
		};
	} catch (err) {
		errorThrower(err);
	}
};
const findUserByEmailOrPhone = async (emailOrPhone) => {
	const isEmail = actualEmailRegex.test(emailOrPhone);
	const isPhoneNumber = actualPhoneRegex.test(emailOrPhone);

	if (!isEmail && !isPhoneNumber) {
		throw new BaseError({
			status: StatusCodes.BAD_REQUEST,
			message: 'Invalid email or phone number format',
		});
	}

	const whereClause = isEmail
		? { email: emailOrPhone }
		: { phone_number: emailOrPhone };

	const user = await User.findOne({ where: whereClause });

	if (!user) {
		throw new BaseError({
			status: StatusCodes.UNAUTHORIZED,
			message: 'username or password is wrong',
		});
	}

	return user;
};

const validateUserCredentials = (user, password) => {
	if (!bcrypt.compareSync(password, user.password_hash)) {
		throw new BaseError({
			status: StatusCodes.UNAUTHORIZED,
			message: 'username or password is wrong',
		});
	}
};

const getUserWithRoleDetails = async (userId) => {
	const userWithRole = await UserRole.findOne({
		where: { user_id: userId },
		include: [
			{
				model: User,
				as: 'user',
				attributes: ['id', 'username', 'email', 'phone_number', 'full_name'],
				include: [
					{
						model: Seller,
						as: 'seller',
						attributes: ['id'],
					},
				],
			},
			{
				model: Role,
				as: 'role',
				attributes: ['name'],
			},
		],
	});

	if (!userWithRole) {
		throw new BaseError({
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: 'User role not found',
		});
	}

	return userWithRole;
};

const buildUserResponse = (userWithRole) => {
	const response = {
		id: userWithRole.user.id,
		username: userWithRole.user.username,
		email: userWithRole.user.email,
		phone_number: userWithRole.user.phone_number,
		full_name: userWithRole.user.full_name,
		role: userWithRole.role.name,
	};

	if (userWithRole.user?.seller?.id) {
		response.seller_id = userWithRole.user.seller.id;
	}

	return response;
};

export const findProfile = async ({ id }) => {
	try {
		const findProfile = await User.findOne({
			where: {
				id: id,
			},
			attributes: [
				'id',
				'username',
				'email',
				'full_name',
				'phone_number',
				'profile_picture_url',
			],
			include: [
				{
					model: Address,
					as: 'addresses',
					attributes: [
						'id',
						'address_line',
						'postal_code',
						'province',
						'city',
						'country',
						'is_shipping_address',
					],
				},
			],
		});

		return findProfile;
	} catch (err) {
		errorThrower(err);
	}
};

export const updateProfile = async ({
	id,
	username,
	full_name,
	email,
	phone_number,
}) => {
	try {
		await db.sequelize.transaction(async (t) => {
			await User.update(
				{
					username,
					email,
					full_name,
					phone_number,
					email,
				},
				{
					where: {
						id,
					},
				},
				{
					transaction: t,
				}
			);
		});

		const findUser = await User.findOne({
			where: {
				id,
			},
			attributes: ['id', 'full_name', 'email', 'phone_number', 'username'],
		});
		return findUser;
	} catch (err) {
		errorThrower(err);
	}
};

export const createAddress = async ({
	user_id,
	address_line,
	city,
	province,
	country,
	postal_code,
	is_shipping_address,
}) => {
	try {
		const findUser = await User.findOne({
			where: {
				id: user_id,
			},
		});

		if (!findUser)
			throw new BaseError({
				status: StatusCodes.NOT_FOUND,
				message: 'user not found',
			});

		const createUserAddress = await db.sequelize.transaction(async (t) => {
			return await Address.create(
				{
					user_id,
					province,
					address_line,
					country,
					postal_code,
					city,
					is_shipping_address,
				},
				{
					transaction: t,
				}
			);
		});

		return createUserAddress;
	} catch (err) {
		console.log(err);
		errorThrower(err);
	}
};

export const findUserAddress = async ({ id }) => {
	try {
		const findUser = await User.findOne({
			where: {
				id,
			},
		});

		if (!findUser)
			throw new BaseError({
				status: StatusCodes.UNAUTHORIZED,
				message: 'user not found',
			});

		const address = Address.findOne({
			where: {
				user_id: id,
			},
			attributes: [
				'id',
				'address_line',
				'province',
				'postal_code',
				'country',
				'is_shipping_address',
			],
		});

		return address;
	} catch (err) {
		console.log(err);
		errorThrower(err);
	}
};
