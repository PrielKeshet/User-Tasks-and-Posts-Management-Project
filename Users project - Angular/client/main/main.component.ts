import { Component } from '@angular/core';
import { RestUtilsService } from '../rest-utils.service';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
    constructor(private restUtils: RestUtilsService, private router: Router, private sharedSer : SharedService) { }


    Users: User[] = [];
    UsersCopy: User[] = [];
    search: string = "";
    sub?: Subscription;
   flag=false;
   commandSub:Subscription | undefined;


    GetUsers() {
      this.sub = this.restUtils.GetAllData('http://localhost:8000/users')
        .subscribe((data: any) => {
          this.Users = data;
          this.UsersCopy = this.Users;
        });
    }

    OpenAddComp() {
      this.router.navigate(["/addUser"]);
    }

    SearchBy() {
      this.UsersCopy = this.Users.filter(x => x.Name.includes(this.search) || x.Email.includes(this.search));
    }

    ngOnInit() {
      this.GetUsers();
      this.commandSub= this.sharedSer.getCommandSubject().subscribe((command)=>{
        if (command=="refresh")
        {
            this.GetUsers();
        }
      });
    }

    ngOnDestroy() {
      this.sub?.unsubscribe();
      this.commandSub?.unsubscribe();
    }
}