import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { MaquinasComponent } from './components/maquinas/maquinas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



 
const ROUTES: Routes = [
  {
    path: 'estrada',
    component: InicioComponent,
    children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'maquinas', component: MaquinasComponent },
          { path: '', redirectTo: 'estrada', pathMatch: 'full' }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'estrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash:true })],
  exports: [RouterModule]
})

export class AppRoutingModule {}