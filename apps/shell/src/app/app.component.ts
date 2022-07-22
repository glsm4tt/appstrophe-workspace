import { Component } from '@angular/core';
import { Firestore, collectionData, collection, FirestoreModule } from '@angular/fire/firestore';
import { ShellFrameLibModule } from '@appstrophe-workspace/shell-frame-lib';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';

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
    const mycollection = collection(this.firestore, 'items');
    collectionData(mycollection).subscribe(console.log);
  }
}
