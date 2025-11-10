import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '@features/auth.component/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
    private readonly _auth = inject(AuthService)

    user = this._auth.user
}
