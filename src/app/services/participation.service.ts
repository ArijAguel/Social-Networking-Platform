import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ParticipationApiService } from '../api/participation-api.service';

@Injectable({
    providedIn: 'root'
})
export class ParticipationService {

    constructor(private toaster: ToastrService, private paricipationService: ParticipationApiService) { }

    findAll() {
        return this.paricipationService.findAll();
    }

    findById(id: number) {
        return this.paricipationService.findById(id);
    }

    findByType(type: string) {
        return this.paricipationService.findByType(type);
    }

    findByUserId(userId: number) {
        return this.paricipationService.findByUserId(userId);
    }

    findByTypeId(typeId: number) {
        return this.paricipationService.findByTypeId(typeId);
    }

    findByTypeAndTypeId(type: string, typeId: number) {
        return this.paricipationService.findByTypeAndTypeId(type, typeId);
    }

    addParticipation(userId: number, participation: any) {
        return this.paricipationService.addParticipation(userId, participation);
    }

    deleteParticipation(type : any , userId: number , eventId: number) {
        return this.paricipationService.deleteParticipation(type , userId, eventId);
    }

    updateParticipation(id: number, participation: any) {
        return this.paricipationService.updateParticipation(id, participation);
    }




}
