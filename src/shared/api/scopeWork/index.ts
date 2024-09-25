import {
    IResQuickOneScopeWorkById,
    IScopeworkShort,
} from 'src/shared/interfaces/api';
import { IResQuickWithGroup } from 'src/shared/interfaces/api/scopework/IResQuickWithGroup';
import {
    ICreateScopeWork,
    IEditScopeWork,
    IListData,
    IResScopeWorkByUserAndObject,
    IScopeWork,
    IScopeWorkWithData,
    IScopeWorkWithDataDto,
} from '../../interfaces/models';
import { mainApi } from '../main';

export const scopeWorkApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllScopeWork: builder.query<IScopeWork[], void>({
            query: () => ({
                url: '/scope-work',
                method: 'GET',
            }),
        }),
        getOneByIdScopeWork: builder.query<
            IScopeWorkWithDataDto,
            { id: number }
        >({
            query: ({ id }) => ({
                url: `/scope-work/${id}`,
                method: 'GET',
            }),
        }),
        createScopeWork: builder.mutation<IScopeWork, ICreateScopeWork>({
            query: (data) => ({
                url: '/scope-work',
                method: 'POST',
                body: data,
            }),
        }),
        getAllScopeWorkByUserId: builder.query<
            IScopeWorkWithData[],
            { id: number }
        >({
            query: (id) => ({
                url: `/scope-work/getAllByUserId/${id.id}`,
                method: 'GET',
            }),
        }),
        getListByScopeWorkId: builder.query<IListData[], { id: number }>({
            query: (id) => ({
                url: `/scope-work/getListByScopeWorkId/${id.id}`,
                method: 'GET',
            }),
        }),
        editScopeWork: builder.mutation<IScopeWork, IEditScopeWork>({
            query: (data) => ({
                url: '/scope-work/edit',
                method: 'POST',
                body: data,
            }),
        }),
        getShortSql: builder.query<IScopeworkShort[], { id: string }>({
            query: ({ id }) => ({
                url: `/scope-work/getShort/${id}`,
                method: 'GET',
            }),
        }),
        getHistory: builder.query<
            any,
            { id: string; dateFrom: string; dateTo: string }
        >({
            query: ({ id, dateFrom, dateTo }) => ({
                url: `/scope-work/getHistory/${id}?dateFrom=${dateFrom}&dateTo=${dateTo}`,
                method: 'GET',
            }),
        }),
        quickOneScopeWorkById: builder.query<
            IResQuickOneScopeWorkById[],
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/scope-work/quickWithoutGroup/${id}`,
                method: 'GET',
            }),
        }),

        quickWithGroup: builder.query<IResQuickWithGroup[], { id: string }>({
            query: ({ id }) => ({
                url: `/scope-work/quickWithGroup/${id}`,
                method: 'GET',
            }),
        }),

        getScopeWorkByUserAndObject: builder.query<
            IResScopeWorkByUserAndObject[],
            { userId: string; objectId: string }
        >({
            query: ({ userId, objectId }) => ({
                url: `/scope-work/getSw/?user=${userId}&object=${objectId}`,
                method: 'GET',
            }),
        }),
    }),
});
