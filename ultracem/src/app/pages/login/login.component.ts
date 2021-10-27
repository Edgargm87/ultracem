import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formInicial: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.formInicial = this.fb.group({
      email: ['egonzalez', Validators.required],
      password: ['123456', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  login(){

    this._authService.postSession(this.formInicial.value.email,this.formInicial.value.password).subscribe(resp => {
      if(resp){
        this._router.navigate(['main/listRequest']);
      }
    })
  }

}
