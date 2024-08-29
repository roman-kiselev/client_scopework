import { IObjectCreateResponse } from 'src/shared/interfaces/api';
import { INameWorkWithNameList } from '../../nameWork';
import { INameListWork } from '../../nameWorkList';
import { ITypeWork } from '../../typeWork';
import { IUserIdsDto } from '../../users';

export interface IScopeWorkWithDataDto {
    id: number | null;
    deletedAt: Date | null;
    typeWork: ITypeWork | null;
    objectId?: number | null;
    typeWorkId?: number | null;
    object: IObjectCreateResponse | null;
    createdAt: Date | '';
    updatedAt: Date | '';
    listNameWork: INameListWork[] | [];
    // users: IUserWithDescriptionDto[] | [];
    users: IUserIdsDto[] | [];
    namesWorkGeneral: INameWorkWithNameList[] | [];
    // mainCountData: IMainCountData | null;
    listNameWorkId: string[] | [];
    idScopeWork: string[] | [];
    quntity: number | null;
    isDifference: boolean;
    quantityDifference: number | null;
    addingCount: number | null;
    percent: string | '';
}
