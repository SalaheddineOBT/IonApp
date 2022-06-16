import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/providers/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

  async delete(){
    // console.log('clicked !');
    const id = JSON.stringify({idClient:2});
    await this.notificationService.getNotifications(id);
  }
}
