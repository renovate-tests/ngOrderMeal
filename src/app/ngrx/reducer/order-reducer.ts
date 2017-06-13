import { ActionReducer, Action } from '@ngrx/store';
export const QUERY = 'QUERY';
export const GETDATA = 'GETDATA';
export const QUERY_SUCCESS = 'QUERY_SUCCESS';
export const GETDATA_SUCCESS = 'GETDATA_SUCCESS';
export function OrderReducer(state: any = { groupObj: null, people: [] }, action: Action) {
    switch (action.type) {
        // case QUERY:
        case QUERY_SUCCESS:
            return action.payload;
        case GETDATA_SUCCESS:
            return Object.assign({}, action.payload);
        default:
            return state;
    }
}