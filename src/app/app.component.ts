import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';

export interface CardModel {
  fact: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="mw-100 vh-100 d-flex justify-content-center align-items-center bg-light">
      <div class="card text-center">
        <div class="card-body">
          <p class="p-2 m-0 fs-6 fw-semibold text-secondary">{{ (data$ | async)?.fact }}</p>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe],
  // templateUrl: './app.component.html',
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  httpClient: HttpClient = inject(HttpClient);
  data$: Observable<CardModel> = this.httpClient.get<CardModel>(
    'https://catfact.ninja/fact'
  );
}
