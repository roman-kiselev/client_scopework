import { ActionReducerMapBuilder, CaseReducer } from '@reduxjs/toolkit';
import { nameListApi } from 'src/shared/api';
import {
    CreateHandler,
    IMainError,
    IScopeWorkSlice,
} from 'src/shared/interfaces';
import { INameListById } from 'src/shared/interfaces/models';

class GetNameListById
    implements CreateHandler<IScopeWorkSlice, INameListById, IMainError>
{
    pending: CaseReducer<IScopeWorkSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        IScopeWorkSlice,
        { payload: INameListById; type: string }
    > = (state, action) => {
        state.isLoading = false;
        const { quntity } = action.payload;
        state.helpersScopeWork.columnNameModal.quntity = quntity.toString();
        state.helpersScopeWork.columnNameModal.name = action.payload.name;
        state.helpersScopeWork.columnNameModal.unitId = action.payload.unitId;
    };

    rejected: CaseReducer<IScopeWorkSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IMainError;
        state.dataError = {
            data: data.errorDetails,
            status: Number(status),
        };
    };
}

export const getNameListByIdBuilder = (
    builder: ActionReducerMapBuilder<IScopeWorkSlice>
) => {
    builder.addMatcher(
        nameListApi.endpoints.getNameList.matchPending,
        new GetNameListById().pending
    );
    builder.addMatcher(
        nameListApi.endpoints.getNameList.matchFulfilled,
        new GetNameListById().fulfilled
    );
    builder.addMatcher(
        nameListApi.endpoints.getNameList.matchRejected,
        new GetNameListById().rejected
    );
};
