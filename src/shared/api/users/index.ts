import {
    IUser,
    IUserDto,
    IUserWithData,
    IUserWithDescription,
} from '../../interfaces';
import { iamApi, mainApi } from '../main';

export const userApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<IUser[], void>({
            query: () => ({
                url: '/user',
                method: 'GET',
            }),
        }),
        getAllUsersWithData: builder.query<IUserWithData[], void>({
            query: () => ({
                url: '/user/withData',
                method: 'GET',
            }),
        }),
        getOneUser: builder.query<IUserWithDescription, { id: string }>({
            query: ({ id }) => ({
                url: `/user/${id}`,
                method: 'GET',
            }),
        }),
        addRolesForUser: builder.mutation<
            IUserWithDescription,
            { id: string; roles: string[] }
        >({
            query: ({ id, roles }) => ({
                url: `/user/updateRoles/${id}`,
                method: 'POST',
                body: roles,
            }),
        }),
    }),
});

export const newUserApi = iamApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUserList: builder.query<IUserDto[], void>({
            query: () => ({
                url: '/users/list',
                method: 'GET',
            }),
        }),
    }),
});
