import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { homeScreenComponent } from './components/homeScreen/homeScreen.component';

@NgModule({
  declarations: [
    AppComponent,
    homeScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [homeScreenComponent]
})
export class AppModule { }
