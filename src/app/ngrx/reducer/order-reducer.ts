import { ActionReducer, Action } from '@ngrx/store';
export const QUERY = 'QUERY';
export const QUERY_SUCCESS = 'QUERY_SUCCESS';
export function OrderReducer(state: any = { groupObj: null, people: [] }, action: Action) {
    console.log(action);
    switch (action.type) {
        // case QUERY:
        case QUERY_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}