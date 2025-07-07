import express from 'express';

import validateRequest from '../../utils/validateRequest.js';
import {
	createSellerAddressValidation,
	createSellerValidation,
} from '../../schema/validation/sellerValidation.js';
import {
	createSellerAddressController,
	createSellerController,
	getSellerProfileController,
} from '../../controllers/SellerController.js';
import { updateSellerProfile } from '../../services/SellerService.js';

const sellerRoutes = express.Router();

sellerRoutes.post(
	'/',
	validateRequest(createSellerValidation()),
	createSellerController
);

sellerRoutes.put('/', validateRequest(updateSellerProfile));

sellerRoutes.get('/:id/profile', getSellerProfileController);

sellerRoutes.post(
	'/:id/address',
	validateRequest(createSellerAddressValidation()),
	createSellerAddressController
);

export default sellerRoutes;
