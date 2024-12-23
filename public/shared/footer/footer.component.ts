import {Component, SkipSelf} from '@angular/core';
import {TUI_ICON_RESOLVER, TuiIcon} from '@taiga-ui/core';
import {TuiStringHandler} from '@taiga-ui/cdk';

@Component({
  selector: 'app-footer',
  imports: [
    TuiIcon
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less',
  providers: [
    {
      provide: TUI_ICON_RESOLVER,
      deps: [[new SkipSelf(), TUI_ICON_RESOLVER]],
      useFactory(defaultResolver: TuiStringHandler<string>) {
        return (name: string) =>
          name.startsWith('@tui.')
            ? defaultResolver(name)
            : `../assets/images/${name}.svg`;
      },
    },
  ]
})
export class FooterComponent {
  readonly items = ['О магазине',
    'Контакты',
    'Вопросы и ответы',
    'Тех. поддержка',
    'Пользовательское соглашение',
    'Сообщить об ошибке'];

  readonly phone = '8 800 333 22 11';
  readonly email = 'gift_shop27@gmail.com'
}
