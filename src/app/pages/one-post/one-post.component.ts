import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, startWith } from 'rxjs';
import { Feed } from 'src/app/Models/Feed';
import { User } from 'src/app/Models/User';
import { FeedApiService } from 'src/app/api/feed-api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})
export class OnePostComponent {
  post!:Feed;
  user$: Observable<User | null>;
  user: User | null = null;
  feed = new Subject<Observable<Feed[]> | null>();
  constructor(private loginService: AuthenticationService,private activatedRoute:ActivatedRoute, private feedService: FeedApiService){
  this.post = activatedRoute.snapshot.data["post"];
  this.user$ = this.loginService.loggedIn$;
    this.user$.subscribe((user) => {
      this.user = user;
    });    
  }
  refreshPost() {
    if (this.post && this.post.id) {
      this.feedService.findById(this.post.id).subscribe((post: Feed) => {
        this.post = post;
      });
      ;
    }
  }
}
