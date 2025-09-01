import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiChatbotService {
  private apiUrl = 'http://localhost:5001/api/chat'; // proxy backend URL

  constructor(private http: HttpClient) { }

  sendMessage(message: string, model: string = 'gpt-4.1-nano'): Observable<any> {
    const body = {
      messages: [
        {
          "role": "user",
          "content": message
        }
      ],
      model: model
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}
