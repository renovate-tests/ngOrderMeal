import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

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
            const getlist = this.db.list('/items')
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
            return getlist;
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


    // tslint:disable-next-line:member-ordering
    @Effect() posts2$: Observable<Action> = this.actions$
        .ofType('GETLocalDATA')
        .switchMap(action => {
            const db = new Dexie('FriendsAndPetsDB');
            db.version(1).stores({
                friends: '++id,name,isCloseFriend'
            });
            db.open();
            // db.friends.add({ name: 'Ingemar Bergman', isCloseFriend: 0 });
            return Observable.fromPromise(db.friends.get(1))
                .map(res => {
                    return {
                        type: 'GETLocalDATA_SUCCESS',
                        payload: {
                            abc: res
                        }
                    };
                });
        });

    // tslint:disable-next-line:eofline
}