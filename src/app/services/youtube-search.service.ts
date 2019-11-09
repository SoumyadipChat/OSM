import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http' 
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

export const YOUTUBE_API_KEY = 'AIzaSyCtGPrWbCYLIz5UILx3dOcrUDEmjHZVQdA'
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'

export class Result {
    id: string
    title: string
    desc: string
    thumbnailUrl: string
    videoUrl: string
  
    constructor(obj?: any) {
      this.id           = obj && obj.id           || null
      this.title        = obj && obj.title        || null
      this.desc         = obj && obj.desc         || null
      this.thumbnailUrl = obj && obj.thumbnailUrl || null
      this.videoUrl     = obj && obj.videoUrl     || `https://www.youtube.com/watch?v=${this.id}`
    }
  
  }

@Injectable()
export class YouTubeSearchService {

  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string) { }

  search(query: string): Observable<Result[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&')
    const queryUrl = `${this.apiUrl}?${params}`
    console.log(queryUrl)
    return this.http.get(queryUrl).
    pipe(map(response => {
      return <any>response['items'].map(item => {
        return new Result({
          id: item.id.videoId,
          title: item.snippet.title,
          desc: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        })
      })
    }))
  }
}