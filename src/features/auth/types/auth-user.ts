export const authUserTypeEnum = {
  admin: 'admin',
  normal: 'normal',
} as const;

export type AdminUser = {
  type: typeof authUserTypeEnum.admin;
  id: string;
  name: string;
  email: string;
};

export type NormalUser = {
  type: typeof authUserTypeEnum.normal;
  id: string;
  name: string;
  email: string;
};

export type AuthUser = AdminUser | NormalUser;
