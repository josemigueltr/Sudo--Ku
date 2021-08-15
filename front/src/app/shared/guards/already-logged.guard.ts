import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')
    if (token) {
      const esComprador = JSON.parse(localStorage.getItem('es_comprador') || 'false')
      if (esComprador) {
        this.router.navigate(['/catalogo'])
      } else {
        this.router.navigate(['/vendedor'])
      }
      return false
    }
    return true
  }
  
}
