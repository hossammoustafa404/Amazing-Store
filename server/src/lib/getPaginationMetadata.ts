/**
 * Method to generate meta data for pagination process
 * @param {string} prefix
 * @param {number} page
 * @param {number} per_page
 * @param {any} records
 * @param {number} count
 */
const getPaginationMetadata = (
  prefix: string,
  page: number,
  per_page: number,
  records: any,
  count: number
) => {
  const total_pages = Math.ceil(count / per_page);

  return {
    page,
    per_page,
    page_count: records.length,
    total_pages,
    total_count: count,
    links: {
      self:
        page > total_pages
          ? null
          : `${prefix}?page=${page}&per_page=${per_page}`,
      first: `${prefix}?page=1&per_page=${per_page}`,
      previous:
        page === 1 || page > total_pages + 1
          ? null
          : `${prefix}?page=${page - 1}&per_page=${per_page}`,
      next:
        page >= total_pages
          ? null
          : `${prefix}?page=${page + 1}&per_page=${per_page}`,
      last: `${prefix}?page=${total_pages}&per_page=${per_page}`,
    },
  };
};

export default getPaginationMetadata;
