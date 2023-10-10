// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

// App imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { homeScreenComponent } from './components/homeScreen/homeScreen.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, homeScreenComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [homeScreenComponent],
})
export class AppModule {}
