import { CartItem } from "../entities";
import { CreateCartItemDto, UpdateCartItemDto } from "../interfaces/cart_items";
import { getProductService } from "./products";
import { upsertCartService } from "./carts";
import { AppDataSource } from "../config/db";
import { NotFoundError } from "../lib/errors";

// Repos
const cartItemRepo = AppDataSource.getRepository(CartItem);

/**
 *
 * @param {string} userId
 * @param {CreateCartItem} createCartItem
 */
export const createCartItemService = async (
  userId: string,
  createCartItem: CreateCartItemDto
) => {
  // Create Cart Item Instance
  const cartItem = new CartItem();

  // Upsert Cart And Assign it
  const { cart } = await upsertCartService(userId);
  cartItem.cart = cart;

  // Get And Assign Product
  const { product } = await getProductService(createCartItem.product_id);
  cartItem.product = product;

  // Save Cart Item
  await cartItemRepo.save(cartItem);

  // Upsert Cart

  return { cartItem };
};

/**
 * Get Cart Item Service
 * @param {string} cartItemId
 */
const getCartItemService = async (cartItemId: string) => {
  const cartItem = await cartItemRepo
    .createQueryBuilder("cart_item")
    .select("*")
    .where("cart_item.id = :cartItemId", { cartItemId })
    .getRawOne();

  // Throw Error If Cart Item Does not Exist
  if (!cartItem) {
    throw new NotFoundError("Cart item does not exist");
  }

  return { cartItem };
};

/**
 * Update Cart Item Service
 * @param {string} cartItemId
 * @param {UpdateCartItemDto} updateCartItemDto
 */
export const updateCartItemService = async (
  cartItemId: string,
  updateCartItemDto: UpdateCartItemDto
) => {
  // Is it better if I use another service (Get Cart Item Service) to do this logic instead???????
  // Get Cart Item
  let { cartItem } = await getCartItemService(cartItemId);

  // Update Cart Item And Save
  cartItem = { ...cartItem, ...updateCartItemDto };
  await cartItemRepo.save(cartItem);

  return { cartItem };
};

/**
 * Delete Cart Item Service
 * @param {string} cartItemId
 */
export const deleteCartItemService = async (cartItemId: string) => {
  // Get Cart Item
  const { cartItem } = await getCartItemService(cartItemId);

  // Remove Cart Item
  await cartItemRepo.remove(cartItem);

  return;
};
