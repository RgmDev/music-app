import { Component, OnInit } from '@angular/core'

import { GLOBAL } from '../services/global'

import { UserService } from '../services/user.services'
import { User } from '../models/user'

@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.html',
  providers: [ UserService ]
})

export class UserEditComponent implements OnInit{
  public titulo: string
  public user: User
  public identity
  public token
  public alertMessage
  public url: string
  public filesToUpload: Array<File>

  constructor(
    private _userService: UserService
  ){
    this.titulo = 'Actualizo mis datos'
    this.user = new User('', '', '', '', '', 'ROLE_USER', '')
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user = this.identity
    this.url = GLOBAL.url
  }

  ngOnInit(){
    console.log('user-edit component cargado')
  }

  onSubmit(){
    this._userService.update_user(this.user).subscribe(
      response => {
        if(!response.user){
          this.alertMessage = "El usuario no se ha actualizado" 
        }else{
          localStorage.setItem("identity", JSON.stringify(this.user))
          document.getElementById("identity_name").innerHTML = this.user.name
          if(!this.filesToUpload){
            // Redireccion 
          }else{
            this.makeFileRequest(this.url+'uploadImageUser/'+this.user._id, [], this.filesToUpload).then(
              (result: any) => {
                this.user.image = result.image
                localStorage.setItem("identity", JSON.stringify(this.user))
                let imagePath = this.url+'getImageUser/'+this.user.image
                document.getElementById("imageUserLogged").setAttribute('src', imagePath)
              }
            )
          }
          this.alertMessage = "Datos actualizados correctamente"
        }
      }, 
      error => {
        let errorMessage = <any>error
        if(errorMessage != null){
          var body = JSON.parse(error._body)
          this.alertMessage = body.message 
          console.log(error)
        }
      }
    )
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>){

    var token = this.token

    return new Promise(function(resolve, reject){
      var formData:any = new FormData()
      var xhr = new XMLHttpRequest()

      for(var i = 0; i < files.length; i++){
        formData.append('image', files[i], files[i].name)
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))
          }else{
            reject(xhr.response)
          }
        }
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Authorization', token)
      xhr.send(formData)
    })
  }

}