import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { DeviceService } from '../core/services/device.service';
import { ListarDispositivosComponent } from './components/listar-dispositivos/listar-dispositivos.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLinkWithHref,ListarDispositivosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mk-frontend-challenge';


}
