import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importe o componente que você acabou de criar
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { InternaComponent } from './views/interna/interna.component';
import { CurriculosComponent } from './views/curriculos/curriculos.component';
import { VagasComponent } from './views/vagas/vagas.component';
import { AuthGuard } from './guardas/auth.guard';

const routes: Routes = [
  // Esta é a rota principal.
  // Quando a URL for apenas '/', o componente HomeComponent será exibido.
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'interna', component: InternaComponent, canActivate: [AuthGuard] },
  { path: 'curriculos', component: CurriculosComponent },
  { path: 'vagas', component: VagasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}