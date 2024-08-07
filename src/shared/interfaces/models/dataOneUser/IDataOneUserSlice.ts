import { IDataError, IObjectCreateResponse } from '../../api';
import { INameWorkWithNameList } from '../nameWork';
import { INameListWork } from '../nameWorkList';
import { IListByScopeWorkId, IScopeWorkWithData } from '../scopeWork';
import { ITypeWork } from '../typeWork';
import { IListData } from './IListData';
import { IValueForListData } from './IValueForListData';

export interface ITabForScopeWork {
    number: string;
    nameList: INameListWork[] | [];
    mainList: INameWorkWithNameList[] | [];
    tableAddingData: null;
}

export interface ICardScopeWork {
    object: IObjectCreateResponse;
    tabMain: ITabForScopeWork;
    tabAskue: ITabForScopeWork;
    tabWater: ITabForScopeWork;
    tabHeating: ITabForScopeWork;
    tabSewerage: ITabForScopeWork;
}

export interface IListByScopeWorkIdTest {
    key: string;
    index: string;
    name: string;
    action: number;
    quntity: string;
    percent: number;
    listNameWorkId: number;
    scopeWorkId: number;
    id: number;
    currentQuntity: string;
    nameListId: number;
}

export interface IDataOneUserSlice {
    scopeWorkData: IScopeWorkWithData[] | [];
    oneScopeWorkForOneTab: IScopeWorkWithData | null;
    objects: IObjectCreateResponse[];
    listByScopeWorkId: IListByScopeWorkId[] | [];
    listByScopeWorkIdTest: IListByScopeWorkIdTest[] | [];
    valueForListData: IValueForListData[];
    listData: IListData[];
    //scopeWorkCards: ICardScopeWork[] | [];
    typeWork: ITypeWork[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
