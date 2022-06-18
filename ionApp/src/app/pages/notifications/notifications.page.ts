import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/providers/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

    notifications: any = [];
    constructor(
        private notificationService: NotificationService,
        private router: Router
    ) { }

    ngOnInit() {
        if(!localStorage.getItem('user')){
            this.router.navigate(['/login']);
        }else{
            this.initNotife();
        }
    }

    async initNotife(){
        const id = JSON.stringify({idClient:2});
        await this.notificationService.getNotifications(id).subscribe((res: any) => {
            this.notifications = res.Notifications;
        });
    }

    async delete(){
        console.log('clicked !');
    }
}
