import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'firestoreTimestamp',
  standalone: true
})
export class FirestoreTimestampPipe implements PipeTransform {

  transform(value: Timestamp): string {
    const date = value?.toDate();
    const today = new Date();
    if(!date || date.getTime() > today.getTime()) return null;
    if(today.getFullYear() - date.getFullYear() > 1) 
      return `over ${today.getFullYear() - date.getFullYear()} years ago`
    
    if(today.getFullYear() - date.getFullYear() === 1) 
      return `over ${today.getMonth() - (date.getMonth() - 12)} months ago`
    
    if(today.getMonth() - date.getMonth() > 1) 
      return `over ${today.getMonth() - date.getMonth()} months ago`
      
    if(today.getMonth() - date.getMonth() === 1) 
      return `${today.getDate() - (date.getDate() - new Date(date.getFullYear(), date.getMonth(), 0).getDate())} days ago`
    
    if(today.getDate() - date.getDate() > 1) 
      return `${today.getDate() - date.getDate()} days ago`
    
    if(today.getDate() - date.getDate() === 1) 
      return `yesterday`
    
    if(today.getDate() === date.getDate()) {
      if(today.getHours() - date.getHours() > 1)
        return `${today.getHours() - date.getHours()} hours ago`
      else 
        return `${today.getMinutes() - date.getMinutes()} minutes ago`
    }
    return null;
  }

}
