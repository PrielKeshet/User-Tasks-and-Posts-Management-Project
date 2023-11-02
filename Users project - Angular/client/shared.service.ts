import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
//BehaviorSubject for changing background color
  private selectedUserIdSubject= new BehaviorSubject<string | null>(null);
  selectedUserId$ =this.selectedUserIdSubject.asObservable();

  //subject for commands
  private commandSubject= new Subject<string>();

  setCommandSubject(command:string){
    this.commandSubject.next(command);
  }
  getCommandSubject(){
    return this.commandSubject.asObservable();
  }


  setSelectedUserId(userId: string) {
    this.selectedUserIdSubject.next(userId);
  }
}
