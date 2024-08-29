import { ITypeWork } from '../../interfaces/models';
import { mainApi } from '../main';

export const typeWorkApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTypeWork: builder.query<ITypeWork[] | [], void>({
            query: () => ({
                url: '/type-work',
                method: 'GET',
            }),
        }),
        getAllShort: builder.query<ITypeWork[], void>({
            query: () => ({
                url: '/type-work/short',
                method: 'GET',
            }),
        }),
        createTypeWork: builder.mutation<ITypeWork, ITypeWork>({
            query: (body) => ({
                url: '/type-work',
                method: 'POST',
                body,
            }),
        }),
    }),
});
