import { IDataError } from '../../api';
import { IUserWithDescriptionAndRolesDto } from './res/IUserWithDescriptionAndRolesDto';
import { IUserWithDescriptionDto } from './res/IUserWithDescriptionDto';

export interface IUsersSlice {
    listUsers: IUserWithDescriptionDto[] | [];
    oneUserWithDescription: IUserWithDescriptionAndRolesDto | null;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
