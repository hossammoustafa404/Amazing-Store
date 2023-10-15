import { getQueryAdapter } from "@tool-kid/express-query-adapter";

/**
 * Method to generate api features based on filter query
 * @param {any} filterQuery
 */
const genApiFeatures = async (filterQuery: any) => {
  filterQuery.page = filterQuery.page || 1;

  const builder = await getQueryAdapter({
    adapter: "typeorm",
  });
  const builtQuery = builder.build(filterQuery);

  return builtQuery;
};

export default genApiFeatures;
