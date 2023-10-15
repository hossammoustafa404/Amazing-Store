import { AppDataSource } from "../config/db";
import {
  AddressesFilterQuery,
  CreateAddressDto,
} from "../interfaces/addresses";
import { Address, Country, SiteUser } from "../entities";
import { NotFoundError } from "../lib/errors";
import exclude from "../lib/exclude";

/**
 * Create Address Service
 * @param {CreateAddressDto} createAddressDto
 * @param {SiteUser} currentUser
 * @returns {{address:Address}} result object
 */
export const createAddressService = async (
  createAddressDto: CreateAddressDto,
  currentUser: SiteUser
) => {
  // Get Country
  const countryRepo = AppDataSource.getRepository(Country);
  const country = await countryRepo
    .createQueryBuilder()
    .select("*")
    .where({ id: createAddressDto.country_id })
    .getRawOne();

  // Throw error if country does not exist
  if (!country) {
    throw new NotFoundError("Country not found");
  }

  // Create Address
  const address = new Address();
  createAddressDto = exclude(["country_id"], createAddressDto);
  Object.assign(address, createAddressDto, {
    country: country,
    site_user: currentUser,
  });

  // Upsert Address To Prevent Duplication
  const addressRepo = AppDataSource.getRepository(Address);
  await addressRepo.save(address);

  return { address };
};

/**
 * Get Address By Id Service
 * @param addressId
 */
export const getAddressService = async (addressId: string) => {
  // Get Address
  const addressRepo = AppDataSource.getRepository(Address);
  const address = await addressRepo
    .createQueryBuilder("address")
    .leftJoinAndSelect("address.country", "country")
    .leftJoinAndSelect("address.site_user", "site_user")
    .where("address.id = :addressId", { addressId })
    .getOne();

  // Throw error if address does not exist
  if (!address) {
    throw new NotFoundError("Address not found");
  }

  return { address };
};

/**
 * Get Many Addresses Service
 * @param filterQuery
 * @returns
 */
export const getManyAddressesService = async (
  filterQuery?: AddressesFilterQuery
) => {
  // Filter
  let dbQuery = {};
  if (filterQuery) {
    dbQuery = filterQuery;
  }

  // Get Address List
  const addressRepo = AppDataSource.getRepository(Address);
  const [addresses, count] = await addressRepo.findAndCount({
    ...dbQuery,
    relations: { country: true, site_user: true },
  });

  return { addresses, addressesCount: count };
};

/**
 * Update Address By Id Service
 * @param {string} addressId
 * @param {Update} updateAddressDto
 * @returns
 */
export const updateUserAddressService = async (
  addressId: string,
  updateAddressDto: any
) => {
  const addressRepo = AppDataSource.getRepository(Address);
  const address = await addressRepo
    .createQueryBuilder("address")
    .update("address")
    .set(updateAddressDto)
    .where("address.id = :addressId", { addressId })
    .returning("*")
    .execute();

  return { address: address.raw[0] };
};
