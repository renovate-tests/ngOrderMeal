import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';

@Injectable()
export class IndexedDBService {
  // public db: IDBDatabase;
  constructor() { }

  public init(dbname: string): void {
    const db = new Dexie('FriendsAndPetsDB');

    db.version(1).stores({
      friends: '++id,name,isCloseFriend'
    });
    // db.open();
    // db.friends.add({ name: 'Ingemar Bergman', isCloseFriend: 0 });
    // db.friends.get(1).then(function (firstFriend) {
    //   console.log('Friend with id 1: ' + firstFriend.name);
    // });
  }


}
