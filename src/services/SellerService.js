import errorThrower from '../utils/errorThrower.js';
import db from '../models/index.js';
import BaseError from '../exception/BaseError.js';
import { StatusCodes } from 'http-status-codes';
import { generateSlug } from '../utils/string.js';

const { Seller, User, Role, UserRole, SellerAddress } = db;

export const createSeller = async ({
	user_id,
	store_name,
	store_description,
	store_address,
}) => {
	try {
		const user = await User.findOne({
			where: {
				id: user_id,
			},
		});

		if (!user) {
			throw new BaseError({
				status: StatusCodes.NOT_FOUND,
				message: 'user not found',
			});
		}

		const seller = await Seller.findOne({
			where: {
				store_name,
			},
		});

		if (seller) {
			throw new BaseError({
				status: StatusCodes.BAD_REQUEST,
				message: 'store name is already used',
			});
		}

		const response = await db.sequelize.transaction(async (t) => {
			const createSeller = await Seller.create(
				{
					user_id: user_id,
					store_name,
					slug: store_name.replace(' ', ''),
					store_address,
					store_description,
					status: 'pending',
				},
				{ transaction: t }
			);
			const findRole = await Role.findOne({
				where: {
					name: 'seller',
				},
			});

			await UserRole.update(
				{
					role_id: findRole.id,
				},
				{
					where: {
						user_id: user_id,
					},
				},
				{
					transaction: t,
				}
			);
			return createSeller;
		});

		return {
			store_name: response.store_name,
			store_address: response.store_address,
			store_description: response.description,
			status: response.status,
		};
	} catch (err) {
		errorThrower(err);
	}
};

export const getSellerProfile = async ({ seller_id }) => {
	try {
		const findSeller = await Seller.findOne({
			where: {
				id: seller_id,
			},
			include: [
				{
					model: SellerAddress,
					as: 'addresses',
					attributes: [
						'id',
						'location_name',
						'phone_number',
						'address_line',
						'city',
						'province',
						'postal_code',
						'operating_hours',
						'is_pickup_point',
					],
				},
			],
			attributes: ['id', 'store_name', 'store_description', 'status'],
		});

		return findSeller;
	} catch (err) {
		errorThrower(err);
	}
};

export const updateSellerProfile = async ({
	id,
	store_name,
	store_description,
}) => {
	try {
		const updatedSeller = await db.sequelize.transaction(async (t) => {
			const [affectedRows] = await Seller.update(
				{
					store_name,
					store_description,
					slug: generateSlug(store_name),
				},
				{
					where: { id },
					transaction: t,
				}
			);

			if (affectedRows === 0) {
				throw new BaseError({
					status: StatusCodes.INTERNAL_SERVER_ERROR,
					message: 'Failed to update seller profile',
				});
			}

			const result = await Seller.findOne({
				where: { id },
				transaction: t,
			});

			return result;
		});

		return updatedSeller.get({ plain: true });
	} catch (err) {
		errorThrower(err);
	}
};

export const createSellerAddress = async ({
	seller_id,
	location_name,
	phone_number,
	address_line,
	city,
	province,
	postal_code,
	operating_hours,
	is_pickup_point,
}) => {
	try {
		const findSeller = Seller.findOne({
			where: {
				id: seller_id,
			},
		});

		if (!findSeller) {
			throw new BaseError({
				status: StatusCodes.UNAUTHORIZED,
				message: 'seller not found',
			});
		}

		const createAddress = await db.sequelize.transaction(async (t) => {
			return await SellerAddress.create(
				{
					seller_id,
					location_name,
					phone_number,
					address_line,
					city,
					province,
					postal_code,
					operating_hours,
					is_pickup_point,
				},
				{ transaction: t }
			);
		});

		return createAddress;
	} catch (err) {
		errorThrower(err);
	}
};

export const updateSellerAddress = async ({
	id,
	location_name,
	phone_number,
	address_line,
	city,
	province,
	postal_code,
	operating_hours,
	is_pickup_point,
}) => {
	try {
		await db.sequelize.transaction(async (t) => {
			return await SellerAddress.update(
				{
					location_name,
					phone_number,
					address_line,
					city,
					province,
					postal_code,
					operating_hours,
					is_pickup_point,
				},
				{
					where: {
						id,
					},
				},
				{ transaction: t }
			);
		});

		const updatedAddress = await SellerAddress.findOne({
			where: {
				id,
			},
			attributes: [
				'id',
				'location_name',
				'phone_number',
				'address_line',
				'city',
				'province',
				'postal_code',
				'operating_hours',
				'is_pickup_point',
			],
		});

		return updateSellerAddress;
	} catch (err) {
		errorThrower(err);
	}
};
