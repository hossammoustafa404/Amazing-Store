import { Category, Product, ProductImage } from "../entities";
import { AppDataSource } from "../config/db";
import {
  CreateProductDto,
  ProductsFilterQuery,
  UpdateProductDto,
} from "../interfaces/products";
import cloudinary from "../config/cloudinary";
import * as fs from "fs";
import { NotFoundError } from "../lib/errors";
import { getCategoryService } from "./categories";
import uploadToCloud from "../lib/uploadToCloud";

// Get Repositories
const categoryRepo = AppDataSource.getRepository(Category);
const productRepo = AppDataSource.getRepository(Product);
const productImgRepo = AppDataSource.getRepository(ProductImage);
/**
 * Create Product Service
 * @param {CreateProductDto} createProductDto
 * @returns {{product:Product}} result object
 */
export const createProductService = async (
  categoryId: string,
  createProductDto: CreateProductDto,
  images: any
) => {
  // Get Category
  const { category } = await getCategoryService(categoryId);

  // Upload Images To Cloud
  const imgsUrls = await uploadToCloud(images);

  // Save Images
  let productImgs = [];
  for await (const imgUrl of imgsUrls) {
    const productImage = new ProductImage();
    productImage.url = imgUrl;
    await productImgRepo.save(productImage);
    productImgs.push(productImage);
  }

  // // Upload Images To Cloadinary And Save To Database
  // let imgs = [];
  // for await (const img of images) {
  //   const result = await cloudinary.uploader.upload(img.path, {
  //     upload_preset: "amazing_store",
  //   });
  //   const productImage = new ProductImage();
  //   productImage.url = result.secure_url;
  //   await productImgRepo.save(productImage);
  //   imgs.push(productImage);
  //   fs.unlinkSync(img.path);
  // }

  // Create Product
  const product = new Product();
  product.category = category;
  product.images = productImgs;
  Object.assign(product, createProductDto);

  // Save Product
  await productRepo.save(product);

  return { product };
};

/**
 *  Get Product By Id Service
 * @param {string} productId
 * @returns {{product:Product}} result object
 */
export const getProductService = async (productId: string) => {
  // Get Product
  const product = await productRepo
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.images", "product_images")
    .leftJoinAndSelect("product.category", "category")
    .where("product.id = :productId", { productId })
    .getOne();

  // Throw error if product does not exist
  if (!product) {
    throw new NotFoundError("Product does not exist");
  }
  return { product };
};

/**
 * Get Many Products Service
 * @param filterQuery
 * @returns
 */
export const getManyProductsService = async (
  filterQuery: ProductsFilterQuery,
  categoryId: string
) => {
  if (categoryId) {
    filterQuery.category = { id: categoryId };
  }

  const [products, count] = await productRepo
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.images", "product_images")
    .leftJoinAndSelect("product.category", "category")
    .where(filterQuery)
    .getManyAndCount();

  return { products, productsCount: count };
};

/**
 *  Update Product Service
 * @param {string} productId
 * @param {UpdateProductDto} updateProductDto
 * @returns {product:Product} result object
 */
export const updateProductService = async (
  productId: string,
  updateProductDto: UpdateProductDto,
  images?: any
) => {
  // Get Product
  let product = await productRepo
    .createQueryBuilder("product")
    .select("*")
    .where("product.id = :productId", { productId })
    .getRawOne();

  // Throw An Error If Product Does Not Exist
  if (!product) {
    throw new NotFoundError("Product does not Exist");
  }

  // Update Images If Provided
  // how ??

  // Update Product And Save
  product = { ...product, ...updateProductDto };

  await productRepo.save(product);

  return { product };
};

/**
 * Delete Product Service
 * @param {string} productId
 * @returns void
 */
export const deleteProductService = async (productId: string) => {
  // Get Product
  const product = await productRepo
    .createQueryBuilder("product")
    .select("*")
    .where("product.id = :productId", { productId })
    .getRawOne();

  // Throw An Error If Product Does Not Exist
  if (!product) {
    throw new NotFoundError("Product does not Exist");
  }

  // Remove Product
  await productRepo.remove(product);

  return;
};
