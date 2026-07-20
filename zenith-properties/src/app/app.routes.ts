import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'ZenithStay Properties — Residential property investment',
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component').then((m) => m.PortfolioComponent),
    title: 'Projects — ZenithStay Properties',
  },
  {
    path: 'project/:slug',
    loadComponent: () => import('./pages/property-detail/property-detail.component').then((m) => m.PropertyDetailComponent),
    title: 'Project case study — ZenithStay Properties',
  },
  {
    path: 'property/:slug',
    redirectTo: 'project/:slug',
  },
  {
    path: 'strategy',
    loadComponent: () => import('./pages/strategy/strategy.component').then((m) => m.StrategyComponent),
    title: 'Investment approach — ZenithStay Properties',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About — ZenithStay Properties',
  },
  {
    path: 'sustainability',
    redirectTo: 'strategy',
  },
  {
    path: 'enquire',
    loadComponent: () => import('./pages/enquire/enquire.component').then((m) => m.EnquireComponent),
    title: 'Contact — ZenithStay Properties',
  },
  { path: '**', redirectTo: '' },
];
