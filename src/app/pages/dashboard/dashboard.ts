import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

// Imports do Angular Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

// Importe o serviço e os modelos
import { DashboardService, RecentActivityPt } from '../../services/dashboard';
import { DashboardMetrics, CoursePerformance } from '../../models/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  metrics$!: Observable<DashboardMetrics>;
  recentActivities$!: Observable<RecentActivityPt[]>;
  coursePerformance$!: Observable<CoursePerformance[]>;

  displayedColumns: string[] = ['studentName', 'course', 'enrollmentDate', 'status'];

  // Mapeamento de status em português para cores do Mat-Chip
  statusColors: { [key: string]: 'primary' | 'accent' | 'warn' } = {
    'Ativo': 'primary',
    'Concluído': 'accent',
    'Pendente': 'warn'
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.metrics$ = this.dashboardService.getMetrics();
    this.recentActivities$ = this.dashboardService.getRecentActivities();
    this.coursePerformance$ = this.dashboardService.getCoursePerformance();
  }
}