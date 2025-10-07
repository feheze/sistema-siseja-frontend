import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// O modelo não precisa mudar, vamos ajustar o tipo do status no componente
import { DashboardMetrics, RecentActivity, CoursePerformance } from '../models/dashboard';

// Atualize a interface para refletir os status em português
export interface RecentActivityPt extends Omit<RecentActivity, 'status'> {
  status: 'Ativo' | 'Concluído' | 'Pendente';
}


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getMetrics(): Observable<DashboardMetrics> {
    const metrics: DashboardMetrics = {
      totalStudents: 1250,
      activeCourses: 15,
      certificatesIssued: 850,
      newEnrollments: 75
    };
    return of(metrics).pipe(delay(500));
  }

  getRecentActivities(): Observable<RecentActivityPt[]> {
    // Note que o status agora está em português
    const activities: RecentActivityPt[] = [
      { studentName: 'Sophia Clark', course: 'Introdução à Programação', enrollmentDate: '2023-08-15', status: 'Ativo' },
      { studentName: 'Ethan Walker', course: 'Fundamentos de Marketing Digital', enrollmentDate: '2023-09-02', status: 'Concluído' },
      { studentName: 'Olivia Reed', course: 'Essenciais de Gestão de Projetos', enrollmentDate: '2023-09-18', status: 'Ativo' },
      { studentName: 'Liam Hayes', course: 'Análise de Dados com Python', enrollmentDate: '2023-10-05', status: 'Ativo' },
      { studentName: 'Ava Bennett', course: 'Básico de Design Gráfico', enrollmentDate: '2023-10-20', status: 'Pendente' }
    ];
    return of(activities).pipe(delay(800));
  }

  getCoursePerformance(): Observable<CoursePerformance[]> {
    const performance: CoursePerformance[] = [
        { courseName: 'Introdução à Programação', completionRate: 88 },
        { courseName: 'Marketing Digital', completionRate: 92 },
        { courseName: 'Gestão de Projetos', completionRate: 75 },
        { courseName: 'Análise de Dados', completionRate: 95 }
    ];
    return of(performance).pipe(delay(1000));
  }
}