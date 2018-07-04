import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";
import {Subject} from "rxjs/index";
import {Injectable} from "@angular/core";



@Injectable({providedIn:'root'}) //can be used instead of declaring it in the providers section of app.module.ts
export class PostsService {
  private posts : Post[] = [];
  private postsUpdated : Subject<Post[]> = new Subject<Post[]>();

  getPostsUpdatedListener(){
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    //return [...this.posts] //makes a copy of the original array to make the class immutable;
    //we need to subscribe to http observable
    //unsubscribing happens automatically for this kind of observables.
    //we need to unsubscribe ourselves in case we use a subject (observable that we control)
    this.httpClient.get<{message:string,posts:Post[]}>('http://localhost:3000/api/posts/').subscribe((postData) =>{
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  addPosts(title : string, content : string){
    const post : Post = {id:null,title:title,content:content} ;

    this.httpClient.post<{message:string}>('http://localhost:3000/api/posts/',post).subscribe((responseData) =>{
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }

  constructor(private httpClient : HttpClient) {

  }
}
