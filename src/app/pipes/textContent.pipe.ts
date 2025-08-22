import { Pipe, PipeTransform } from '@angular/core';
import {Notification} from "../Models/Notification";

@Pipe({
  name: 'content'
})
export class TextContentPipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): string {
        let doc = new DOMParser().parseFromString(value, 'text/html');
        return doc.body.textContent || "";
    }

}
