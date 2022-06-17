import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './providers/api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

    public isLog = false;

    public appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        { title: 'Cars', url: '/cars', icon: 'car' },
        { title: 'Notifications', url: '/notifications', icon: 'notifications' },
        { title: 'Favorites', url: '/favorites', icon: 'heart' },
        { title: 'Account', url: '/account', icon: 'person' },
        { title: 'Logout', url: '/login', icon: 'log-out' },
    ];

    username: any;


    constructor(private api: ApiService, private router: Router) {
        this.username = this.api.username;
    }

    ngOnInit(): void {}

    isLogedIn() {
        if(localStorage.getItem('username'))
        {
            return true;
        }
        return false;
    }

    navigateToNotifications = () => this.router.navigate(['/notifications']);

}
