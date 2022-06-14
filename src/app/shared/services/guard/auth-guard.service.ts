import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NotesService } from '..';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public service: NotesService, public router: Router) {}

  canActivate(): boolean {
    if (!this.service.sessionToken?.token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
