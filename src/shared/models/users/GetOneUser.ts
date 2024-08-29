import { CaseReducer } from '@reduxjs/toolkit';
import { IUserWithDescriptionAndRolesDto, IUsersSlice } from '../../interfaces';
import { CreateHandler, IDataError } from '../../interfaces/api';

class GetOneUser
    implements
        CreateHandler<IUsersSlice, IUserWithDescriptionAndRolesDto, IDataError>
{
    pending: CaseReducer<IUsersSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        IUsersSlice,
        { payload: IUserWithDescriptionAndRolesDto; type: string }
    > = (state, action) => {
        state.oneUserWithDescription = action.payload;
        state.isLoading = false;
    };

    rejected: CaseReducer<IUsersSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new GetOneUser();
