import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.estaAutenticado()) {
      return true; // Permite acesso
    } else {
      this.router.navigate(['/login']); // Redireciona para login
      return false; // Bloqueia acesso
    }
  }
}