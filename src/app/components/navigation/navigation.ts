import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-navigation',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" [mode]="'side'" [opened]="true">
        <mat-toolbar>SISEJA</mat-toolbar>
        <mat-nav-list>
          @for (item of navItems; track item.route) {
            <a mat-list-item 
               [routerLink]="item.route"
               routerLinkActive="active">
              <mat-icon matListItemIcon>{{item.icon}}</mat-icon>
              <span matListItemTitle>{{item.label}}</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="drawer.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Sistema de Gestão EAD</span>
        </mat-toolbar>

        <div class="content">
          <router-outlet />
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  protected readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Polos', icon: 'location_on', route: '/polos' },
    { label: 'Cursos', icon: 'school', route: '/cursos' },
    { label: 'Alunos', icon: 'people', route: '/alunos' },
    { label: 'Relatórios', icon: 'assessment', route: '/relatorios' }
  ];
}