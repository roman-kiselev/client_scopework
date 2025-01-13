import { IException } from './IException';

export interface IError {
    error: boolean;
    errorDetails: IException;
    status: number;
}
