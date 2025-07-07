import * as fs from "node:fs/promises";
import * as jose from "jose";
import errorThrower from "./errorThrower.js";

const loadKeys = async () => {
	try {
		const privateKeyPath = process.env.PRIVATE_KEY;
		const publicKeyPath = process.env.PUBLIC_KEY;

		const privateKeyPEM = await fs.readFile(privateKeyPath, "utf-8");
		const publicKeyPEM = await fs.readFile(publicKeyPath, "utf-8");

		const privateKey = await jose.importPKCS8(privateKeyPEM, "RS256");
		const publicKey = await jose.importSPKI(publicKeyPEM, "RSA-OAEP-256");

		return { privateKey, publicKey };
	} catch (err) {
		errorThrower(err);
	}
};
export default loadKeys;
