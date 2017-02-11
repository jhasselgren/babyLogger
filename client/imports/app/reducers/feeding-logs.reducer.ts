import { FeedingLog } from '../../../../both/models/feedingLog.model'

import * as feedingLog from '../actions/feedingLog'

export interface State {
    logs: FeedingLog[],
    latest: FeedingLog
}

const initialState: State = {
    logs: [],
    latest: null
}

export function reducer(state = initialState, action: feedingLog.Actions): State {
    switch (action.type) {
        case feedingLog.ActionTypes.LOAD: {
            var loadSuccess = <feedingLog.LoadLogsAction>action;
            if (loadSuccess.payload == null) {
                return initialState;
            }

            var loadLogsResultArr = [...loadSuccess.payload].sort(CompareFeedingLog);
            var newState: State = {
                logs: loadLogsResultArr,
                latest: Object.assign({}, loadLogsResultArr[0])
            }
            return newState;
        }
        // case feedingLog.ActionTypes.LOAD_SUCCESS:{
        //     var loadSuccess = <feedingLog.LoadLogsSuccessAction>action;
        //     if (loadSuccess.payload == null) {
        //         return initialState;
        //     }

        //     const loadLogsResultArr = [...loadSuccess.payload].sort(CompareFeedingLog);
        //     const newState: State = {
        //         logs: loadLogsResultArr,
        //         latest: Object.assign({}, loadLogsResultArr[0])
        //     }
        //     return newState;
        // }
        case feedingLog.ActionTypes.ADD_LOG_SUCCESS: {
            const addLog = (<feedingLog.AddLogAction>action).payload;
            var addLogresultArr = [...state.logs, addLog].sort(CompareFeedingLog);
            var newState: State = {
                logs: addLogresultArr,
                latest: Object.assign({}, addLogresultArr[0])
            }
            return newState;
        }
        case feedingLog.ActionTypes.REMOVE_LOG_SUCCESS: {
            const removeLogId = (<feedingLog.RemoveLogSuccessAction>action).payload;

            var remoteLogResultArr = state.logs.filter(log => {
                return log._id != removeLogId;
            })
            var newState: State = {
                logs: remoteLogResultArr,
                latest: Object.assign({}, remoteLogResultArr[0])
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}

export const getLatest = (state = initialState) => state.latest;
export const getLogs = (state = initialState) =>  state.logs;

function CompareFeedingLog(a: FeedingLog, b: FeedingLog): number {
    if (a.time > b.time) {
        return -1;
    }
    else if (a.time < b.time) {
        return 1
    }
    return 0;
}


