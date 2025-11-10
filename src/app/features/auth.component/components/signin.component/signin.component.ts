import { Component, effect, inject, OnInit } from '@angular/core';
import { LoginForm } from '@features/auth.component/models/LoginForm';
import { AuthService } from '@features/auth.component/services/auth.service';

@Component({
  selector: 'app-signin',
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit{
    private readonly _authService = inject(AuthService)
    
    user = this._authService.user
    
    
    ngOnInit(): void {
        //this._authService.signIn({} as LoginForm)
    }

    handleSignIn (){
        this._authService.signIn({} as LoginForm)
    }
    handleSignOut(){
        this._authService.signOut()
    }
    handleCheckUser(){
        this._authService.checkUser()
    }
}
