import { User } from './user';

export interface Authuser {
    tokenString: string;
    user: User;
}
