import { createSlice } from '@reduxjs/toolkit';
import { newUserApi } from '../../api';
import { IUsersSlice } from '../../interfaces';
import EditRolesForUser from './EditRolesForUser';
import GetAllUsers from './GetAllUsers';
import GetOneUser from './GetOneUser';

const initialState: IUsersSlice = {
    listUsers: [],
    oneUserWithDescription: null,
    isLoading: false,
    isError: false,
    dataError: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            newUserApi.endpoints.getAllUserList.matchPending,
            GetAllUsers.pending
        );
        builder.addMatcher(
            newUserApi.endpoints.getAllUserList.matchFulfilled,
            GetAllUsers.fulfilled
        );
        builder.addMatcher(
            newUserApi.endpoints.getAllUserList.matchRejected,
            GetAllUsers.rejected
        );
        // Получим пользователя с описанием
        builder.addMatcher(
            newUserApi.endpoints.getOneUser.matchPending,
            GetOneUser.pending
        );
        builder.addMatcher(
            newUserApi.endpoints.getOneUser.matchFulfilled,
            GetOneUser.fulfilled
        );
        builder.addMatcher(
            newUserApi.endpoints.getOneUser.matchRejected,
            GetOneUser.rejected
        );
        // Редактируем пользователя
        // builder.addMatcher(
        //     authApi.endpoints.edit.matchPending,
        //     EditUser.pending
        // );
        // builder.addMatcher(
        //     authApi.endpoints.edit.matchFulfilled,
        //     EditUser.fulfilled
        // );
        // builder.addMatcher(
        //     authApi.endpoints.edit.matchRejected,
        //     EditUser.rejected
        // );

        builder.addMatcher(
            newUserApi.endpoints.changeRoles.matchPending,
            EditRolesForUser.pending
        );
        builder.addMatcher(
            newUserApi.endpoints.changeRoles.matchFulfilled,
            EditRolesForUser.fulfilled
        );
        builder.addMatcher(
            newUserApi.endpoints.changeRoles.matchRejected,
            EditRolesForUser.rejected
        );
    },
});

export const usersReducer = usersSlice.reducer;
