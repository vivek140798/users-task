import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
