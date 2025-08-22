import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Article } from '../Models/Article'; // Assuming you have a model named Article
import { CONSTANTS } from '../config/constant';
import { CloudinaryApiService } from './cloudinary-api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/article`;

  constructor(private toaster: ToastrService, private http: HttpClient, private cloudinaryService: CloudinaryApiService) { }

  findAll(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {

        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });}
        return EMPTY;
      }));
  }

  findById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });}
        return EMPTY;
      }));
  }

  update(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/update`, article)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });}
        return EMPTY;
      }));
  }
  add(dto: any, coachId: number, image: File | null): Observable<Article> {
    const uploadImage$ = image
      ? this.cloudinaryService.upload(image)
      : of(null)



    return uploadImage$.pipe(switchMap((data) => {
      dto.image = data?.url ? data?.url : dto.image
      return this.http.post<any>(`${this.apiUrl}/add`, dto)
        .pipe(catchError((err) => {
          if (err.status !== 401) {
          this.toaster.error('', 'An error occurred!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });}
          return EMPTY;
        }));
    }));
  }

  findAllByCoach(id: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/all/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        }); }
        return EMPTY;
      }));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        }); }
        return EMPTY;
      }));
  }


  updateImage(article: Article, image: any): Observable<Article> {
    return this.cloudinaryService.upload(image).pipe(switchMap((data) => {
      const newArticle = { ...article };
      newArticle.image = data?.url;
      return this.http.post<Article>(`${this.apiUrl}/update`, newArticle)
        .pipe(catchError((err) => {
          if (err.status !== 401) {
          this.toaster.error('', 'An error occurred!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });}
          return EMPTY;
        }));
    }));
  }

  likeArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/like/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while liking the feed!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  unlikeArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/unlike/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while unliking the feed!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }


  addComment(postId: number, comment: any): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/comment/${encodeURIComponent(postId)}`,  comment )
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while adding the comment!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  deleteComment(commentId: number): Observable<Article> {
    return this.http.delete<Article>(`${this.apiUrl}/comment/${encodeURIComponent(commentId)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting the comment!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
}
