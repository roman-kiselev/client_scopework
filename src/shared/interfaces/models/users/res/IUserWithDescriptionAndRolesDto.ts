import { IRoleDto } from '../../roles';
import { IUserWithDescriptionDto } from './IUserWithDescriptionDto';

export interface IUserWithDescriptionAndRolesDto
    extends IUserWithDescriptionDto {
    roles: IRoleDto[];
}
