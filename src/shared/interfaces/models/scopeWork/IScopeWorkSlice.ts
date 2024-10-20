import { IDataError, IObjectCreateResponse } from '../../api';
import { INameWorkWithNameList } from '../nameWork';
import { INameListWork } from '../nameWorkList';
import { ITypeWork } from '../typeWork';
import { IUserWithDescriptionDto } from '../users';
import { IScopeWorkWithData } from './IScopeWorkWithData';

export interface IScopeWorkData {
    listNameWork: INameListWork[] | [];
    namesWorkGeneral: INameWorkWithNameList[] | [];
    object: IObjectCreateResponse | null;
    users: IUserWithDescriptionDto[] | [];
    typeWork: ITypeWork | null;
}

export interface IFilteringOptions {
    home: IHomeFilteringOptions;
}

export interface IHomeFilteringOptions {
    onlyCompleted: boolean;
    onlyNotCompleted: boolean;
    objectName: string;
    typeWorkName: string;
}

export interface IScopeWorkSlice {
    selectedTypeWorkId: string;
    filteringOptions: IFilteringOptions;
    nameWorksSelected: INameListWork[] | [];
    scopeWorkData: IScopeWorkData;
    selectedScopeWorkById: IScopeWorkWithData;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
