import { Component } from '@angular/core';
import { NavBlankComponent } from '../nav-blank/nav-blank.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [NavBlankComponent, FooterComponent],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {

}
