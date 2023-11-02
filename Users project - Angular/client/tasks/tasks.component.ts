import { Component, Input } from '@angular/core';
import { Task } from '../task';
import { RestUtilsService } from '../rest-utils.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  constructor(
    private restUtils: RestUtilsService,
    private ar: ActivatedRoute,
    private sharedSer : SharedService) {}

  @Input()
  task: Task = new Task('', '', false);
  sub?: Subscription;
  sub2?: Subscription;
  userId: any;

  ngOnInit(): void {
    this.sub2 = this.ar.params.subscribe((data: any) => {
      this.userId = data['id'];
    });
  }

  completed() {
    let obj = { id: this.task._id };
    this.sub = this.restUtils
      .Update('http://localhost:8000/users/completeTask', this.userId, obj)
      .subscribe((data) => {
        this.task.Completed = true;
        alert('completed');
        this.sharedSer.setCommandSubject('refresh');
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}
