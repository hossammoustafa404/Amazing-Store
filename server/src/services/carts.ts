import { Cart, CartItem } from "../entities";
import { AppDataSource } from "../config/db";
import { getUserService } from "./users";
import { NotFoundError } from "../lib/errors";

// Repos
const cartRepo = AppDataSource.getRepository(Cart);

/**
 * Create Cart Service
 * @param {string} userId
 * @param {CreateCartDto} createCartDto
 */
export const upsertCartService = async (userId: string) => {
  // Create Cart Instance
  let cart = new Cart();

  // Get And Assign User
  const { user } = await getUserService(userId);
  cart.site_user = user;

  await cartRepo.upsert(cart, { conflictPaths: ["site_user.id"] });

  return { cart };
};

/**
 * Get Cart Service
 * @param {string} userId
 */
export const getCartService = async (userId: string) => {
  // Get Cart
  const cart = await cartRepo
    .createQueryBuilder("cart")
    .leftJoinAndSelect("cart.cart_items", "cart_items")
    .leftJoinAndSelect("cart_items.product", "product")
    .where("cart.site_user.id = :userId", { userId })
    .getOne();

  // Throw  Error if Cart Does Not Exist
  if (!cart) {
    throw new NotFoundError("Cart does not exist");
  }

  return { cart };
};

/**
 * Delete Cart Service
 * @param {string} userId
 */
export const deleteCartService = async (userId: string) => {
  // Get Cart
  const { cart } = await getCartService(userId);

  // Remove Cart
  await cartRepo.remove(cart);

  return;
};
