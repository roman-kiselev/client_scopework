import { IOneItemForListNameWorkEdit } from 'src/shared/interfaces/models';
import { INameListWork, IOneItemForListNameWork } from '../../interfaces';
import { mainApi } from '../main';

interface IUnpin {
    id: number;
    scopeWorkId: number;
}

export const listNameWorkApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNames: builder.query<INameListWork, void>({
            query: () => ({
                url: '/list-name-work',
                method: 'GET',
            }),
        }),
        createList: builder.mutation<INameListWork, IOneItemForListNameWork>({
            query: (data) => {
                return {
                    url: '/list-name-work',
                    method: 'POST',
                    body: data,
                };
            },
        }),
        editList: builder.mutation<INameListWork, IOneItemForListNameWorkEdit>({
            query: ({ id, ...data }) => ({
                url: `/list-name-work/edit/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        getOneById: builder.query<INameListWork, { id: number }>({
            query: (id) => {
                return {
                    url: `/list-name-work/${id.id}`,
                    method: 'GET',
                };
            },
        }),
        getOneByTypeWorkId: builder.query<INameListWork[], { id: number }>({
            query: ({ id }) => {
                return {
                    url: `/list-name-work/byTypeWork/${id}`,
                    method: 'GET',
                };
            },
        }),
        delList: builder.mutation<INameListWork, { id: number }>({
            query: (id) => ({
                url: `/list-name-work/del/${id.id}`,
                method: 'DELETE',
            }),
        }),
        copyList: builder.query<INameListWork, { id: number }>({
            query: (id) => {
                return {
                    url: `/list-name-work/copy/${id.id}`,
                    method: 'GET',
                };
            },
        }),
        unpinList: builder.mutation<INameListWork, IUnpin>({
            query: ({ id, scopeWorkId }) => {
                return {
                    url: `/list-name-work/unpin-list/${id}`,
                    method: 'PATCH',
                    body: { scopeWorkId },
                };
            },
        }),
    }),
});
