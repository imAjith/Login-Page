import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  public showPassword: boolean = false;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/userdb")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Sucess!!");
        this.loginForm.reset();
        this.router.navigate(["home"]);
      }else{
        alert ("user not found");
      }
    }, err=>{
      alert("Somthing went wrong!!")
    })
  }
  public pwdEye(): void {
    this.showPassword = !this.showPassword;
  }

}
