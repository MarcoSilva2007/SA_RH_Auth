import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { InternaComponent } from './views/interna/interna.component';
import { AdminComponent } from './views/interna-admin/interna-admin.component';
import { CurriculosComponent } from './views/curriculos/curriculos.component';
import { VagasComponent } from './views/vagas/vagas.component';
import { AdminVagasComponent } from './views/vagas-admin/admin-vagas.component'; // <- import adicionado
import { AuthGuard } from './guardas/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // Usuários comuns
  { path: 'curriculos', component: CurriculosComponent, canActivate: [AuthGuard] },
  { path: 'vagas', component: VagasComponent, canActivate: [AuthGuard] },
  { path: 'interna', component: InternaComponent, canActivate: [AuthGuard] },

  // Painel admin
  { path: 'interna-admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin-vagas', component: AdminVagasComponent, canActivate: [AuthGuard] }, // <- nova rota

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
