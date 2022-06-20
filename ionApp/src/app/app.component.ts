import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    ];

    username: any;

    constructor(private router: Router) {
        this.username = localStorage.getItem('username');
    }

    ngOnInit(): void {}

    isLogedIn() {
        if(localStorage.getItem('user'))
        {
            return true;
        }
        return false;
    }

    navigateToNotifications = () => this.router.navigate(['/notifications']);

    logOut = () => {
        // localStorage.clear();
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
        window.location.reload();
    };

}
