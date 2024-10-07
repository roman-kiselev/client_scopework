import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IScopeWorkSlice } from 'src/shared/interfaces';

interface IFilteringOptionsHome<S> {
    setObjectName: CaseReducer<S, PayloadAction<string>>;
    setTypeWorkName: CaseReducer<S, PayloadAction<string>>;
    setOnlyCompleted: CaseReducer<S, PayloadAction<boolean>>;
    setOnlyNotCompleted: CaseReducer<S, PayloadAction<boolean>>;
}

export class FilteringOptionsHome
    implements IFilteringOptionsHome<IScopeWorkSlice>
{
    setObjectName: CaseReducer<
        IScopeWorkSlice,
        { payload: string; type: string }
    > = (state, action) => {
        state.filteringOptions.home.objectName = action.payload;
    };

    setTypeWorkName: CaseReducer<
        IScopeWorkSlice,
        { payload: string; type: string }
    > = (state, action) => {
        state.filteringOptions.home.typeWorkName = action.payload;
    };

    setOnlyCompleted: CaseReducer<
        IScopeWorkSlice,
        { payload: boolean; type: string }
    > = (state, action) => {
        state.filteringOptions.home.onlyCompleted = action.payload;
    };

    setOnlyNotCompleted: CaseReducer<
        IScopeWorkSlice,
        { payload: boolean; type: string }
    > = (state, action) => {
        state.filteringOptions.home.onlyNotCompleted = action.payload;
    };

    reset: CaseReducer<IScopeWorkSlice> = (state) => {
        state.filteringOptions.home.objectName = '';
        state.filteringOptions.home.typeWorkName = '';
        state.filteringOptions.home.onlyCompleted = false;
        state.filteringOptions.home.onlyNotCompleted = false;
    };
}

export default new FilteringOptionsHome();
