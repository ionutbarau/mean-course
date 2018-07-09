import {Component, Input} from "@angular/core";
import {Post} from "../post.model";
import {PostsService} from "../posts.service";
import {OnInit} from "@angular/core";
import {Subscription} from "rxjs/index";
import {OnDestroy} from "@angular/core";

@Component({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{



  /*posts = [
    {title:'First post', content:'This is my first post !'},
    {title:'Second post', content:'This is my second post !'},
    {title:'Third post', content:'This is my third post !'}
  ];*/

  //@Input() //can be populated from the parent component
  posts : Post[] = [];
  private postsSub  : Subscription;

  onDelete(postId : string){
    this.postsService.deletePost(postId);
  }


  constructor(public postsService : PostsService){}

  ngOnInit():void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdatedListener().subscribe((posts : Post[]) => {this.posts = posts});
  }

  ngOnDestroy():void {
    this.postsSub.unsubscribe();
  }
}
