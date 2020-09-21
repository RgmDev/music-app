import { Injectable } from '@angular/core'
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global'
import { Artist } from '../models/artist'
import { Router, ActivatedRoute, Params } from '@angular/router'


@Injectable()
export class ArtistService{

  public url: string

  constructor(
    private _http: Http
  ){
    this.url = GLOBAL.url
  }

  addArtist(token, artist: Artist){
    
    let params = JSON.stringify(artist)
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    })

    return this._http.post(this.url+'artist', params, {headers: headers})
      .map(res => res.json())
  }

}