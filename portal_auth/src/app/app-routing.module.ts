import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { InternaComponent } from './views/interna/interna.component';
import { InternaCorretorComponent } from './views/interna-corretor/interna-corretor.component';
import { MeusImoveisComponent } from './views/meus-imoveis/meus-imoveis.component';
import { InteressadosComponent } from './views/interessados/interessados.component';
import { AuthGuard } from './guardas/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // Usuários comuns
  { path: 'meus-imoveis', component: MeusImoveisComponent, canActivate: [AuthGuard] },
  { path: 'interessados', component: InteressadosComponent, canActivate: [AuthGuard] },
  { path: 'interna', component: InternaComponent, canActivate: [AuthGuard] },

  // Painel admin
  { path: 'interna-corretor', component: InternaCorretorComponent, canActivate: [AuthGuard] },

  // Rota coringa
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
