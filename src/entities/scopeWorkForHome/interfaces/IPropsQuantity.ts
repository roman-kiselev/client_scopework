import { IValueForListData } from 'src/shared/interfaces';

export interface IPropsQuantity {
    dataList: IValueForListData[];
    setDataList: React.Dispatch<React.SetStateAction<IValueForListData[]>>;
}
