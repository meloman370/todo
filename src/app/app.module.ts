import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { TodoItemComponent } from './component/todo-item/todo-item.component';
import {TodoService} from './service/todo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DraggableComponent } from './component/draggable/draggable.component';
import { SecondComponent } from './pages/second/second.component';
import { AnimComponent } from './component/anim/anim.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoItemComponent,
    DraggableComponent,
    SecondComponent,
    AnimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
