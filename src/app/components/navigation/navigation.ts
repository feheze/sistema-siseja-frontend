import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
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
    RouterOutlet,
    MatExpansionModule
  ],

  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  protected readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    {
      label: 'Polos',
      icon: 'location_on',
      route: '/polos',
      children: [
        { label: 'Listar', icon: 'search', route: '/polos' },
        { label: 'Cadastro Novo', icon: 'add', route: '/polos/new' }        
      ]
    },
    { label: 'Cursos', icon: 'school', route: '/cursos' },
    { label: 'Alunos', icon: 'people', route: '/alunos' },
    { label: 'Relatórios', icon: 'assessment', route: '/relatorios' }
  ];
}
