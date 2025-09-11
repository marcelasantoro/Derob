import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // ✅ adicionamos RouterLinkActive
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  titulo = 'EcoFinder';
}
