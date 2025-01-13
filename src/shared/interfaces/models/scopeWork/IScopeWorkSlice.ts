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
    isDel: boolean;
}

export interface IDrawerTimeline {
    stateDrawerTimeline: boolean;
    nameListId: number | null;
    nameWorkId: number | null;
    name: string;
    unitName: string;
}

export interface IColumnNameModal {
    open: boolean;
    nameListId: number | null;
    name: string;
    quntity: string | null;
    unitId: number | null;
}
export interface IHelpersScopeWork {
    drawerTimeline: IDrawerTimeline;
    columnNameModal: IColumnNameModal;
}

export interface IScopeWorkSlice {
    selectedTypeWorkId: string;
    filteringOptions: IFilteringOptions;
    helpersScopeWork: IHelpersScopeWork;
    nameWorksSelected: INameListWork[] | [];
    scopeWorkData: IScopeWorkData;
    selectedScopeWorkById: IScopeWorkWithData;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
