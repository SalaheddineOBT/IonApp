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
    ];

    username: any;


    constructor(private api: ApiService, private router: Router) {
        this.username = this.api.username;
    }

    ngOnInit(): void {
        if(!this.username){
            this.router.navigate(['/login']);
        }
    }

    navigateToNotifications = () => this.router.navigate(['/notifications']);

}
