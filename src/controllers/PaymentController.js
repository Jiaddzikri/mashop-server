import midtransClient from "midtrans-client";
import { v4 as uuid4 } from "uuid";

export const addPaymentController = async (req, res) => {
	let snap = new midtransClient.Snap({
		isProduction: false,
		serverKey: process.env.MIDTRANS_SERVER_KEY,
	});

	let parameter = {
		transaction_details: {
			order_id: uuid4(),
			gross_amount: 10000,
		},
		credit_card: {
			secure: true,
		},
		customer_details: {
			first_name: "budi",
			last_name: "pratama",
			email: "budi.pra@example.com",
			phone: "08111222333",
		},
	};
	try {
		const response = await snap.createTransaction(parameter);
		return res.status(201).json(response);
	} catch (error) {
		console.log(error);
	}
};
