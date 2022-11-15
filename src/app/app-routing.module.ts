import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeScreenComponent } from './components/homeScreen/homeScreen.component';

const routes: Routes = [
  {path: 'homeScreen', component: homeScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
