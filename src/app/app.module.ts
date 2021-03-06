import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule} from "@angular/material";
import {AppComponent} from "./app.component";
import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "./header/header.component";
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostsService} from "./posts/posts.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],//here you can inject services also
  bootstrap: [AppComponent]
})
export class AppModule {
}
