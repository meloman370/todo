import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

interface Todo {
  id: number;
  title: string;
}

@Injectable()
export class TodoService {

  todos = [];
  subject = new Subject<any>();

  constructor() {}

  getTodos() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.subject.next();
  }

  removeTodo(id) {
    this.todos = this.todos.filter((item: Todo) => {
      return item.id !== id;
    });
    this.subject.next();
  }

  change(): Observable<any> {
    return this.subject.asObservable();
  }

  refrash(oldIndex, newIndex) {
    if (oldIndex !== newIndex) {
      const value = this.todos[oldIndex];
      const mass = this.todos;
      mass.splice(oldIndex, 1);
      mass.splice(newIndex, 0, value);
      this.todos = mass;
      this.subject.next();
    }
  }
}
