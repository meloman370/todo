import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../../service/todo.service';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  todos;
  title;
  todoChange: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.title = new FormControl('', Validators.required);
    this.todoChange = this.todoService.change().subscribe(() => {
      this.todos = this.todoService.getTodos();
      console.log(this.todos);
    });
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
}
