
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RestUtilsService {
    constructor(private http :HttpClient) { }

    GetAllData(url: string){
      return this.http.get<any[]>(url);
    }


    GetDataById(url: string, id:number){
  return this.http.get(`${url}/${id}`);
    }

    AddItem(url:string, obj:any){
      return this.http.post(url,obj);
    }

    Update(url:string, id:string, obj:any){
      return this.http.put(`${url}/${id}`,obj);
    }

    Delete(url: string, id:string){
      return this.http.delete(`${url}/${id}`);
    }
    CompleteTask(url: string, userId:string, taskId:string){

    }
}