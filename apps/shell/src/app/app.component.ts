import { Component } from '@angular/core';
import { ShellFrameLibModule } from '@appstrophe-workspace/shell-frame-lib';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'appstrophe-workspace-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ShellFrameLibModule
  ] 
})
export class AppComponent {

  title = 'shell';
  constructor(/*private firestore: AngularFirestore*/) {
   // this.firestore.collection('items').valueChanges().subscribe(console.log);
  }
}
