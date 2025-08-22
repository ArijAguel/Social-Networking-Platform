import {Component, EventEmitter, Input, Output} from '@angular/core';
import {of, startWith, Subject, switchMap, tap} from "rxjs";
import {Request} from "../../../../Models/Request";
import {ConnectionApiService} from "../../../../api/connection-api.service";
import {ProgramService} from "../../../../services/program.service";
import {CoachService} from "../../../../services/coach.service";
import {Connection} from "../../../../Models/Connection";

@Component({
  selector: 'app-user-connections',
  templateUrl: './user-connections.component.html',
  styleUrls: ['./user-connections.component.css']
})
export class UserConnectionsComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter();  key$ = new Subject<any>()
  requests$ =   this.key$.pipe(startWith(null),switchMap((key)=> !key?this.connectionService.getConnections():of(key) ) );


  constructor(private connectionService: ConnectionApiService,private programService: ProgramService, private coachService: CoachService) {
  }
  closeModal() {
    this.visible = false;
    this.close.emit();
  }

  addUser(id: number) {
    this.connectionService.acceptRequest(id).subscribe((data) => {
      this.key$.next(data);
    });
  }

  removeConnection(id: number) {
    this.connectionService.removeConnection(id).subscribe((data) => {
      this.key$.next(null);
    });

  }
}
