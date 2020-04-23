import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SensorPageComponent} from './sensors/sensor-page/sensor-page.component';
import {SensorFormPageComponent} from './sensors/sensor-form-page/sensor-form-page.component';


const routes: Routes = [
  {path: '', component: SensorPageComponent},
  {path: 'sensor/:key', component: SensorFormPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
