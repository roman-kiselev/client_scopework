import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IScopeWorkSlice } from 'src/shared/interfaces';

interface HelpersScopeWorkModalSliceActions<S> {
    setStateModal: CaseReducer<S, PayloadAction<boolean>>;
    setNameListId: CaseReducer<S, PayloadAction<number>>;
}

export class HelpersScopeWorkModal
    implements HelpersScopeWorkModalSliceActions<IScopeWorkSlice>
{
    setStateModal: CaseReducer<
        IScopeWorkSlice,
        { payload: boolean; type: string }
    > = (state, action) => {
        state.helpersScopeWork.columnNameModal.open = action.payload;
    };

    setNameListId: CaseReducer<
        IScopeWorkSlice,
        { payload: number; type: string }
    > = (state, action) => {
        state.helpersScopeWork.columnNameModal.nameListId = action.payload;
    };

    setQuntity: CaseReducer<
        IScopeWorkSlice,
        { payload: string; type: string }
    > = (state, action) => {
        const formattedValue = action.payload;

        state.helpersScopeWork.columnNameModal.quntity = formattedValue;
    };
}

export default new HelpersScopeWorkModal();
