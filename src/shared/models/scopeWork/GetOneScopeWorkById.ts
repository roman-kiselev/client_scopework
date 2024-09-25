import { CaseReducer } from '@reduxjs/toolkit';
import { IScopeWorkSlice, IScopeWorkWithDataDto } from '../../interfaces';
import { CreateHandler, IDataError } from '../../interfaces/api';

class GetOneScopeWorkById
    implements
        CreateHandler<IScopeWorkSlice, IScopeWorkWithDataDto, IDataError>
{
    pending: CaseReducer<IScopeWorkSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        IScopeWorkSlice,
        { payload: IScopeWorkWithDataDto; type: string }
    > = (state, action) => {
        state.isLoading = true;

        //state.selectedScopeWorkById = action.payload;
        state.selectedScopeWorkById.id = action.payload.id;
        state.selectedScopeWorkById.createdAt = action.payload.createdAt;
        state.selectedScopeWorkById.deletedAt = action.payload.deletedAt;

        state.selectedScopeWorkById.listNameWork = action.payload.listNameWork;
        state.selectedScopeWorkById.object = action.payload.object;
        state.selectedScopeWorkById.typeWork = action.payload.typeWork;
        state.selectedScopeWorkById.updatedAt = action.payload.updatedAt;
        state.selectedScopeWorkById.usersIds = action.payload.users;
        state.selectedScopeWorkById.listNameWorkId =
            action.payload.listNameWorkId;
        state.selectedScopeWorkById.idScopeWork = action.payload.idScopeWork;
        state.selectedScopeWorkById.quntity = action.payload.quntity;
        state.selectedScopeWorkById.isDifference = action.payload.isDifference;
        state.selectedScopeWorkById.quantityDifference =
            action.payload.quantityDifference;
        state.selectedScopeWorkById.addingCount = action.payload.addingCount;
        state.selectedScopeWorkById.percent = action.payload.percent;

        state.isLoading = false;
    };

    rejected: CaseReducer<IScopeWorkSlice> = (state) => {
        state.isLoading = false;
        state.isError = true;
        // TODO - добавить обработку ошибок
        // const { data, status } = action.payload as IDataError;
        // state.dataError = {
        //     data: data,
        //     status: Number(status),
        // };
    };
}

export default new GetOneScopeWorkById();
