import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

declare var R: any;

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
                            peoples: Object.keys(obj)
                        }
                    };
                });
        });

    // tslint:disable-next-line:member-ordering
    // @Effect() posts1$: Observable<Action> = this.actions$
    //     .ofType('QUERY2')
    //     .switchMap(action => {
    //         return this.db.list('/items')
    //             .map(res => {
    //                 console.log(res);
    //                 return { type: 'QUERY_SUCCESS', payload: res };
    //             });
    //     });
    // tslint:disable-next-line:eofline
}