import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';
import Swal from 'sweetalert2';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = { email: '', password: '' };
  // token: string ='';

  constructor(private router: Router, private customerService: CustomerService, private local: LocationStrategy, private dialog: MatDialog) { }

  ngOnInit(): void {
    history.pushState(null, 'null', location.href);
    this.local.onPopState(() => {
      history.pushState(null, 'null', location.href);
    })
  }

  forgotPassword() {
    this.dialog.open(ForgotPasswordComponent, { width: '250px' });
  }

  loginCheck(data: any) {
    this.customerService.login(this.login).subscribe(response => {

      if (response.success == true) {
        // this.token = JSON.stringify(response.data.token);
        // this.token = this.token.replace(/"/g,'');
        localStorage.setItem('token', response.data.token);

        if (response.data.role == 'user') {
          this.router.navigate(['contact']); //redirect to user component
        } else if (response.data.role == 'admin') {
          this.router.navigate(['feedback']); //redirect to admin component
        } else {
          this.router.navigate(['home']);
        }

      }
    }, err => {
      if (err.error.success == false) {
        Swal.fire({
          icon: 'error',
          title: 'Incorrect User Id or Password',
          text: 'Please try again with correct credationals'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!,Please try again'
        })
      }
    })
  }
}
