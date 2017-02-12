
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

import * as fromFeedingLogs from './feeding-logs.reducer'

export interface State{
    feedingLogs: fromFeedingLogs.State
} 

const reducers = {
    feedingLogs: fromFeedingLogs.reducer
}

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
//   if (environment.production) {
//     return productionReducer(state, action);
//   }
//   else {
//     return developmentReducer(state, action);
//   }
//    return developmentReducer(state, action);
    return developmentReducer(state, action);
}

export const getFeedingLogsState = (state : State) => state.feedingLogs;

export const getFeedingLogs = createSelector(getFeedingLogsState, fromFeedingLogs.getLogs);
export const getLatestLog = createSelector(getFeedingLogsState, fromFeedingLogs.getLatest);
export const getLogsPerDay = createSelector(getFeedingLogsState, fromFeedingLogs.getLogsPerDay);

