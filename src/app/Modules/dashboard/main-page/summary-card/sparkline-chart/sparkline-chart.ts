import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sparkline-chart',
  standalone: false,
  templateUrl: './sparkline-chart.html',
  styleUrl: './sparkline-chart.scss',
})
export class SparklineChart {
  @Input() color: string = '#4F46E5';
  gradientId: string = 'sparklineGrad_' + Math.random().toString(36).substring(2, 9);
}
