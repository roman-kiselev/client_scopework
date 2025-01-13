import { IValueForListData } from 'src/shared/interfaces';

export interface IColumnQuntityQuickProps {
    data: IValueForListData[];
    setDataList: any;
    refetch: any;
    nameWorkId: number;
    listNameWorkId: number;
    nameListId: number;
    scopeWorkId: string;
}
