import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {DataService, ISensor} from '../data.service';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-sensor-page',
  templateUrl: './sensor-page.component.html',
  styleUrls: ['./sensor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('scrollContainer', {static: true}) scrollContainer: ElementRef;
  autoUpdates = true;
  destroy$ = new Subject();

  constructor(public dataService: DataService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void  {
    this.dataService.startChangeWatch();
    this.dataService.watchSub$.subscribe(() => !this.cdRef['destroyed'] && this.cdRef.detectChanges());
    this.setDisableWatchOnScrolling();
  }

  ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.scrollTop = this.dataService.scrollTop;
  }

  ngOnDestroy(): void {
    this.dataService.stopChangeWatch();
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackValue(index: number, item: ISensor): number {
    return item.value;
  }

  /**
   * скролл подгрузка элементов
   */
  scrollLoading() {
    const element = this.scrollContainer.nativeElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      this.dataService.loadMoreDisplayData();
    }
    this.dataService.scrollTop = element.scrollTop;
  }

  /**
   * остановка слежения за измененными значениями
   */
  setDisableWatchOnScrolling(): void {
    fromEvent(this.scrollContainer.nativeElement, 'scroll')
      .pipe(
          tap(() => this.dataService.stopChangeWatch()),
          takeUntil(this.destroy$)
      ).subscribe(() => {
        this.dataService.startChangeWatch();
    });
  }

  /**
   * Изменения состояния автообновления
   */
  changeUpdateState(): void {
    this.autoUpdates = !this.autoUpdates;
    this.autoUpdates ? this.dataService.startChangeWatch() : this.dataService.stopChangeWatch();
  }
}
