// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Alyle imports
import {
  LyHammerGestureConfig,
  LY_THEME,
  LY_THEME_NAME,
  StyleRenderer,
  LyTheme2,
} from '@alyle/ui';
import {
  MinimaLight,
  MinimaDeepDark,
  MinimaDark,
} from '@alyle/ui/themes/minima';
import { LyCommonModule } from '@alyle/ui';
import { LyCardModule } from '@alyle/ui/card';
import { LyTypographyModule } from '@alyle/ui/typography';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { LyGridModule } from '@alyle/ui/grid';
import { LyListModule } from '@alyle/ui/list';

// App imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { homeScreenComponent } from './components/homeScreen/homeScreen.component';

@NgModule({
  declarations: [AppComponent, homeScreenComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HammerModule,
    LyCommonModule,
    LyCardModule,
    LyTypographyModule,
    LyButtonModule,
    LyIconModule,
    LyListModule,
    LyGridModule,
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
    StyleRenderer,
    LyTheme2,
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: MinimaDeepDark, multi: true },
    { provide: LY_THEME, useClass: MinimaDark, multi: true },
  ],
  bootstrap: [homeScreenComponent],
})
export class AppModule {}
