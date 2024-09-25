import { IResQuickOneScopeWorkById } from './IResQuickOneScopeWorkById';

export interface IResQuickWithGroup {
    id: number;
    name: string;
    description: string;
    organizationId: number;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    typeWorkId: number;
    scopeWorkId: number;
    list: IResQuickOneScopeWorkById[];
}
