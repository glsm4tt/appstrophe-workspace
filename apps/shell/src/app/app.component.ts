import { Component } from '@angular/core';
import { Firestore, collectionData, collection, FirestoreModule } from '@angular/fire/firestore';
import { ShellFrameLibModule } from '@appstrophe-workspace/shell-frame-lib';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'appstrophe-workspace-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ShellFrameLibModule,
    FirestoreModule
  ] 
})
export class AppComponent {

  title = 'shell';
  constructor(private firestore: Firestore) {
    const mycollection = collection(firestore, 'items');
    collectionData(mycollection).subscribe(console.log);
  }
}
