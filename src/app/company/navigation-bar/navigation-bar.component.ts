import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '@app/auth/service/authentication.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  @Input()
  isLogin: boolean;
  constructor(private authenticationService: AuthenticationService,
    private router: Router) { 
    this.isLoginStatus();
  }

  
  ngOnInit() {
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  private isLoginStatus() {
    const isLoginStatus = this.authenticationService.isAuthenticated();
    if (isLoginStatus) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

}
