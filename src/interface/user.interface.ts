import { ROLE } from '../constant/enum';

export interface IUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: ROLE;
}
