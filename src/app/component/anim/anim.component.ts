import {Component, OnInit} from '@angular/core';
import {animate, transition, state, trigger, style, keyframes} from "@angular/animations";

@Component({
  selector: 'app-anim',
  templateUrl: './anim.component.html',
  styleUrls: ['./anim.component.scss'],
  animations: [
      trigger('state', [
          state('active', style({
            'transform': 'scale(1.1)'
          })),
          state('inactive', style({
            'transform': 'scale(1)'
          })),
          transition('active => inactive', animate(100)),
          transition('inactive => active', animate(50))
      ]),
      trigger('LR', [
          state('in', style({
            'transform': 'translateX(0)'
          })),
          transition('void => *', [
            animate(300, keyframes([
              style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
              style({opacity: 1, transform: 'translateX(-15px)', offset: 0.3}),
              style({opacity: 1, transform: 'translateX(0)', offset: 1.0}),
            ]))
          ]),
        transition('* => void', [
          animate(300, keyframes([
            style({opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
            style({opacity: 0, transform: 'translateX(100%)', offset: 1.0}),
          ]))
        ])
      ])
  ]
})
export class AnimComponent implements OnInit {

  active = false;
  state;

  constructor() { }

  ngOnInit() {
    this.setState();
  }

  onClick() {
    this.active = !this.active;
    this.setState();
  }

  setState() {
    if (this.active) {
      this.state = 'active';
    } else {
      this.state = 'inactive';
    }
  }

}
