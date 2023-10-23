import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootFoldersComponent } from './root-folders/root-folders.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadCategoryComponent } from './load-category/load-category.component';

@NgModule({
  declarations: [
    AppComponent,
    RootFoldersComponent,
    CreateNewComponent,
    PageNotFoundComponent,
    LoadCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
