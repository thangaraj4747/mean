export interface ILoginDetails {
  email: string;
  password: string;
}
export interface IRegisterDetails extends ILoginDetails {
  id?: string;
  username: string;
}
