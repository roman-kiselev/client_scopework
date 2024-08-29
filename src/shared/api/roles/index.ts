import { IRole, IRoleDto } from '../../interfaces';
import { iamApi, mainApi } from './../main';

export const roleApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRoles: builder.query<IRole[] | [], void>({
            query: () => ({
                url: '/roles',
                method: 'GET',
            }),
        }),
        getAllRolesByUserId: builder.query<IRole[] | [], number>({
            query: (id) => ({
                url: `/roles/user/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const newRoleApi = iamApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRoles: builder.query<IRoleDto[] | [], void>({
            query: () => ({
                url: '/roles/list',
                method: 'GET',
            }),
        }),
    }),
});
