import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@features/auth.component/services/auth.service';

export const authGuard: CanActivateFn = () => {
    const _auth = inject(AuthService)
    const router = inject(Router)
    if(_auth.isAuthenticated()) return true  
    router.navigate(['/auth'])
    return false;
};
