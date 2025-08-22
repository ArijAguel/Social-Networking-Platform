import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { RendezVous } from '../Models/Rendez-vous';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../config/constant';
import { ToastrService } from 'ngx-toastr';

/*
   @GetMapping("/all")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(attendanceService.findAll().stream().map(AttendanceDto::fromEntity).toList());
    }

    @GetMapping("/rendezvous/{id}")
    public ResponseEntity<?> findAllByRendezVous(@PathVariable("id") Long id) {
        return ResponseEntity.ok(attendanceService.findAllByRendezVous(id).stream().map(AttendanceDto::fromEntity).toList());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> findAllByUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok(attendanceService.findAllByUser(id).stream().map(AttendanceDto::fromEntity).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(AttendanceDto.fromEntity(attendanceService.findById(id)));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestHeader("Authorization") String authorizationHeader, @RequestBody AttendanceDto attendanceDto) {
        return ResponseEntity.ok(attendanceService.create(jwtService.getUserFromToken(authorizationHeader), attendanceDto).stream().map(AttendanceDto::fromEntity).toList());
    }

    @PostMapping("/update/{id}")
public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody AttendanceDto attendanceDto) {
        return ResponseEntity.ok(attendanceService.update(id, attendanceDto).stream().map(AttendanceDto::fromEntity).toList());
    }
*/





@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    private apiUrl = `${CONSTANTS.API_BASE_URL}/attendance`;

    constructor(private http: HttpClient, private toaster: ToastrService) { }

    findAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/all`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching attendance details!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
                return EMPTY;
            }));
    }

    findAllByRendezVous(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/rendezvous/${encodeURIComponent(id)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching attendance details!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
                return EMPTY;
            }));
    }

    findAllByUser(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/user/${encodeURIComponent(id)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching attendance details!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
                return EMPTY;
            }));
    }

    findById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${encodeURIComponent(id)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching attendance details!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
                return EMPTY;
            }));
    }

    create(attendance: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/create`, attendance)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while creating a new attendance!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
                return EMPTY;
            }));
    }

    update(id: number, attendance: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/update/${encodeURIComponent(id)}`, attendance)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while updating the attendance!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
                return EMPTY;
            }));
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while deleting the attendance!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
                return EMPTY;
            }));
    }

   
}

