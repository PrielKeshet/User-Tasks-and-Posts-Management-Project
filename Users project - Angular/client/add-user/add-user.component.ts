import { Component } from '@angular/core';
import {RestUtilsService} from '../rest-utils.service';
import{Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

    constructor(private restUtils: RestUtilsService, private router: Router, private sharedSer : SharedService){}

    Name: string="";
    Email: string="";

    sub?: Subscription;

    addUser(){
      let obj={
        Name: this.Name,
        Email: this.Email
      }
      this.sub=this.restUtils.AddItem('http://localhost:8000/users',obj)
      .subscribe((data:any)=> {
        alert('user was added');
        this.sharedSer.setCommandSubject('refresh');
         this.router.navigate(['/']);
        })
    }

    changeRoute(){
      this.router.navigate(['/']);
    }

    ngOnDestroy(){
      this.sub?.unsubscribe();
    }

    }


