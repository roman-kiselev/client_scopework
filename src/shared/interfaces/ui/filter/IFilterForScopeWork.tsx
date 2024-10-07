export interface IFilterForScopeWork {
    onlyCompleted?: boolean;
    changeOnlyCompleted?: (value: string) => void;
    onlyNotCompleted?: boolean;
    changeOnlyNotCompleted?: (value: string) => void;
    objectName?: string;
    changeObjectName?: (value: string) => void;
    typeWorkName?: string;
    changeTypeWorkName?: (value: string) => void;
    
}
