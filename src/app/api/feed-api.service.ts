import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, of, switchMap} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Feed} from '../Models/Feed';
import {CONSTANTS} from '../config/constant';
import {CloudinaryApiService} from './cloudinary-api.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FeedApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/feed`;

  constructor(private router: Router,private toaster: ToastrService, private http: HttpClient, private cloudinaryService: CloudinaryApiService) { }

  findAll(): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching feed details!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  getAll(page: number, size: number): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.apiUrl}/posts/${encodeURIComponent(page)}/${encodeURIComponent(size)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching feed details!',{
        closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  getAllByUser(id: number, page: number): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.apiUrl}/posts/user?page=${encodeURIComponent(page)}&userId=${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching feed details!', {
          closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  findById(id:number): Observable<Feed> {
      return this.http.get<Feed>(`${this.apiUrl}/getById/${encodeURIComponent(id)}`)
        .pipe(catchError((err) => {
          this.router.navigate(['/feed']);
          return EMPTY;
        }));
    }
  addFeed(dto: any, image: File | null): any {

    const uploadImage$ = image
      ? this.cloudinaryService.upload(image)
      : of(null)

    return uploadImage$.pipe(switchMap((data) => {
      dto.image = data?.url? data?.url :dto.image

      return  this.http.post<any>(`${this.apiUrl}/add`, dto)
        .pipe(catchError((err) => {
          if (err.status !== 401) {
              this.toaster.error('', 'An error occurred while adding the feed!', {
                closeButton: true,
                positionClass: 'toast-top-right'
              })
            ;}
          return EMPTY;
        }))
    }))

  }

  deleteFeed(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting the feed!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  likeFeed(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/like/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while liking the feed!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  unlikeFeed(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/unlike/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while unliking the feed!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }


  uploadimage(image: File | null): Observable<string> {
    if (image) {
      return new Observable<string>((observer) => {
        this.cloudinaryService.upload(image).subscribe(
          (imageData) => {
            observer.next(imageData.url); // Emit the URL string
            observer.complete(); // Complete the Observable
          },
          (error) => {
            observer.error(error); // Pass along the error
          }
        );
      });
    } else {
      return of(''); // Return an empty string if logo is null
    }
  }

  addComment(postId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comment/${encodeURIComponent(postId)}`,  comment )
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while adding the comment!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/comment/${encodeURIComponent(commentId)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting the comment!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  updateFeed(post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${encodeURIComponent(post.id)}`, post)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while updating the post!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  shareFeed(post:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/share`, post)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while sharing the post!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }



}
