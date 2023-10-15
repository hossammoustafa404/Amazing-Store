export interface CreateAddressDto {
  unit_number: string;
  street_number: string;
  address_line1: string;
  address_line2: string;
  city: string;
  region: string;
  postal_code: string;
  is_default?: boolean;
  country_id: string;
}

export interface AddressesFilterQuery {
  unit_number?: string;
  street_number?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  is_default?: boolean;
  country_id?: string;
}
