import { Component, signal, WritableSignal } from '@angular/core';
import { SigninComponent } from './components/signin.component/signin.component';
import { SignupComponent } from './components/signup.component/signup.component';

@Component({
  selector: 'app-auth.component',
  imports: [SigninComponent, SignupComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
    tempConnected: WritableSignal<boolean> = signal(false)

    toggleConnected = (): void => {
        this.tempConnected.update(v => !v)
    }
}