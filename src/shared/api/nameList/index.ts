import { IStatus } from 'src/shared/interfaces';
import { INameListById } from 'src/shared/interfaces/models';
import { mainApi } from '../main';
import { IUpdateNameListDto } from './dto';
export * from './dto';

export const nameListApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getNameList: build.query<INameListById, { id: number }>({
            query: ({ id }) => ({
                url: `/name-list/${id}`,
                method: 'GET',
            }),
        }),
        updateNameList: build.mutation<IStatus, IUpdateNameListDto>({
            query: (data) => ({
                url: `/name-list/edit/${data.nameListId}`,
                method: 'PATCH',
                body: { quntity: data.quntity },
            }),
        }),
    }),
});
