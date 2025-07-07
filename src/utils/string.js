export const generateSlug = (text) => {
	if (!text) return '';
	return text
		.toLowerCase()
		.replace(/\s+/g, '-') // Ganti semua jenis spasi dengan satu tanda hubung
		.replace(/[^\w-]+/g, '') // Hapus semua karakter yang bukan kata atau tanda hubung
		.replace(/--+/g, '-'); // Ganti tanda hubung ganda (jika ada) dengan satu
};
