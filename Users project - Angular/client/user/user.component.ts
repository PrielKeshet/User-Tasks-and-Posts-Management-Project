import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { RestUtilsService } from '../rest-utils.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from '../task';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(
    private restUtils: RestUtilsService,
    private router: Router,
    private sharedSer: SharedService
  ) {}

  @Input()
  user?: any;

  sub?: Subscription;
  sub2?: Subscription;
  sub3?: Subscription;
  sub4?: Subscription;

  Name: string = '';
  Email: string = '';
  Street: string = '';
  City: string = '';
  Zipcode: number = 0;
  tasks: Task[] = [];
  flag: boolean = false;
  borderColorFlag = true;
  selectedUserId: string | null = null;
  isSelected=false;

  GetUserData() {
    //change to Name instead of firstName
    this.Name = this.user.Name;
    //Email
    this.Email = this.user.Email;
    //Street
    this.Street = this.user.Street;
    //City
    this.City = this.user.City;
    //ZipCode
    this.Zipcode = this.user.Zipcode;


    this.sub3 = this.restUtils
      .GetAllData('http://localhost:8000/users/' + this.user._id)
      .subscribe((data: any) => {
        console.log(data);
        this.tasks = data[0].Tasks;
        console.log(this.tasks);
        if (this.tasks.find((t) => t.Completed == false)) {
          this.borderColorFlag = false;
        }
      });
  }

  ChoosenUser() {
    this.sharedSer.setSelectedUserId(this.user._id);
    this.isSelected=true;
    this.router.navigate(['/dyn', this.user._id]);
  }

  UpdateUser() {
    let obj = {
      Name: this.Name,
      Email: this.Email,
      Street: this.Street,
      City: this.City,
      Zipcode: this.Zipcode,
    };
    this.sub2 = this.restUtils
      .Update('http://localhost:8000/users', this.user._id, obj)
      .subscribe((data) => alert(this.user.Name + ' was updated'));
  }

  DeleteUser() {
    this.sub = this.restUtils
      .Delete('http://localhost:8000/users', this.user._id)
      .subscribe((data) => {
        alert('deleted');
        this.sharedSer.setCommandSubject('refresh');
      });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }
  ngOnInit() {
    this.GetUserData();
    this.sub4=this.sharedSer.selectedUserId$.subscribe(selectedUserId=>{
      this.isSelected= selectedUserId===this.user._id;
    });
  }

}
