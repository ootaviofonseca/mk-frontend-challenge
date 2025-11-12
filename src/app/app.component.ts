import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { ListarDispositivosComponent } from './components/listar-dispositivos/listar-dispositivos.component';
import { AddDispositivoComponent } from './components/add-dispositivo/add-dispositivo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListarDispositivosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mk-frontend-challenge';


}
