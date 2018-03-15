import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

declare const Sortable: any;

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss']
})
export class DraggableComponent implements OnInit {

  @Output() _onChoose = new EventEmitter();
  @Output() _onStart = new EventEmitter();
  @Output() _onEnd = new EventEmitter();
  @Output() _onUpdate = new EventEmitter();
  @ViewChild('list') list;

  constructor() { }

  ngOnInit() {
    Sortable.create(this.list.nativeElement, {
      animation: 150,
      onChoose: (event) => this._onChoose.emit(event),
      onStart: (event) => this._onStart.emit(event),
      onEnd: (event) => this._onEnd.emit(event),
      onUpdate: (event) => this._onUpdate.emit(event)
    });
  }
}
