import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class ProductVariant extends Model {
		static associate(models) {
			ProductVariant.belongsTo(models.Product, {
				foreignKey: "product_id",
				as: "product",
			});

			ProductVariant.belongsTo(models.ProductImage, {
				foreignKey: "image_id",
				as: "variantImage",
				allowNull: true,
			});

			ProductVariant.belongsToMany(models.ProductAttributeValue, {
				through: models.ProductVariantValue,
				foreignKey: "variant_id",
				otherKey: "value_id",
				as: "attributeValues",
			});

			ProductVariant.hasMany(models.OrderItem, {
				foreignKey: "variant_id",
				as: "orderItems",
			});
		}

		async getFinalPrice() {
			const product = await this.getProduct();
			if (!product) {
				throw new Error("Produk dasar untuk varian ini tidak ditemukan.");
			}

			const modifier = this.price_modifier || 0;
			return parseFloat(product.price) + parseFloat(modifier);
		}
	}

	ProductVariant.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Products",
					key: "product_id",
				},
			},
			sku: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					name: "unique_variant_sku",
					msg: "SKU varian sudah ada.",
				},
			},
			price_modifier: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: 0.0,
			},
			stock_quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
				validate: {
					min: 0,
				},
			},
			image_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "Product_Images",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "ProductVariant",
			tableName: "product_variants",
			timestamps: false,
		}
	);

	return ProductVariant;
};
