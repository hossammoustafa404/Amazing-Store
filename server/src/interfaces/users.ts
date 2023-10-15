export interface CreateUserDto {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface UpdateUserDto {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
  avatar?: string;
  email_verified?: boolean;
  verify_token?: string;
  reset_pass_token?: string;
}
