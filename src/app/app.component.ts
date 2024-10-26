import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';

export interface CardModel {
  readonly title: string,
  category: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary nav-pills">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Shop</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    @for (category of categories$ | async; track category; let index = $index) { 
                        <li class="nav-item  mx-1">
                            <a class="btn" [ngClass]="{'btn-primary' : index === 0, 'btn-secondary' : index === 1, 'btn-success' : index === 2, 'btn-danger' : index === 3 }" href="#">{{ category }}</a>
                        </li>
                    }
                </ul>
            </div>
        </div>
    </nav>
    <main class="container">
      <div class="row row-cols-3 g-4 p-3 d-flex justify-content-evenly">
      @for (product of products$ | async; track product) { 
        <div class="col">
      <div class="card p-2 mx-4 mh-100"> 
      <img [src]="product.image" class="card-img-top fit-image" alt="image of product">
      <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
      </div>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ product.category }}</li>
          <li class="list-group-item">{{ product.price }}</li>
        </ul>
        <div class="d-flex justify-content-end">
          <a href="#" class="btn btn-success mw-100 mt-3 mb-2 me-3"><i class="fa fa-cart-plus me-2"></i>Buy now!</a>
        </div>
    </div>
    </div>
    }
    </div>
    </main>
  `,
  standalone: true,
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, CommonModule],
})
export class AppComponent {
  httpClient: HttpClient = inject(HttpClient);
  categories$: Observable<string[]> = this.httpClient.get<string[]>(
    'https://fakestoreapi.com/products/categories'
  );
  products$: Observable<CardModel[]> = this.httpClient.get<CardModel[]>(
    'https://fakestoreapi.com/products'
  );
}
