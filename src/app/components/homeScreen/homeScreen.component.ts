import { Component } from '@angular/core';
import { npcClass } from 'src/app/models';
import { ThemeVariables, ThemeRef, lyl, StyleRenderer } from '@alyle/ui';

const STYLES = (theme: ThemeVariables, ref: ThemeRef) => {
  const __ = ref.selectorsOf(STYLES);
  return {
    $global: lyl`{
      body {
        background-color: ${theme.background.default}
        color: ${theme.text.primary}
        font-family: ${theme.typography.fontFamily}
        margin: 20
        direction: ${theme.direction}
      }
    }`,
    root: lyl`{
      display: block
    }`,
    card: lyl `{
        min-width: 320px
        max-width: 320px
        min-height: 500px
    }`
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './homeScreen.component.html',
  styleUrls: ['./homeScreen.component.css'],
  providers: [StyleRenderer],
})
export class homeScreenComponent {
  readonly classes = this.sRenderer.renderSheet(STYLES, true);

  title = 'EasyNPCHome';

  constructor(readonly sRenderer: StyleRenderer) {}
}
