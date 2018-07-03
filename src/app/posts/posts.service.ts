import {Post} from "./post.model";
import {Subject} from "rxjs/index";


//@Injectable({providedIn:'root'}) can be used instead of declaring it in the providers section of app.module.ts
export class PostsService {
  private posts : Post[] = [];
  private postsUpdated : Subject<Post[]> = new Subject<Post[]>();

  getPostsUpdatedListener(){
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    return [...this.posts] //makes a copy of the original array to make the class immutable;
  }

  addPosts(title : string, content : string){
    const post : Post = {title:title,content:content} ;
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
