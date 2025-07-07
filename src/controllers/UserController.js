import { StatusCodes } from 'http-status-codes';
import {
	register as registerService,
	login as loginService,
	findProfile as findProfileService,
	updateProfile as updateProfileService,
	createAddress as createUserAddressService,
	findUserAddress as findUserAddressService,
} from '../services/userService.js';

export const registerController = async (req, res) => {
	try {
		const { fullname, username, email_or_phone_number, password } = req.body;

		const response = await registerService({
			username,
			email_or_phone_number,
			password,
			fullname,
		});

		return res.status(StatusCodes.CREATED).json(response);
	} catch (error) {
		return res.status(error.status).json({
			message: error.message,
		});
	}
};

export const loginController = async (req, res) => {
	try {
		const { email_or_phone_number, password } = req.body;

		const response = await loginService({ email_or_phone_number, password });

		return res.status(StatusCodes.OK).json(response);
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const findProfileController = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await findProfileService({ id });

		return res.status(StatusCodes.OK).json({
			message: 'profile found',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const updateProfileController = async (req, res) => {
	try {
		const { id } = req.params;
		const { username, full_name, email, phone_number } = req.body;

		const response = await updateProfileService({
			id,
			username,
			full_name,
			email,
			phone_number,
		});

		return res.status(StatusCodes.OK).json({
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const createUserAddressController = async (req, res) => {
	try {
		const { id } = req?.params;
		const {
			address_line,
			city,
			province,
			postal_code,
			country,
			is_shipping_address,
		} = req?.body;

		const response = await createUserAddressService({
			user_id: id,
			address_line,
			city,
			province,
			postal_code,
			country,
			is_shipping_address,
		});

		return res.status(StatusCodes.CREATED).json({
			message: 'address succesfully created',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const getUserAddressController = async (req, res) => {
	try {
		const { id } = req?.params;
		console.log(id);
		const response = await findUserAddressService({ id });

		return res.status(StatusCodes.OK).json({
			message: 'address found',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.status,
		});
	}
};
