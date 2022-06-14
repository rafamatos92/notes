import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { NotesService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: User[] = [];

  loginForm: FormGroup = this.fb.group({ name: '' });

  constructor(
    private service: NotesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users = this.service.users;
  }

  login(user?: User): void {
    if (this.loginForm.valid) {
      if (user) {
        this.service.repeatLogin = user;
      } else {
        this.service.newUserLogin = {
          ...this.loginForm.value,
          token: Date.now(),
        };
      }

      this.router.navigate(['/notes']);
    }
  }
}
