import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    private operationUrl = environment.baseUrl + 'Operations/';

    constructor(private httpClient: HttpClient) { }

    getNotifications(id: any){
        return this.httpClient.post(this.operationUrl + 'Notifications/notifications.php',id);
    }

}
