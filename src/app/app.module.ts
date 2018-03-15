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
import { AngularFireModule } from 'angularfire2';
import {firebaseConfig} from '../environments/firebase.config';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";


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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
