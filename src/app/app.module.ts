import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SensorPageComponent } from './sensors/sensor-page/sensor-page.component';
import { DataService } from './sensors/data.service';
import { RouterModule } from '@angular/router';
import { SensorFormPageComponent } from './sensors/sensor-form-page/sensor-form-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SensorPageComponent,
    SensorFormPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
