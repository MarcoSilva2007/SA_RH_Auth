import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Implements da interface (classe abstracta) 
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  // Método obrigatorio da classe CanActivate
  canActivate(): boolean {
    if (this.authService.estaAutenticado()) {
      return true;
    } else {
    this.router.navigate(['/login']);
    return false;
    }
  }
};


