import { Action } from '@ngrx/store';

import { FeedingLog } from '../../../../both/models/feedingLog.model'

export const ActionTypes = {
    LOAD: 'Load logs',
    LOAD_SUCCESS: 'Logs loaded',
    ADD_LOG: 'Add log',
    ADD_LOG_SUCCESS: 'Add log success',
    REMOVE_LOG: 'Remove log',
    REMOVE_LOG_SUCCESS: 'Remove log success'
}

export class LoadLogsAction implements Action{
    type = ActionTypes.LOAD;
    constructor(public payload: FeedingLog[]){}
}

// export class LoadLogsSuccessAction implements Action{
//     type = ActionTypes.LOAD_SUCCESS;
//     constructor(public payload: FeedingLog[]){}
// }

export class AddLogAction implements Action{
    type = ActionTypes.ADD_LOG;
    constructor(public payload: FeedingLog){}
}

export class AddLogSuccessAction implements Action{
    type = ActionTypes.ADD_LOG_SUCCESS;
    constructor(public payload: FeedingLog){}
}

export class RemoveLogAction implements Action{
    type = ActionTypes.REMOVE_LOG;
    constructor(public payload: string){}
}

export class RemoveLogSuccessAction implements Action{
    type = ActionTypes.REMOVE_LOG_SUCCESS;
    constructor(public payload: string){}
}

export type Actions =
    LoadLogsAction |
    AddLogAction |
    RemoveLogAction |
    AddLogSuccessAction |
    RemoveLogSuccessAction;