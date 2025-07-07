import express from 'express';
import {
	createUserAddressController,
	findProfileController,
	getUserAddressController,
	loginController,
	registerController,
	updateProfileController,
} from '../../controllers/UserController.js';
import validateRequest from '../../utils/validateRequest.js';
import {
	addressBodySchemaValidation,
	loginValidation,
	registerValidation,
} from '../../schema/validation/userValidation.js';

const userRoutes = express.Router();

userRoutes.post(
	'/register',
	validateRequest(registerValidation()),
	registerController
);

userRoutes.post('/login', validateRequest(loginValidation()), loginController);
userRoutes.get('/:id/profile', findProfileController);
userRoutes.put('/:id/profile', updateProfileController);
userRoutes.post(
	'/:id/address',
	validateRequest(addressBodySchemaValidation()),
	createUserAddressController
);
userRoutes.get('/:id/address', getUserAddressController);
export default userRoutes;
