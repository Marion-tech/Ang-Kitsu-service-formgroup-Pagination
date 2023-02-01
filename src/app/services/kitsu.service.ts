import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAnime, IKitsuData } from '../models/kitsu.model';

@Injectable({
  providedIn: 'root',
})
export class KitsuService {
  constructor(private httpClient: HttpClient) {}

public getAnime(limit:number, offset:number):Observable<IAnime[]>{
return this.httpClient.
get<IKitsuData>('https://kitsu.io/api/edge/anime?page[limit]='+limit+'&page[offset]='+offset).
pipe(map((data:IKitsuData)=> {
    return data.data
  })
)
}

}// kitsuservice 
