import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompradorGuard implements CanActivate {

  constructor (
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')
    const esComprador = JSON.parse(localStorage.getItem('es_comprador') || 'false')
    if (!token || !esComprador) {
      this.router.navigate(['/auth'])
      return false
    }
    return true
  }
  
}
