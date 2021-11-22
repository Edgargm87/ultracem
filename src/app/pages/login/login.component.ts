import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
      email: ['muelles@gmail.com', Validators.required],
      password: ['1143163517', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  login(){
    Swal.fire({ title: 'Cargando', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._authService.postSession(this.formInicial.value.email,this.formInicial.value.password).subscribe(resp => {
      if(resp){
        Swal.close();
        this._router.navigate(['main/listRequest']);
      }
    })
  }

}
