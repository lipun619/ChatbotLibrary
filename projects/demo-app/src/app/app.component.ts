import { Component } from '@angular/core';
import { AiChatbotComponent } from 'ai-chatbot';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AiChatbotComponent,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>AI Chatbot Demo</span>
    </mat-toolbar>
    
    <div class="container">
      <div class="content">
        <div class="intro">
          <h1>Welcome to the AI Chatbot Demo</h1>
          <p>This is a demonstration of the AI Chatbot library using the .NET Core backend proxy. Try asking questions below!</p>
        </div>
        
        <lib-ai-chatbot
          [model]="'gpt-4.1-nano'"
          [title]="'AI Assistant'">
        </lib-ai-chatbot>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: calc(100vh - 64px);
    }

    .content {
      max-width: 800px;
      margin: 0 auto;
    }

    .intro {
      text-align: center;
      margin-bottom: 40px;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h1 {
      color: #333;
      margin-bottom: 16px;
    }

    p {
      color: #666;
      font-size: 18px;
      line-height: 1.5;
    }
  `]
})
export class AppComponent {}
