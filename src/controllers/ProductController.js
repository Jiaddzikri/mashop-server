import { StatusCodes } from 'http-status-codes';
import {
	createProduct as createProductService,
	findProduct as findProductService,
	getProductDetail as getProductDetailService,
} from '../services/productService.js';

export const createProductController = async (req, res) => {
	try {
		const params = req.body;

		const response = await createProductService(params);

		return res.status(StatusCodes.CREATED).json({
			message: 'product succesfully created',
			data: response,
		});
	} catch (err) {
		console.log(err.message);
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const findProductController = async (req, res) => {
	try {
		const query = req?.query;

		const response = await findProductService(query);

		return res.status(StatusCodes.OK).json({
			message: 'product found',
			data: response,
		});
	} catch (err) {
		return res.status(err.status).json({
			message: err.message,
		});
	}
};

export const getProductDetailController = async (req, res) => {
	try {
		const { productId } = req.params;

		const response = await getProductDetailService({ productId });
		return res.status(StatusCodes.OK).json({
			message: 'product detail found',
			data: response,
		});
	} catch (error) {
		return res.status(error.status).json({
			message: error.message,
		});
	}
};
