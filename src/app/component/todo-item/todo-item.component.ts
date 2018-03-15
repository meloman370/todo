import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from '../../service/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() idTodo: number;
  @Input() titleTodo: string;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  deleteItem(id) {
    this.todoService.removeTodo(id);
  }
}
