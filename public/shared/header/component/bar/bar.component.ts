import { Component } from '@angular/core';

@Component({
  selector: 'main-bar',
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.less'
})
export class BarComponent {
  public items = ['День рождения', '8 марта', '23 февраля', 'Новый год', 'День победы'];
}
