import { StatusCodes } from 'http-status-codes';
import {
	createSeller as createSellerService,
	getSellerProfile as getSellerProfileService,
	updateSellerProfile as updateSellerProfileService,
	createSellerAddress as createSellerAddressService,
	updateSellerAddress as updateSellerAddressService,
} from '../services/SellerService.js';

export const createSellerController = async (req, res) => {
	try {
		const request = req.body;
		const response = await createSellerService(request);

		return res.status(StatusCodes.CREATED).json({
			message: 'seller created',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const updateSellerController = async (req, res) => {
	try {
		const { id } = req?.params;
		const { store_name, store_description } = req?.body;

		const response = await updateSellerProfileService({
			id,
			store_name,
			store_description,
		});

		return res.status(StatusCodes.OK).json({
			message: 'seller profile successfully updated',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.status,
		});
	}
};

export const updateSellerStatusController = async (req, res) => {
	try {
		const { seller_id, status } = req.body;
		const response = await updateSellerStatusService({ seller_id, status });

		return res.status(StatusCodes.OK).json({
			message: 'seller status updated',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const createSellerAddressController = async (req, res) => {
	try {
		const { id } = req?.params;
		const {
			location_name,
			phone_number,
			address_line,
			city,
			province,
			postal_code,
			operating_hours,
			is_pickup_point,
		} = req?.body;

		const response = await createSellerAddressService({
			seller_id: id,
			location_name,
			phone_number,
			address_line,
			city,
			province,
			postal_code,
			operating_hours,
			is_pickup_point,
		});

		return res.status(StatusCodes.CREATED).json({
			message: 'addresses successfully created',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.status,
		});
	}
};

export const updateSellerAddressController = async (req, res) => {
	try {
		const { id } = req?.params;
		const {
			location_name,
			phone_number,
			address_line,
			city,
			province,
			postal_code,
			operating_hours,
			is_pickup_point,
		} = req?.body;

		const response = await updateSellerAddressService({
			id,
			location_name,
			phone_number,
			address_line,
			city,
			province,
			postal_code,
			operating_hours,
			is_pickup_point,
		});

		return res.status(StatusCodes.CREATED).json({
			message: 'addresses successfully created',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.status,
		});
	}
};

export const getSellerProfileController = async (req, res) => {
	try {
		const { id } = req?.params;

		console.log(id);

		const response = await getSellerProfileService({ seller_id: id });

		return res.status(StatusCodes.OK).json({
			message: 'seller address found',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};
