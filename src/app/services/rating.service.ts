import { EventEmitter, Injectable } from '@angular/core';
import { RatingApiService } from '../api/rating-api.service';
@Injectable({
  providedIn: 'root'
})
export class RatingService {

    constructor(private ratingApiService: RatingApiService) { }

    findAll() {
        return this.ratingApiService.findAll();
    }

    addRating(rating: any) {
        return this.ratingApiService.addRating(rating);
    }

    deleteRating(id: number) {
        return this.ratingApiService.deleteRating(id);
    }

    updateRating(id: number, rating: any) {
        return this.ratingApiService.updateRating(id, rating);
    }

    findByUser(id: number) {
        return this.ratingApiService.findByUser(id);
    }

}  

