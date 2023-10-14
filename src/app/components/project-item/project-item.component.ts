import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent {
  
  @Input() project!: Project;

  public doughnutChartLabels: string[] = [ ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 30, 70], backgroundColor: ['#12980F', 'white'] }
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
    maintainAspectRatio: false,
 

  };
}
