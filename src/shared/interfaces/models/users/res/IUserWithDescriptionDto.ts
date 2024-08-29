import { IUserDescriptionDto } from '../../userDescription';

export interface IUserWithDescriptionDto {
    id: number;
    email: string;
    banned: boolean;
    deletedAt: boolean | null;
    description: IUserDescriptionDto;
}
