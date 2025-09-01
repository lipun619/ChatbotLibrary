import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AiChatbotService } from './ai-chatbot.service';
import { ChatMessage } from './interfaces/chat-message.interface';

@Component({
  selector: 'lib-ai-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-card class="chat-container">
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      
      <mat-card-content class="chat-messages">
        <div *ngFor="let message of messages" 
             [ngClass]="{'user-message': message.role === 'user', 
                        'bot-message': message.role === 'assistant'}"
             class="message">
          <p>{{ message.content }}</p>
          <small>{{ message.timestamp | date:'short' }}</small>
        </div>
      </mat-card-content>

      <mat-card-actions class="chat-input">
        <mat-form-field appearance="outline" class="input-field">
          <input matInput 
                 [(ngModel)]="currentMessage" 
                 placeholder="Type your message..."
                 (keyup.enter)="sendMessage()">
        </mat-form-field>
        <button mat-icon-button color="primary" (click)="sendMessage()">
          <mat-icon>send</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .chat-container {
      max-width: 600px;
      margin: 20px auto;
      height: 600px;
      display: flex;
      flex-direction: column;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .message {
      margin: 8px 0;
      padding: 8px 12px;
      border-radius: 8px;
      max-width: 80%;
    }

    .user-message {
      background-color: #e3f2fd;
      margin-left: auto;
    }

    .bot-message {
      background-color: #f5f5f5;
      margin-right: auto;
    }

    .chat-input {
      display: flex;
      padding: 16px;
      gap: 8px;
      align-items: center;
    }

    .input-field {
      flex: 1;
    }

    small {
      display: block;
      font-size: 0.8em;
      color: #666;
    }
  `]
})
export class AiChatbotComponent {
  @Input() model: string = 'gpt-4.1-nano';
  @Input() title: string = 'AI Chatbot';

  messages: ChatMessage[] = [];
  currentMessage: string = '';

  constructor(private chatService: AiChatbotService) {}

  sendMessage() {
    if (!this.currentMessage.trim()) return;

    // Add user message
    this.addMessage('user', this.currentMessage);
    const messageToSend = this.currentMessage;
    this.currentMessage = '';

    // Call backend proxy API
    this.chatService.sendMessage(messageToSend, this.model)
      .subscribe({
        next: (response) => {
          const botResponse = response.choices[0].message.content || 'Sorry, I could not process that.';
          this.addMessage('assistant', botResponse);
        },
        error: (error) => {
          console.error('Error:', error);
          this.addMessage('assistant', 'Sorry, there was an error processing your message.');
        }
      });
  }

  private addMessage(role: 'user' | 'assistant', content: string) {
    this.messages.push({
      role,
      content,
      timestamp: new Date()
    });
  }
}
