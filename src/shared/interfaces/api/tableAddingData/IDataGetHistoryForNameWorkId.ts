export interface IDelTableAddingData {
    id: number;
}

export interface IDataGetHistoryForNameWorkId {
    id: number;
    quntity: number;
    userId: number;
    createdAt: Date;
    deletedAt: Date | null;
    delCandidate: number | null;
    delTableAddingData: IDelTableAddingData | null;
}
