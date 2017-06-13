import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderEffects {
    constructor(
        private actions$: Actions,
        private db: AngularFireDatabase,
        private http: Http) { }
    // tslint:disable-next-line:member-ordering
    @Effect() posts$: Observable<Action> = this.actions$
        .ofType('QUERY')
        .switchMap(action => {
            return this.db.list('/items')
                .map(res => {
                    const obj = R.groupBy((x) => x.man)(res);
                    return {
                        type: 'QUERY_SUCCESS',
                        payload: {
                            groupObj: obj,
                            people: Object.keys(obj)
                        }
                    };
                });
        });

    // tslint:disable-next-line:member-ordering
    @Effect() posts1$: Observable<Action> = this.actions$
        .ofType('GETDATA')
        .switchMap(action => {
            return this.db.list('/items', { query: { orderByChild: 'man', equalTo: action.payload.man } })
                .map(res => {
                    return {
                        type: 'GETDATA_SUCCESS',
                        payload: {
                            manArr: R.sortBy(R.prop('dateAt'))(res)
                        }
                    };
                });
        });

    // tslint:disable-next-line:eofline
}