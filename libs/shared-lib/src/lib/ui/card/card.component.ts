import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'appstrophe-workspace-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() photoUrl!: string;
  @Input() imgUrl!: string;


  constructor() {
    // empty
   }

  ngOnInit(): void { 
    // empty
  }
}
