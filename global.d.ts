
interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  type: 'member'|'trainer'|'admin';
  firstLogin?: boolean;
}
