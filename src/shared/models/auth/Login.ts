import { CaseReducer } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import {
    CreateHandler,
    IAuthSlice,
    IMainError,
    IUserResponseToken,
    IUserToken,
} from 'src/shared/interfaces';
import Cookies from 'universal-cookie';

class Login
    implements CreateHandler<IAuthSlice, IUserResponseToken, IMainError>
{
    pending: CaseReducer<IAuthSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
        const cookie = new Cookies();
        cookie.remove('refreshToken');
    };

    fulfilled: CaseReducer<
        IAuthSlice,
        { payload: IUserResponseToken; type: string }
    > = (state, action) => {
        const { accessToken } = action.payload.data;
        const user: IUserToken = jwt_decode(accessToken);
        state.id = user.sub;
        state.email = user.email;
        state.banned = user.banned;
        state.organizationId = user.organizationId;
        const { roles } = user;
        state.roles = roles;
        state.isAuth = true;
        state.token = accessToken;
        state.isLoading = false;
    };

    rejected: CaseReducer<IAuthSlice> = (state, action) => {
        state.isAuth = false;
        state.isError = true;
        const { data } = action.payload as IMainError;
        state.dataError = data;
        state.isLoading = false;
    };
}

export default Login;
