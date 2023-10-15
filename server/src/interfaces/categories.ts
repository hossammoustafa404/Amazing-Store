export interface CreateCategoryDto {
  name: string;
  desc: string;
  image: string;
  parent_category_id?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  desc?: string;
  image?: string;
  parent_category_id?: string;
}

export interface CategoryFilterQuery extends UpdateCategoryDto {}
