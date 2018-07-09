import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";
import {Subject} from "rxjs/index";
import {Injectable} from "@angular/core";
import {map} from "rxjs/internal/operators/map";



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
    //pipe method is the same as stream() from Java
    this.httpClient.get<{message:string,posts:any}>('http://localhost:3000/api/posts/').pipe(map(postData =>{
      return postData.posts.map(post => {
        return {title:post.title, content:post.content, id:post._id};
      })
    })).subscribe(transformedPosts =>{
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  addPost(title : string, content : string){
    const post : Post = {id:null,title:title,content:content} ;

    this.httpClient.post<{message:string,postId:string}>('http://localhost:3000/api/posts/',post).subscribe((responseData) =>{
      const postId = responseData.postId;
      post.id = postId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }

  deletePost(postId : any){

    this.httpClient.delete("http://localhost:3000/api/posts/" + postId).subscribe((responseData) => {
      const updatedPosts = this.posts.filter(post => {return post.id !== postId;});
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);

    })
  }

  constructor(private httpClient : HttpClient) {

  }
}
