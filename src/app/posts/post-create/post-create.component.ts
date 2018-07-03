import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {PostsService} from "../posts.service";

@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent{


  //@Output() //the event can be listened to from outside (parent component)
  //postCreated = new EventEmitter<Post>();


  onAddPost(postForm : NgForm) {
    if(postForm.invalid){
      return;
    }
    this.postsService.addPosts(postForm.value.title, postForm.value.content)
    //this.postCreated.emit(post);
    postForm.resetForm();
  }

  constructor(public postsService : PostsService){}
}



