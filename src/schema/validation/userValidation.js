import Joi from "joi";

export const registerValidation = () => {
	return Joi.object({
		username: Joi.string().required().alphanum().messages({
			"string.base": "username harus berupa teks",
			"string.alphanum": "username hanya boleh terdiri dari angka dan huruf",
			"any.required": "username tidak boleh kosong",
		}),
		fullname: Joi.string().required().messages({
			"string.base": "fullname harus berupa teks",
			"any.required": "fullname tidak boleh kosong",
		}),
		email_or_phone_number: Joi.alternatives()
			.try(
				Joi.string()
					.email({ tlds: { allow: false } })
					.messages({
						"string.base": `"Input" harus berupa teks`,
						"string.email": `"Email" tidak valid. Pastikan formatnya benar (contoh: pengguna@domain.com)`,
					}),

				Joi.string()
					.pattern(/^(08|\+62|62)\d{8,15}$/)
					.messages({
						"string.base": `"Input" harus berupa teks`,
						"string.pattern.base": `"Nomor telepon" tidak valid. Contoh format: 08xxxxxxxxxx atau +628xxxxxxxxxx`,
					})
			)
			.required()
			.messages({
				"any.required": `"Email atau Nomor Telepon" tidak boleh kosong`,
				"alternatives.match": `"Input" harus berupa email yang valid atau nomor telepon yang valid`, // Pesan jika tidak cocok dengan salah satu alternatif
			}),
		password: Joi.string().min(8).required().messages({
			"string.base": `"Password" harus berupa teks`,
			"string.min": `"Password" minimal harus {#limit} karakter`,
			"any.required": `"Password" tidak boleh kosong`,
		}),
	});
};
export const loginValidation = () => {
	return Joi.object({
		email_or_phone_number: Joi.alternatives()
			.try(
				Joi.string()
					.email({ tlds: { allow: false } })
					.messages({
						"string.base": `"Input" harus berupa teks`,
						"string.email": `"Email" tidak valid. Pastikan formatnya benar (contoh: pengguna@domain.com)`,
					}),

				Joi.string()
					.pattern(/^(08|\+62|62)\d{8,15}$/)
					.messages({
						"string.base": `"Input" harus berupa teks`,
						"string.pattern.base": `"Nomor telepon" tidak valid. Contoh format: 08xxxxxxxxxx atau +628xxxxxxxxxx`,
					})
			)
			.required()
			.messages({
				"any.required": `"Email atau Nomor Telepon" tidak boleh kosong`,
				"alternatives.match": `input harus berupa email yang valid atau nomor telepon yang valid`, // Pesan jika tidak cocok dengan salah satu alternatif
			}),
		password: Joi.string().required().messages({
			"string.base": `password harus berupa teks`,
			"any.required": `password tidak boleh kosong`,
		}),
	});
};

export const addressBodySchemaValidation = () => {
	return Joi.object({
		address_line: Joi.string().trim().min(5).max(255).required().messages({
			"string.base": "Baris alamat harus berupa teks",
			"string.empty": "Baris alamat tidak boleh kosong",
			"string.min": "Baris alamat minimal harus {#limit} karakter",
			"string.max": "Baris alamat maksimal harus {#limit} karakter",
			"any.required": "Baris alamat wajib diisi",
		}),

		city: Joi.string().trim().min(3).max(100).required().messages({
			"string.base": "Kota harus berupa teks",
			"string.empty": "Kota tidak boleh kosong",
			"string.min": "Kota minimal harus {#limit} karakter",
			"string.max": "Kota maksimal harus {#limit} karakter",
			"any.required": "Kota wajib diisi",
		}),

		province: Joi.string().trim().min(3).max(100).required().messages({
			"string.base": "Provinsi harus berupa teks",
			"string.empty": "Provinsi tidak boleh kosong",
			"string.min": "Provinsi minimal harus {#limit} karakter",
			"string.max": "Provinsi maksimal harus {#limit} karakter",
			"any.required": "Provinsi wajib diisi",
		}),

		postal_code: Joi.string()
			.trim()
			.pattern(new RegExp("^[0-9]{5}$"))
			.required()
			.messages({
				"string.base": "Kode pos harus berupa teks",
				"string.empty": "Kode pos tidak boleh kosong",
				"string.pattern.base":
					"Format kode pos tidak valid, harus 5 digit angka",
				"any.required": "Kode pos wajib diisi",
			}),

		country: Joi.string().trim().uppercase().required().messages({
			"string.base": "Negara harus berupa teks",
			"string.empty": "Negara tidak boleh kosong",
			"any.required": "Negara wajib diisi",
		}),

		is_shipping_address: Joi.boolean().default(false).messages({
			"boolean.base": "Nilai is_shipping_address harus boolean (true/false)",
		}),
	});
};
