import Joi from "joi";

export const createSellerValidation = () => {
	return Joi.object({
		user_id: Joi.number().required(),
		store_name: Joi.string().required(),
		store_description: Joi.string().required(),
		store_address: Joi.string().required(),
	});
};

export const udpateSellerValidation = () => {
	return Joi.object({
		store_name: Joi.string().required(),
		store_description: Joi.string().required(),
	});
};

export const createSellerAddressValidation = () => {
	return Joi.object({
		location_name: Joi.string().trim().min(3).max(100).required().messages({
			"string.base": "Nama lokasi harus berupa teks",
			"string.empty": "Nama lokasi tidak boleh kosong",
			"string.min": "Nama lokasi minimal harus {#limit} karakter",
			"string.max": "Nama lokasi maksimal harus {#limit} karakter",
			"any.required": "Nama lokasi wajib diisi",
		}),

		phone_number: Joi.string()
			.trim()
			.pattern(/^(08|\+62)\d{8,12}$/)
			.required()
			.messages({
				"string.base": "Nomor telepon harus berupa teks",
				"string.empty": "Nomor telepon tidak boleh kosong",
				"string.pattern.base":
					"Format nomor telepon tidak valid. Gunakan format 08... atau +628...",
				"any.required": "Nomor telepon wajib diisi",
			}),

		address_line: Joi.string().trim().min(10).max(255).required().messages({
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
			.pattern(/^\d{5}$/)
			.required()
			.messages({
				"string.base": "Kode pos harus berupa teks",
				"string.empty": "Kode pos tidak boleh kosong",
				"string.pattern.base":
					"Format kode pos tidak valid, harus 5 digit angka",
				"any.required": "Kode pos wajib diisi",
			}),

		operating_hours: Joi.string()
			.trim()
			.max(255)
			.optional()
			.allow("")
			.messages({
				"string.base": "Jam operasional harus berupa teks",
				"string.max": "Jam operasional maksimal harus {#limit} karakter",
			}),

		is_pickup_point: Joi.boolean().default(false).messages({
			"boolean.base": 'Nilai "is_pickup_point" harus boolean (true atau false)',
		}),
	});
};

export const updateSellerAddressValidation = () => {
	return Joi.object({
		location_name: Joi.string().trim().min(3).max(100).required().messages({
			"string.base": "Nama lokasi harus berupa teks",
			"string.empty": "Nama lokasi tidak boleh kosong",
			"string.min": "Nama lokasi minimal harus {#limit} karakter",
			"string.max": "Nama lokasi maksimal harus {#limit} karakter",
			"any.required": "Nama lokasi wajib diisi",
		}),

		phone_number: Joi.string()
			.trim()
			.pattern(/^(08|\+62)\d{8,12}$/)
			.required()
			.messages({
				"string.base": "Nomor telepon harus berupa teks",
				"string.empty": "Nomor telepon tidak boleh kosong",
				"string.pattern.base":
					"Format nomor telepon tidak valid. Gunakan format 08... atau +628...",
				"any.required": "Nomor telepon wajib diisi",
			}),

		address_line: Joi.string().trim().min(10).max(255).required().messages({
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
			.pattern(/^\d{5}$/)
			.required()
			.messages({
				"string.base": "Kode pos harus berupa teks",
				"string.empty": "Kode pos tidak boleh kosong",
				"string.pattern.base":
					"Format kode pos tidak valid, harus 5 digit angka",
				"any.required": "Kode pos wajib diisi",
			}),

		operating_hours: Joi.string()
			.trim()
			.max(255)
			.optional()
			.allow("")
			.messages({
				"string.base": "Jam operasional harus berupa teks",
				"string.max": "Jam operasional maksimal harus {#limit} karakter",
			}),

		is_pickup_point: Joi.boolean().default(false).messages({
			"boolean.base": 'Nilai "is_pickup_point" harus boolean (true atau false)',
		}),
	});
};
