import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthComponent } from '@features/auth.component/auth.component';
import { AuthService } from '@features/auth.component/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


    const auth = inject(AuthService)
    const token = auth.token()

    const withAuth = token ? req.clone({setHeaders: { Authorization: token}}) : req
  
    console.log("iM here ====================", token)

    
    return next(withAuth)
};
