import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    UserService
  ]
})

export class AppComponent implements OnInit{
  public title = 'Music App'
  public user: User
  public user_register: User
  public identity
  public token
  public errorMessage
  public alertRegister

  constructor(private _userService: UserService){
    this.user = new User('', '', '', '', '', 'ROLE_USER', '')
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '')
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }

  public onSubmit(){
     
    this._userService.singup(this.user).subscribe(
      response => {
        let identity = response.user
        this.identity = identity
        if(!this.identity._id){
          alert("El usuario no esta correctamente identificado")
        }else{

          localStorage.setItem('identity', JSON.stringify(identity))

          this._userService.singup(this.user, true).subscribe(
            response => {
              let token = response.token
              this.token = token
              if(this.token.length <= 0){
                alert("El token no se ha generado")
              }else{
                localStorage.setItem('token', JSON.stringify(token))
                this.user = new User('', '', '', '', '', 'ROLE_USER', '')
              }
              
            }, 
            error => {
              let errorMessage = <any>error
              if(errorMessage != null){
                var body = JSON.parse(error._body)
                this.errorMessage = body.message 
                console.log(error)
              }
            }
          )
          

        }
      }, 
      error => {
        let errorMessage = <any>error
        if(errorMessage != null){
          var body = JSON.parse(error._body)
          this.errorMessage = body.message 
          console.log(error)
        }
      }
    )

  }

  public logOut(){
    localStorage.removeItem('identity')
    localStorage.removeItem('token')
    localStorage.clear();
    this.identity = null
    this.token = null
  }

  onSubmitRegister(){
    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user
        this.user_register = user
        if(!user._id){
          this.alertRegister = 'Error al registrarse'
        }else{
          this.alertRegister = 'El registro se ha realizado correctamente ('+this.user_register.email+')'
          this.user_register = new User('', '', '', '', '', 'ROLE_USER', '')
        }
      }, 
      error => {
        let errorMessage = <any>error
        if(errorMessage != null){
          var body = JSON.parse(error._body)
          this.alertRegister = body.message 
          console.log(error)
        }
      }
    )
  }

}
