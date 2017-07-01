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

    setTimeout(() => {
      $('#header__icon').click((e) => {
        e.preventDefault();
        $('div.body').toggleClass('with--sidebar');
      });

      $('#site-cache').click(function (e) {
        $('div.body').removeClass('with--sidebar');
      });

    }, 0);
    // console.log(new OpaqueToken('1'));
  }

}
