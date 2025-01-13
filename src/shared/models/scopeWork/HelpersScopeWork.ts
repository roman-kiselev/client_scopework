import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IDrawerTimeline, IScopeWorkSlice } from 'src/shared/interfaces';

interface IHelpersScopeWorkSliceActions<S> {
    setStateDrawerTimeline: CaseReducer<S, PayloadAction<IDrawerTimeline>>;
    closeDrawerTimeline: CaseReducer<S, PayloadAction<boolean>>;
}

export class HelpersScopeWork
    implements IHelpersScopeWorkSliceActions<IScopeWorkSlice>
{
    setStateDrawerTimeline: CaseReducer<
        IScopeWorkSlice,
        { payload: IDrawerTimeline; type: string }
    > = (state, action) => {
        const { nameListId, nameWorkId, stateDrawerTimeline, name, unitName } =
            action.payload;
        state.helpersScopeWork.drawerTimeline.stateDrawerTimeline =
            stateDrawerTimeline;
        state.helpersScopeWork.drawerTimeline.nameListId = nameListId;
        state.helpersScopeWork.drawerTimeline.nameWorkId = nameWorkId;
        state.helpersScopeWork.drawerTimeline.name = name;
        state.helpersScopeWork.drawerTimeline.unitName = unitName;
    };

    closeDrawerTimeline: CaseReducer<
        IScopeWorkSlice,
        { payload: boolean; type: string }
    > = (state, action) => {
        state.helpersScopeWork.drawerTimeline.stateDrawerTimeline =
            action.payload;
        state.helpersScopeWork.drawerTimeline.nameListId = null;
        state.helpersScopeWork.drawerTimeline.nameWorkId = null;
        state.helpersScopeWork.drawerTimeline.name = '';
        state.helpersScopeWork.drawerTimeline.unitName = '';
    };
}

export default new HelpersScopeWork();
