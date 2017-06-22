import { AuthService } from './service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '訂餐帳本';

  constructor(public auth: AuthService
  ) {
    auth.handleAuthentication();
  }

  ngOnInit(): void {
    // console.log(new OpaqueToken('1'));
  }

}
