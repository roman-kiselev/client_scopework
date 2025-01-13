import { RoleString } from 'src/shared/config';
import { IError } from '../../api';

export interface IAuthSlice {
    roles: RoleString[];
    banned: boolean;
    email: string;
    organizationId: number;
    id: number | null;
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
    dataError: IError | null;
    token: string | null;
}
