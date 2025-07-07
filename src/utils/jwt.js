import errorThrower from "./errorThrower.js";
import loadKeys from "./loadKeys.js";
import * as jose from "jose";

export const createToken = async ({ payload, issuer }) => {
	try {
		const { publicKey } = await loadKeys();
		const jwt = await new jose.CompactEncrypt(
			new TextEncoder().encode(JSON.stringify(payload))
		)
			.setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
			.encrypt(publicKey);

		return jwt;
	} catch (error) {
		errorThrower(error);
	}
};

export const validateToken = async (token) => {
	try {
		const { privateKey } = await loadKeys();
		const { plainText, protectedHeader } = await jose.compactDecrypt(
			token,
			privateKey
		);

		return JSON.parse(new TextDecoder().decode(plainText));
	} catch (error) {
		errorThrower(error);
	}
};
