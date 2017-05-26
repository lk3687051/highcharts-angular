import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chart',
  template: ''
})

export class ChartComponent {
  constructor(private el: ElementRef) { };

  chart: any;
  @Input() Highcharts: any;
  @Input() constructorType: string;
  @Input() callbackFunction: any;
  optionsValue: any;
  @Input()
  set options(val) {
    this.optionsValue = val;
    this.updateOrCreateChart();
  }

  updateValue = false;
  @Output() updateChange = new EventEmitter(true);
  @Input() set update(val) {
    if (val) {
      this.updateOrCreateChart();
      this.updateChange.emit(false); // clear the flag after update
    }
  }
  
  updateOrCreateChart = function () {
    if (this.chart && this.chart.update) {
      this.chart.update(this.optionsValue);
    } else {
      this.chart = this.Highcharts[this.constructorType || 'chart'](
        this.el.nativeElement,
        this.optionsValue,
        this.callbackFunction || null
      );
    }
  }
}