import { Component, OnInit } from '@angular/core';
import {DataService, ISensor} from '../data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sensor-form-page',
  templateUrl: './sensor-form-page.component.html',
  styleUrls: ['./sensor-form-page.component.scss']
})
export class SensorFormPageComponent implements OnInit {

  sensor: ISensor;

  constructor(public dataService: DataService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sensor = this.dataService.getSensorByKey(this.activeRoute.snapshot.params.key);
  }

}
