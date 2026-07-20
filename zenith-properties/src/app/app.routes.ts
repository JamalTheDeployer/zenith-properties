import { Routes } from '@angular/router';

/**
 * Route map. v1 fully builds Home / Portfolio / Property detail.
 * Enquire, Sustainability and the Tenant Portal are wired in as real routes
 * with working stubs, so the whole architecture is present and each can be
 * fleshed out without restructuring.
 *
 * Lazy-loaded standalone components keep the initial bundle lean.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Zenith Properties — A curated portfolio of considered homes',
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component').then((m) => m.PortfolioComponent),
    title: 'Portfolio — Zenith Properties',
  },
  {
    path: 'property/:slug',
    loadComponent: () => import('./pages/property-detail/property-detail.component').then((m) => m.PropertyDetailComponent),
    title: 'The Residence — Zenith Properties',
  },
  {
    path: 'sustainability',
    loadComponent: () => import('./pages/sustainability/sustainability.component').then((m) => m.SustainabilityComponent),
    title: 'Sustainability — Zenith Properties',
  },
  {
    path: 'enquire',
    loadComponent: () => import('./pages/enquire/enquire.component').then((m) => m.EnquireComponent),
    title: 'Make an enquiry — Zenith Properties',
  },
  {
    path: 'portal',
    loadComponent: () => import('./pages/portal/portal.component').then((m) => m.PortalComponent),
    title: 'Tenant portal — Zenith Properties',
  },
  { path: '**', redirectTo: '' },
];
