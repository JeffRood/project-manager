import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  
  @Input() project!: Project;
  @Input() status: String = '';

  

  public doughnutChartLabels: string[] = [ 'Completed', 'In-Process' ];

  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
    maintainAspectRatio: false
  };

  ngOnInit(): void {
    this.loadPercent()
  }

  loadPercent() {
   const totalTask = this.project.tasks.length;
   if (totalTask == 0) {
    this.doughnutChartDatasets.push({ data: [totalTask, 100 - totalTask], backgroundColor: ['#12980F', '#504f4f'] })
    return
   }
   const taskCompleted = this.project.tasks.filter(x => x.status == 3);
   const percent = (taskCompleted.length / totalTask) * 100;
   this.doughnutChartDatasets.push({ data: [percent, 100 - percent], backgroundColor: ['#12980F', '#504f4f'] })

  }


}
