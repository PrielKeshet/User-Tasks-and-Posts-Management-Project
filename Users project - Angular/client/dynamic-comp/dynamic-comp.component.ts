import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RestUtilsService } from '../rest-utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../task';
import { Post } from '../post';
import { User } from '../user';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-dynamic-comp',
  templateUrl: './dynamic-comp.component.html',
  styleUrls: ['./dynamic-comp.component.css']
})
export class DynamicCompComponent {
    constructor(private restUtils: RestUtilsService, private ar: ActivatedRoute, private sharedSer : SharedService) { }

    // @Output()
    // notify: EventEmitter<any> = new EventEmitter();

    userId: any;

    tasks: Task[] = [];
    posts: Post[] = [];

    taskFlag = true;
    postFlag=true;

    newTask = { Title: "", Completed: false};
    newPost = { Title: "", Body: "" };

    sub?: Subscription;
    sub2?: Subscription;
    changeTaskFlag() {
      this.taskFlag = !this.taskFlag;
    }
    changePostFlag(){
      this.postFlag = !this.postFlag;
    }
    addPost(){

        this.sub2= this.restUtils.Update('http://localhost:8000/users/addPost',this.userId, this.newPost)
        .subscribe(data => {
           alert('post was added');
            this.changePostFlag();
            this.GetData();
           });

    }

    addTask() {

      this.sub = this.restUtils.Update('http://localhost:8000/users/addTask', this.userId,this.newTask)
        .subscribe(data => {
           alert('task was added');
            this.changeTaskFlag();
            this.GetData();
            this.sharedSer.setCommandSubject('refresh');

           })
    }
    ngOnDestroy() {
      this.sub?.unsubscribe();
      this.sub2?.unsubscribe();
    }

    GetData() {

      //להוסיף סאבים
      this.ar.params.subscribe((data: any) => {
        this.userId = data["id"];
        this.restUtils.GetAllData('http://localhost:8000/users/' + this.userId)
          .subscribe((data: any) => {
            this.tasks = data[0].Tasks;
            this.posts = data[0].Posts
        });
      });


    }

    ngOnInit() {
      this.GetData();
    }
  }


