import { NotFoundError } from "../lib/errors";
import { AppDataSource } from "../config/db";
import { Country } from "../entities";
import { CreateCountryDto, UpdateCountryDto } from "../interfaces/countries";

/**
 * Create Country Service
 * @param createCountryDto
 * @returns {{country:Country}} result object
 */
export const createCountryService = async (
  createCountryDto: CreateCountryDto
) => {
  // Create country
  const country = {
    name: createCountryDto.name,
  };

  // Save country
  const countryRepo = AppDataSource.getRepository(Country);
  await countryRepo.save(country);

  return {
    country,
  };
};

/**
 * Get Many Countries Service
 * @returns {{countries:Country[]}} result object
 */
export const getManyCountriesService = async () => {
  // Get countries And Their Count
  const countryRepo = AppDataSource.getRepository(Country);
  const [countries, count] = await countryRepo.findAndCount();

  return { countries, countriesCount: count };
};

/**
 * Update Country By Id Service
 * @param {string} countryId
 * @param {UpdateCountryDto} updateCountryDto
 * @returns {{country:Country}} result object
 */
export const updateCountryService = async (
  countryId: string,
  updateCountryDto: UpdateCountryDto
) => {
  // Get country
  const countryRepo = AppDataSource.getRepository(Country);
  let country = await countryRepo.findOneBy({ id: countryId });

  // Throw error if country does not exist
  if (!country) {
    throw new NotFoundError("Country not found");
  }

  // Update country And Save
  country = { ...country, ...updateCountryDto };
  countryRepo.save(country);

  return { country };
};
