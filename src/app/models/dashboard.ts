export interface DashboardMetrics {
  totalStudents: number;
  activeCourses: number;
  certificatesIssued: number;
  newEnrollments: number;
}

export interface RecentActivity {
  studentName: string;
  course: string;
  enrollmentDate: string;
  status: 'Active' | 'Completed' | 'Pending';
}

export interface CoursePerformance {
  courseName: string;
  completionRate: number;
}