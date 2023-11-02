import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import{HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import{RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PostsComponent } from './posts/posts.component';
import { TasksComponent } from './tasks/tasks.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DynamicCompComponent } from './dynamic-comp/dynamic-comp.component';

const appRoutes: Routes = [
    {path: 'dyn/:id', component: DynamicCompComponent,
     children:[{path: 'posts', component: PostsComponent},
              {path: 'tasks', component: TasksComponent}]},
     {path: 'addUser', component: AddUserComponent}];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PostsComponent,
    TasksComponent,
    UserComponent,
    AddUserComponent,
    DynamicCompComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
