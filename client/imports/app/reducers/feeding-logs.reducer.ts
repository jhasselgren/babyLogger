import { FeedingLog } from '../../../../both/models/feedingLog.model'
import { StringMap } from '../../../../both/models/stringMap.model'

import * as moment from 'moment';

import * as feedingLog from '../actions/feedingLog'

export interface State {
    logs: FeedingLog[],
    latest: FeedingLog,
    logsPerDay: StringMap;
}



const initialState: State = {
    logs: [],
    latest: null,
    logsPerDay: {}
}

export function reducer(state = initialState, action: feedingLog.Actions): State {
    switch (action.type) {
        case feedingLog.ActionTypes.LOAD: {
            var loadSuccess = <feedingLog.LoadLogsAction>action;
            if (loadSuccess.payload == null) {
                return initialState;
            }

            var newLogsPerDay: StringMap = Object.assign({}, state.logsPerDay);

            var loadLogsResultArr = [...loadSuccess.payload].sort(CompareFeedingLog);

            loadLogsResultArr.forEach(x => {
                var date = moment(x.time).format('YYYYMMDD');
                if (newLogsPerDay[date] == undefined) {
                    newLogsPerDay[date] = 1;
                }
                else {
                    newLogsPerDay[date]++;
                }
            });

            var newState: State = {
                logs: loadLogsResultArr,
                latest: Object.assign({}, loadLogsResultArr[0]),
                logsPerDay: newLogsPerDay
            }
            return newState;
        }
        case feedingLog.ActionTypes.ADD_LOG_SUCCESS: {
            const addLog = (<feedingLog.AddLogAction>action).payload;
            var addLogresultArr = [...state.logs, addLog].sort(CompareFeedingLog);

            var newLogsPerDay: StringMap = Object.assign({}, state.logsPerDay);

            var date = moment(addLog.time).format('YYYYMMDD');
            if (newLogsPerDay[date] == undefined) {
                newLogsPerDay[date] = 1;
            }
            else {
                newLogsPerDay[date]++;
            }


            var newState: State = {
                logs: addLogresultArr,
                latest: Object.assign({}, addLogresultArr[0]),
                logsPerDay: newLogsPerDay
            }
            return newState;
        }
        case feedingLog.ActionTypes.REMOVE_LOG_SUCCESS: {
            const removeLogId = (<feedingLog.RemoveLogSuccessAction>action).payload;

            var remoteLogResultArr = state.logs.filter(log => {
                return log._id != removeLogId;
            });

            newLogsPerDay = {};

            remoteLogResultArr.forEach(x => {
                var date = moment(x.time).format('YYYYMMDD');
                if (newLogsPerDay[date] == undefined) {
                    newLogsPerDay[date] = 1;
                }
                else {
                    newLogsPerDay[date]++;
                }
            });

            var newState: State = {
                logs: remoteLogResultArr,
                latest: Object.assign({}, remoteLogResultArr[0]),
                logsPerDay: newLogsPerDay
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}

export const getLatest = (state = initialState) => state.latest;
export const getLogs = (state = initialState) => state.logs;
export const getLogsPerDay = (state = initialState) => state.logsPerDay;

function CompareFeedingLog(a: FeedingLog, b: FeedingLog): number {
    if (a.time > b.time) {
        return -1;
    }
    else if (a.time < b.time) {
        return 1
    }
    return 0;
}


