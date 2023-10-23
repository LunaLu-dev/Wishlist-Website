import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewComponent } from './create-new/create-new.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RootFoldersComponent } from './root-folders/root-folders.component';

const routes: Routes = [
  { path: '', component: RootFoldersComponent },
  { path: 'create', component: CreateNewComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
