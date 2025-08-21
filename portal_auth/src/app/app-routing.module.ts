import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { InternaComponent } from './views/interna/interna.component';
import { CurriculosComponent } from './views/curriculos/curriculos.component';
import { VagasComponent } from './views/vagas/vagas.component';
import { AuthGuard } from './guardas/auth.guard'; // ← Importe o AuthGuard
import { InternaAdminComponent } from './views/interna-admin/interna-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // 🔒 ROTAS PROTEGIDAS - Só com login
  {
    path: 'interna',
    component: InternaComponent,
    canActivate: [AuthGuard], // ← Protegida
  },
  {
    path: 'curriculos',
    component: CurriculosComponent,
    canActivate: [AuthGuard], // ← Protegida
  },
  {
    path: 'vagas',
    component: VagasComponent,
    canActivate: [AuthGuard], // ← Protegida
  },
  {
    path: 'interna-admin',
    component: InternaAdminComponent,
    canActivate: [AuthGuard], // ← Protegida
  },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
