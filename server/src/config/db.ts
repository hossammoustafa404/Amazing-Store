import { DataSource } from "typeorm";
import config from "./config";
import {
  SiteUser,
  Address,
  Country,
  RefreshToken,
  Category,
  Product,
  ProductImage,
  Cart,
  CartItem,
} from "../entities";

/**
 * Data source for the database
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.app.env === "development" ? true : false,
  logging: false,
  entities: [
    SiteUser,
    Address,
    Country,
    RefreshToken,
    Category,
    Product,
    ProductImage,
    Cart,
    CartItem,
  ],
  subscribers: [],
  migrations: [],
});

/**
 * Connect to the database function
 * @returns {Promise<DataSource>}

 */
export const connectDB = async () => {
  const dataSource = await AppDataSource.initialize();
  console.log("Connected to database");
  return dataSource;
};
