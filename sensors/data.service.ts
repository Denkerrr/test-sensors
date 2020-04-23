import { Injectable } from '@angular/core';
import {interval, Subject, Subscription} from 'rxjs';

export interface ISensor {
  key: string;
  value: number;
  time: string;
  description: string;
}

@Injectable()
export class DataService {

  /**
   * полный список датчиков
   */
  sensors: ISensor[] = [];
  /**
   * изменяемый список датчиков
   */
  displaySensors: ISensor[] = [];
  /**
   * субъект для слежения за изменениями датчиков из вне
   */
  watchSub$ = new Subject<ISensor>();
  /**
   * значение скролла
   */
  scrollTop = 0;

  private uniqNumberKeys: number[] = [];
  private intervalVar: Subscription;

  constructor() {
    this._setSensors();
  }

  /**
   * инициализация данных
   * @param length - общее количество данных
   */
  private _setSensors(length = 5000): void {
    this._setUniqRandomNumbers(length);
    this.sensors = Array.from({length}).map((x, i) => ({
      key: `Sensor-${ this.uniqNumberKeys[i] }`,
      value: this.getRandomNumber(),
      time: this.getCurrentDateISO(),
      description: this.getRandomDescription()
    })).sort((a, b) => {
      const prev = +a.key.match(/\d/g).join('');
      const next = +b.key.match(/\d/g).join('');
      return (prev > next) ? 1 : ((next > prev) ? -1 : 0);
    });
    this.displaySensors = this.sensors.slice(0, 500);
  }

  /**
   * получение текущей даты и времени в формате ISO
   */
  getCurrentDateISO(): string {
    return new Date().toISOString();
  }

  /**
   * Получение случайного текста
   */
  getRandomDescription(length = 200): string {
    let text = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      text += characters.charAt(Math.ceil(Math.random() * charactersLength));
    }
    return text;
  }

  /**
   * Получение случайного числа
   */
  getRandomNumber(length = 10000): number {
     return Math.floor(Math.random() * length);
  }

  /**
   * заполнение массива уникальными числами
   * @param length - длинна массива уникальных чисел
   */
  private _setUniqRandomNumbers(length: number): void {
    while (this.uniqNumberKeys.length < length) {
      const randomNumber = this.getRandomNumber();
      if (!this.uniqNumberKeys.includes(randomNumber)) {
        this.uniqNumberKeys.push(randomNumber);
      }
    }
  }

  /**
   * Получение значения массива по ключу
   * @param key - ключ
   */
  getSensorByKey(key: string): ISensor {
    return this.sensors.find(x => x.key === key);
  }

  /**
   * подгрузка данных для отображения
   */
  loadMoreDisplayData(): void {
    const lastIndex = this.displaySensors.length - 1;
    this.displaySensors = this.displaySensors.concat(this.sensors.slice(lastIndex , lastIndex + 500));
  }

  /**
   * поиск и перезапись значения в массиве отображаемых значений
   * @param sensor - обновленный датчик
   */
  private _changeDisplayValues(sensor: ISensor): void {
    const index = this.displaySensors.findIndex(x => x.key === sensor.key);
    if (~index) {
      this.displaySensors[index] = sensor;
      this.watchSub$.next(sensor);
    }
  }

  /**
   * изменение случайного датчика
   */
  changeRandomSensor(): void {
    const changeSensor: ISensor = this.sensors[this.getRandomNumber(this.sensors.length)];
    changeSensor.value = this.getRandomNumber();
    this._changeDisplayValues(changeSensor);
  }

  /**
   * запуск интервального изменения данных
   * @param time - время
   */
  startChangeWatch(time = 1000): void {
    if (this.intervalVar) {
      return;
    }
    this.intervalVar = interval(time).subscribe(() => this.changeRandomSensor());
  }

  /**
   * остановка интервального изменения данных
   */
  stopChangeWatch(): void {
    this.intervalVar && this.intervalVar.unsubscribe();
    this.intervalVar = undefined;
  }
}
