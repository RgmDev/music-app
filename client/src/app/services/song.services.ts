import { Injectable } from '@angular/core'
import {Http, Response, Headers, RequestOptions} from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global'
import { Album } from '../models/album'
import { Song } from '../models/song'
import { Router, ActivatedRoute, Params } from '@angular/router'


@Injectable()
export class SongService{

  public url: string

  constructor(
    private _http: Http
  ){
    this.url = GLOBAL.url
  }

  getSong(token, id: string){
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    })
    let options = new RequestOptions({headers: headers})
    return this._http.get(this.url+'song/'+id, options)
      .map(res => res.json())
  }

  getSongs(token, album_id = null){
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    })
    let options = new RequestOptions({headers : headers})
    if(album_id == null){
      return this._http.get(this.url+'songs', options)
      .map(res => res.json())
    }else{
      return this._http.get(this.url+'songs/'+album_id, options)
      .map(res => res.json())
    }
  }

  addSong(token, song: Song){
    let params = JSON.stringify(song)
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    })
    return this._http.post(this.url+'song', params, {headers: headers})
      .map(res => res.json())
  }

  editSong(token, id: string, song: Song){
    let params = JSON.stringify(song)
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    })
    return this._http.put(this.url+'song/'+id, params, {headers: headers})
      .map(res => res.json())
  }

  deleteSong(token, id: string){
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': token
    })
    let options = new RequestOptions({headers: headers})
    return this._http.delete(this.url+'song/'+id, options)
      .map(res => res.json())
  }




}