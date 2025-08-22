import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from 'src/app/Models/User';
import {UserApiService} from 'src/app/api/user-api.service';
import {BehaviorSubject, catchError, Observable, startWith, Subject, switchMap, tap} from 'rxjs';
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../../../services/message.service";
import {Feed} from "../../../Models/Feed";
import {FeedApiService} from "../../../api/feed-api.service";
import {RatingService} from 'src/app/services/rating.service';
import {ConnectionApiService} from 'src/app/api/connection-api.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  User = new User();
  user$: Observable<User | null>;
  loggedUser$: Observable<User | null> = this.loginService.loggedIn$.pipe(tap((user) => {
    this.user = user;
  }));
  profileMenu = false;
  ratings: any[] = [];
  ratingModal = false;
  rating: number = 0;
  ratingComment: string = '';
  isRatedByMe: boolean = false;
  feeds: Feed[] = [];
  postsSubject = new BehaviorSubject<Feed[]>([]);
  feedsKey = new Subject<number>()
  flag = false;
  feeds$ = this.feedsKey.pipe(startWith(0), switchMap((id) => this.feedService.getAllByUser(this.User.id, id)), tap((feeds) => {
    if (feeds.length != 0) {
      this.feeds.push(...feeds);
    } else {
      this.flag = true;
    }
  }))

  constructor(private connectionService: ConnectionApiService, private feedService: FeedApiService, private router: Router, private messageService: MessageService, private loginService: AuthenticationService, private userService: UserApiService, private ratingService: RatingService, private activatedRoute: ActivatedRoute) {

    this.user$ = this.activatedRoute.queryParams.pipe(switchMap((params) => this.userService.findById(params['id'])), tap((user) => {
      this.User = user
      this.ratings = user.ratings
    }));

  }

  ngOnInit(): void {
  }

  reloadPosts() {
    this.page = 0;
    this.postsSubject.next([]);
    this.loadPosts();
  }

  loadPosts(): void {
    this.feedService.getAllByUser(this.User.id, this.page).pipe(
      catchError(error => {
        return [];
      })
    ).subscribe(posts => {
      this.postsSubject.next([...this.postsSubject.getValue(), ...posts]);
    });
  }

  toggleMenu() {
    this.profileMenu = !this.profileMenu;
  }


  messageUser(id: number) {
    this.messageService.addUserToInbox(id).subscribe((data) => {
      this.router.navigate(['/chat/detail'], {queryParams: {'id': data}})
    })
  }

  postmodal: boolean = false;
  withphotoinput: boolean = false;
  witheventinput: boolean = false;
  witharticleinput: boolean = false;
  deletePostModal: boolean = false;
  deleteCommentModal: boolean = false;
  showComments: boolean = false;
  comments: any[] = [];
  commentText: any = {};
  selectedItem: any;
  countries: any[] = [];
  postcontent = '';
  category = '';
  image: File | null = null;
  imageMin: File | null = null;
  user: User | null = null;
  feed = new Subject<Observable<Feed[]> | null>();
  @ViewChild('ProfessionalForm') ProfessionalForm!: ElementRef;
  removeConnection: boolean = false;


  isLikedByMe(post: any) {
    return post.userLikes.some((user: { id: number | undefined; }) => user.id === this.user?.id);
  }

  isMyPost(post: any) {
    return post.user.id === this.user?.id;
  }

  isMyComment(comment: any) {
    return comment.user.id === this.user?.id;
  }


  onFileChange(event: any) {
    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }

  }

  closeModal() {

    this.postmodal = false;
  }

  addPost() {
    this.postmodal = false;

    const feed = {
      id: 0,
      post: this.postcontent,
      category: this.category,
    };

  }

  reactPost(post: any) {
    if (this.isLikedByMe(post)) {
      this.feedService.unlikeFeed(post.id).subscribe((data: any) => {
        this.feed.next(null);
      });
    } else {
      this.feedService.likeFeed(post.id).subscribe((data: any) => {
        this.feed.next(null);
      });
    }

  }


  addComment(postid: any) {
    const comment = {
      text: this.commentText[postid],
    };
    this.feedService.addComment(postid, comment).subscribe((data: any) => {
      this.feed.next(null);
      this.commentText[postid] = '';
      this.feedService.findAll().subscribe((data: any) => {
        this.comments = data.filter((post: any) => post.id === postid)[0].comments;
      });

    });
  }

  parseData(data: any, keysToSplit: string[]) {
    const parsedData: any = {};

    // Iterate over the keys of the JSON object
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let shouldSplit = keysToSplit.includes(key.split('.')[0]);
        if (shouldSplit) {
          const [category, value] = key.split('.');
          if (!parsedData[category]) {
            parsedData[category] = [];
          }
          if (data[key]) {
            parsedData[category].push(value);
          }
        } else {
          parsedData[key] = data[key];
        }
      }
    }

    for (const key in parsedData) {
      if (Array.isArray(parsedData[key])) {
        parsedData[key] = parsedData[key].join(',');
      }
    }

    return parsedData;
  }


  openPostModal(type: any): void {
    this.postmodal = true;

    switch (type) {
      case 'photo':
        this.withphotoinput = true;
        this.witheventinput = false;
        this.witharticleinput = false;
        break;
      case 'event':
        this.witheventinput = true;
        this.withphotoinput = false;
        this.witharticleinput = false;
        break;
      case 'article':
        this.witharticleinput = true;
        this.withphotoinput = false;
        this.witheventinput = false;
        break;
      case 'none':
        this.withphotoinput = false;
        this.witheventinput = false;
        this.witharticleinput = false;
        break;
    }


  }

  showListComments(post: any) {
    this.showComments = true;

    this.comments = post.comments;

    this.selectedItem = post;


  }

  postToEdit: any;
  editPostModal: boolean = false;

  show: boolean = false;

  showDeleteModal(item: any, type: string) {
    this.selectedItem = item;
    if (type === 'post') {
      this.deletePostModal = true;
    } else {
      this.deleteCommentModal = true;
    }
  }

  showEditModal(item: any) {
    this.selectedItem = item;
    this.postToEdit = item.post;
    this.editPostModal = true;
  }

  toggleShow() {
    this.show = !this.show;
  }

  deletePost() {
    const post = this.selectedItem;
    this.feedService.deleteFeed(post.id).subscribe((data: any) => {
      this.deletePostModal = false;
      this.feed.next(null);
    });
  }


  deleteComment() {
    const comment = this.selectedItem;
    this.feedService.deleteComment(comment.id).subscribe((data: any) => {
      this.deleteCommentModal = false;
      this.feed.next(null);
    });
  }


  connect(id: number, sent: boolean) {
    if (!sent) {
      this.connectionService.sendRequest(id).subscribe(() => {
          this.User.sentRequest = true;
        }
      )

    } else {
      this.connectionService.cancelRequest(id).subscribe(() => {
          this.User.sentRequest = false;
        }
      )
    }
  }

  disconnect(id: number) {
    this.removeConnection = true;
  }

  confirmDisconnect() {
    this.connectionService.removeConnection(this.User.id).subscribe(() => {
      this.User.connected = false;
      this.removeConnection = false;
      this.removeConnection = false;
    });
  }

  closeRemove() {

    this.removeConnection = false;
  }

  myConnections = false

  openMyConnection() {
    this.myConnections = true;
  }

  closeMyConnection() {
    this.myConnections = false;
  }

  getRatings() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.ratingService.findByUser(id).subscribe((data: any) => {
      this.ratings = data;
      this.isRatedByMe = this.ratings.some((rating) => rating.idSender === this.user?.id);
    });
  }

  stars(n: number) {
    return Array(n).fill(0).map((x, i) => i);
  }

  overallRating() {
    if (this.ratings.length === 0) {
      return 0;
    }
    return this.ratings.reduce((acc, rating) => acc + rating.rating, 0) / this.ratings.length;
  }

  rate() {
    const userid = this.activatedRoute.snapshot.queryParams['id'];

    this.loggedUser$.subscribe((user) => {
      this.user = user;
    });

    const sender = this.user;

    const rating = {
      rating: this.rating,
      comment: this.ratingComment,
      idSender: sender?.id,
      idUser: userid
    };

    this.ratingService.addRating(rating).subscribe((data) => {
      this.ratingModal = false;
      this.rating = 0;
      this.ratingComment = '';
      this.getRatings();
    });


  }

  showRatingModal() {
    this.ratingModal = true;
    //show my rating
    this.ratings.forEach((rating) => {
      if (rating.idSender === this.user?.id) {
        this.rating = rating.rating;
        this.ratingComment = rating.comment;
      }
    });
  }

  editRating() {
    const id = this.ratings.find((rating) => rating.idSender === this.user?.id)?.id;

    if (id) {
      const rating = {
        idSender: this.user?.id,
        idUser: this.activatedRoute.snapshot.queryParams['id'],
        rating: this.rating,
        comment: this.ratingComment
      };


      this.ratingService.updateRating(id, rating).subscribe((data) => {
        this.ratingModal = false;
        this.rating = 0;
        this.ratingComment = '';
        this.getRatings();
      });
    }

  }

  deleteRating() {
    const id = this.ratings.find((rating) => rating.idSender === this.user?.id)?.id;

    if (id) {
      this.ratingService.deleteRating(id).subscribe((data) => {
        this.ratingModal = false;
        this.rating = 0;
        this.ratingComment = '';
        this.getRatings();
      });
    }

  }

  key = "main"

  changeKey(k: string, event: any = null) {
    if (event) {

      this.key = event.target.value;
    } else {
      this.key = k;
    }
  }

  validate(id: number, validated: boolean) {
    this.userService.validate(id, validated).subscribe();
  }
  page = 0;

  onScroll() {
    if (!this.flag) {
      this.page++;
      this.feedsKey.next(this.page);
    }
  }
}

