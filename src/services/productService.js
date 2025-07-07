import { StatusCodes } from 'http-status-codes';
import BaseError from '../exception/BaseError.js';
import db from '../models/index.js';
import errorThrower from './../utils/errorThrower.js';
import { v4 as uuidv4 } from 'uuid';
import { Op, Sequelize } from 'sequelize';

const {
	User,
	Product,
	ProductVariant,
	ProductVariantValue,
	Category,
	ProductImage,
	ProductReview,
	ProductAttribute,
	ProductAttributeValue,
	Seller,
	SellerAddress,
} = db;

export const createProduct = async (params) => {
	const {
		seller_id,
		category_id,
		name,
		price,
		description,
		stock_quantity,
		weight,
		dimensions,
		variants = [],
		images,
	} = params;

	try {
		const findCategory = await Category.findOne({
			where: { id: category_id },
		});

		if (!findCategory) {
			throw new BaseError({
				status: StatusCodes.BAD_REQUEST,
				message: 'category not found',
			});
		}

		const response = await db.sequelize.transaction(async (t) => {
			const createProduct = await Product.create(
				{
					seller_id,
					category_id,
					name,
					price,
					description,
					stock_quantity,
					weight,
					dimensions,
					is_active: 1,
					sku: 'PRD-' + uuidv4(),
					is_deleted: 0,
				},
				{ transaction: t }
			);

			let resolvedImageList = [];

			if (images && images.length > 0) {
				resolvedImageList = await Promise.all(
					images.map(async (image) => {
						const createProductImage = await ProductImage.create(
							{
								product_id: createProduct.id,
								image_url: image.url,
								is_thumbnail: image.is_thumbnail || false,
							},
							{ transaction: t }
						);
						return {
							id: createProductImage.id,
							url: createProductImage.image_url,
							is_thumbnail: createProductImage.is_thumbnail,
						};
					})
				);
			}

			let resolvedVariantList = [];

			if (variants && variants.length > 0) {
				resolvedVariantList = await Promise.all(
					variants.map(async (variant) => {
						const createProductVariant = await ProductVariant.create(
							{
								product_id: createProduct.id,
								sku: variant.sku,
								price_modifier: parseInt(variant.price_modifier),
								stock_quantity: parseInt(variant.stock_quantity),
							},
							{ transaction: t }
						);

						let createdProductVariantValueData = [];
						if (variant.combination.length > 0) {
							const valuesToCreate = variant.combination.map((combo) => {
								return {
									variant_id: createProductVariant.id,
									value_id: combo.value_id,
								};
							});

							const createdValues = await ProductVariantValue.bulkCreate(
								valuesToCreate,
								{
									transaction: t,
								}
							);
							createdProductVariantValueData = createdValues.map((val) => ({
								product_variant_id: val.variant_id,
								attribute_value_id: val.value_id,
							}));
						}

						return {
							id: createProductVariant.id,
							sku: createProductVariant.sku,
							price_modifier: createProductVariant.price_modifier,
							stock_quantity: createProductVariant.stock_quantity,
							product_variant_values: createdProductVariantValueData,
						};
					})
				);
			}

			return {
				id: createProduct.id,
				category_id: createProduct.id,
				seller_id: createProduct.seller_id,
				name: createProduct.name,
				price: createProduct.price,
				sku: createProduct.sku,
				description: createProduct.description,
				dimensions: createProduct.dimensions,
				weight: createProduct.weight,
				stock_quantity: createProduct.stock_quantity,
				variants: resolvedVariantList,
				images: resolvedImageList,
			};
		});

		return response;
	} catch (err) {
		console.log(err);
		errorThrower(err);
	}
};

export const findProduct = async (filters = {}) => {
	try {
		const {
			search,
			categoryId,
			minPrice,
			maxPrice,
			minRating,
			sortBy = 'created_at',
			sortOrder = 'DESC',
			page = 1,
			limit = 12,
			productIds: initialProductIds,
		} = filters;

		const pageNum = parseInt(page) || 1;
		const limitNum = parseInt(limit) || 12;
		const offsetNum = (pageNum - 1) * limitNum;

		const idFindingOptions = {
			where: { is_active: true },
			include: [],
		};

		if (search) idFindingOptions.where.name = { [Op.like]: `%${search}%` };
		if (categoryId) idFindingOptions.where.category_id = categoryId;
		if (initialProductIds && initialProductIds.length > 0) {
			idFindingOptions.where.id = { [Op.in]: initialProductIds };
		}
		if (minPrice || maxPrice) {
			idFindingOptions.where.price = {};
			if (minPrice) idFindingOptions.where.price[Op.gte] = parseFloat(minPrice);
			if (maxPrice) idFindingOptions.where.price[Op.lte] = parseFloat(maxPrice);
		}

		if (minRating) {
			idFindingOptions.include.push({
				model: ProductReview,
				as: 'reviews',
				attributes: [],
				required: true,
			});
			idFindingOptions.group = ['Product.id'];
			idFindingOptions.having = Sequelize.where(
				Sequelize.fn('AVG', Sequelize.col('reviews.rating')),
				{ [Op.gte]: parseFloat(minRating) }
			);
		}

		const { count, rows: productStubs } = await Product.findAndCountAll({
			...idFindingOptions,
			attributes: ['id'],
			order: [[sortBy, sortOrder]],
			limit: limitNum,
			offset: offsetNum,
		});

		const productIds = productStubs.map((p) => p.id);
		const totalItems = Array.isArray(count) ? count.length : count;
		if (productIds.length === 0) {
			return {
				products: [],
				pagination: {
					totalItems: 0,
					totalPages: 0,
					currentPage: pageNum,
					limit: limitNum,
				},
			};
		}

		const finalProducts = await Product.findAll({
			where: { id: { [Op.in]: productIds } },
			attributes: {
				include: [
					[
						Sequelize.literal(
							`(SELECT COUNT(*) FROM product_reviews WHERE product_reviews.product_id = Product.id)`
						),
						'reviewCount',
					],
					[
						Sequelize.literal(
							`(SELECT COALESCE(AVG(rating), 0) FROM product_reviews WHERE product_reviews.product_id = Product.id)`
						),
						'averageRating',
					],
				],
			},
			include: [
				{
					model: ProductImage,
					as: 'thumbnail',
					where: { is_thumbnail: true },
					required: false,
				},
				{ model: Category, as: 'category', attributes: ['id', 'name'] },
			],
			order: [[sortBy, sortOrder]],
		});

		const totalPages = Math.ceil(totalItems / limitNum);

		return {
			products: finalProducts,
			pagination: {
				totalItems: totalItems,
				totalPages,
				currentPage: pageNum,
				limit: limitNum,
			},
		};
	} catch (error) {
		throw error;
	}
};

export const getProductDetail = async ({ productId }) => {
	try {
		const findProduct = await Product.findByPk(productId, {
			include: [
				{
					model: Category,
					as: 'category',
					attributes: ['id', 'name'],
				},
				{
					model: ProductImage,
					as: 'images',
					attributes: ['id', 'image_url', 'is_thumbnail'],
					order: [['is_thumbnail', 'DESC']],
				},
				{
					model: ProductReview,
					as: 'reviews',
					attributes: ['rating', 'comment', 'created_at'],
					include: {
						model: User,
						as: 'user',
						attributes: ['full_name'],
					},
				},
				{
					model: ProductVariant,
					as: 'variants',
					attributes: ['id', 'sku', 'price_modifier', 'stock_quantity'],
					include: {
						model: ProductAttributeValue,
						as: 'attributeValues',
						attributes: ['id', 'name'],
						through: { attributes: [] },
						include: {
							model: ProductAttribute,
							as: 'attribute',
							attributes: ['id', 'name'],
						},
					},
				},
				{
					model: Seller,
					as: 'seller',
					attributes: ['id', 'store_name', 'store_description'],
					include: [
						{
							model: SellerAddress,
							as: 'address',
						},
					],
				},
			],
			distinct: true,
		});

		if (!findProduct) {
			throw new BaseError({
				status: StatusCodes.NOT_FOUND,
				message: 'product not found',
			});
		}
		const availableOptions = {};
		const variantCombinations = [];
		const uniqueValues = new Set();

		if (findProduct.variants && findProduct.variants.length > 0) {
			findProduct.variants.forEach((variant) => {
				const combinationMap = {};

				variant.attributeValues.forEach((attrValue) => {
					const attributeId = attrValue.attribute.id;
					const attributeName = attrValue.attribute.name;
					const valueId = attrValue.id;
					const valueName = attrValue.name;

					if (!availableOptions[attributeName]) {
						availableOptions[attributeName] = {
							id: attributeId,
							name: attributeName,
							values: [],
						};
					}

					const valueKey = `${attributeId}-${valueId}`;
					if (!uniqueValues.has(valueKey)) {
						availableOptions[attributeName].values.push({
							id: valueId,
							attribute_id: attributeId,
							name: valueName,
						});
						uniqueValues.add(valueKey);
					}

					combinationMap[attributeId] = valueId;
				});

				variantCombinations.push({
					id: variant.id,
					sku: variant.sku,
					stock_quantity: variant.stock_quantity,
					price_modifier: variant.price_modifier,
					combination: combinationMap,
				});
			});
		}
		const productJSON = findProduct.toJSON();

		productJSON.variantsData = {
			attributes: Object.values(availableOptions),
			combinations: variantCombinations,
		};

		delete productJSON.variants;
		return { product: productJSON };
	} catch (err) {
		console.log(err);
		errorThrower(err);
	}
};
