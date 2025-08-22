import { Direction } from '@angular/cdk/bidi';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Feed } from 'src/app/Models/Feed';
import { User } from 'src/app/Models/User';
import { FeedApiService } from 'src/app/api/feed-api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: Feed;
  // @Input() user$!: Observable<User | null>;
  @Input() user!: User | null;
  @Input() feed!: Subject<Observable<Feed[]> | null>;

  @Output() refreshPosts = new EventEmitter<void>();
  @ViewChild('ProfessionalForm') ProfessionalForm!: ElementRef;

  

  show: boolean = false;
  comments: any[] = [];
  likes: any[] = [];
  commentText: any = {};
  selectedItem: any;
  deletePostModal: boolean = false;
  showShareModal: boolean = false;
  shareText: string = '';
  editPostModal: boolean = false;
  deleteCommentModal: boolean = false;
  showComments: boolean = false;
  showLikes: boolean = false;
  postToEdit: any;
  postcontent: string = '';
  textDirection: boolean = this.translateService.getLangs()[0] === 'ar' ? false : true;
  direction: "rtl" | "ltr" = this.textDirection ? "rtl" : "ltr";

  constructor(private translateService: TranslateService, private feedService: FeedApiService, private http: HttpClient, private toaster: ToastrService) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateDirection(event.lang);
      this.direction = this.textDirection ? "rtl" : "ltr";
    });
  }

  ngOnInit(): void {
  }

  toggleShow() {
    this.show = !this.show;
  }


  reactPost(post: any) {
    if (this.isLikedByMe(post)) {
      post.userLikes = post.userLikes.filter((user: { id: number | undefined; }) => user.id !== this.user?.id);
      this.feedService.unlikeFeed(post.id).subscribe((data: any) => {
        this.feed.next(null);
        this.refreshPost();
      });
    } else {
      post.userLikes.push(this.user);
      this.feedService.likeFeed(post.id).subscribe((data: any) => {
        this.feed.next(null);
        this.refreshPost();
      });
    }
  }
  addComment(postid: any) {
    const comment = {
      text: this.commentText[postid],
    };
    this.feedService.addComment(postid, comment).subscribe((data: any) => {
      this.feed.next(null);
      this.refreshPost();
      this.commentText[postid] = '';
      this.feedService.findAll().subscribe((data: any) => {
        this.comments = data.filter((post: any) => post.id === postid)[0].comments;
      });

    });
  }

  showListComments(post: any) {
    this.showComments = true;
    this.comments = post.comments;
    this.selectedItem = post;
  }
  showListLikes(post: any) {
    this.showLikes = true;
    this.likes = post.userLikes;
    this.selectedItem = post;
  }
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
  editPost() {
    const post = this.selectedItem;
    post.post = this.postToEdit;
    this.feedService.updateFeed(post).subscribe((data: any) => {
      this.editPostModal = false;
      this.feed.next(null);
      this.refreshPost();
    });
  }


  deletePost() {
    const post = this.selectedItem;
    this.feedService.deleteFeed(post.id).subscribe((data: any) => {
      this.deletePostModal = false;
      this.feed.next(null);
      this.refreshPosts.emit();
    });
  }


  deleteComment() {
    const comment = this.selectedItem;
    this.feedService.deleteComment(comment.id).subscribe((data: any) => {
      this.deleteCommentModal = false;
      this.feed.next(null);
      this.refreshPost();
    });
  }
  onEditorChanged(event: any) {
    this.postcontent = event.html;
  }
  updateDirection(lang: string) {
    this.textDirection = (lang === 'ar') ? false : true;
  }

  refreshPost() {
    if (this.post && this.post.id) {
      this.feedService.findById(this.post.id).subscribe((post: Feed) => {
        this.post = post;
      });
      ;
    }
  }

  showSharePost() {
    this.showShareModal = true;
    this.selectedItem = this.post;
  }

  sharePost() {
    const post = {
      post: this.selectedItem.post,
      category: this.selectedItem.category,
      idUser: this.post.user.id,
      image: this.selectedItem.image,
      sharedById: this.user?.id,
      sharedContent: this.shareText,
      publisherType: this.selectedItem.publisherType,
      publisherId: this.selectedItem.publisherId,
    }

    this.feedService.shareFeed(post).subscribe((data: any) => {
      this.showShareModal = false;
      this.feed.next(null);
      this.refreshPosts.emit();
    });
  }

  isMyShare(post: any) {
    return post.sharedBy.id === this.user?.id;
  }

  isLikedByMe(post: any) {
    return post.userLikes.some((user: { id: number | undefined; }) => user.id === this.user?.id);
  }

  isMyPost(post: any) {
    return post.user.id === this.user?.id;
  }

  isMyComment(comment: any) {
    return comment.user.id === this.user?.id;
  }



}
