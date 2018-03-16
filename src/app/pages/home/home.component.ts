import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../../service/todo.service';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from "../../service/auth.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  todos = [];
  title;
  todoChange: Subscription;
  items;
  dbInit = this.db.list(`/${this.auth.user.uid}/items`);
  dbChange: Subscription;

  constructor(private todoService: TodoService, private db: AngularFireDatabase, private auth: AuthService) {}

  ngOnInit() {
    this.title = new FormControl('', Validators.required);
    this.todoChange = this.todoService.change().subscribe(() => {
      this.todos = this.todoService.getTodos();
      this.dbInit.remove()
          .then(_ => {
            const todoFactories = [];
            this.todos.forEach((item, i) => {
              todoFactories.push(this.todoFactory(i, item));
            });
            return this.executeFactories(todoFactories);
          })
          .catch(err => {
            console.log('error', err);
          });
    });

    this.dbInit.valueChanges().subscribe(data => {
      if (this.todos.length === 0) {
        data.map(item => {
          console.log(item);
          const id = Math.floor(Math.random() * 99999999);
          this.todos.push({id: id, title: item});
          this.todoService.todos = this.todos;
        });
      }
    });
  }

  executeFactories(factories) {
    let result = Promise.resolve();
    factories.forEach(factory => {
      result = result.then(factory);
    });
    return result;
  }

  todoFactory(index: number, data): Promise<any> {
    return this.dbInit.set(index.toString(), data.title);
  }

  addTodo() {
    if (this.title.valid) {
      const id = Math.floor(Math.random() * 99999999);
      this.todoService.addTodo({id: id, title: this.title.value});
      this.title.setValue('');
    }
  }

  onChangeDraggable(event) {
    const oldIndex = event.oldIndex;
    const newIndex = event.newIndex;
    this.todoService.refrash(oldIndex, newIndex);
  }

  ngOnDestroy(): void {
    this.todoChange.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
