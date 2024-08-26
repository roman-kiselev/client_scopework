import { IUserDescriptionDto } from '../../userDescription';

export interface IUserDto {
    id: number;
    email: string;
    banned: boolean;
    deletedAt: boolean | null;
    description: IUserDescriptionDto;
}
