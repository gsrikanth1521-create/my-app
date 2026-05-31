import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Item {
  _id: string;
  name: string;
  city: string;
  pin: string;
}

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})

export class Products implements OnInit {
  items = signal<Item[]>([]);
  public name = ''
  public city = ''
  public pin = signal("");

  newItem = { name: '', city: '' };

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.http.get<Item[]>('/api/items').subscribe((data: Item[]) => {
      this.items.set(data);
    });
  }

  addItem() {
    console.log(this.pin());
    this.http.post<Item>('/api/items', { name: this.name, city: this.city, pin: this.pin() }).subscribe((data: Item) => {
      this.items.update(items => [...items, data]);
      this.name = '';
      this.city = '';
      this.pin.set('');
    });
  }

  deleteItem(id: string) {
    this.http.delete<{ items: Item[] }>(`/api/items/${id}`).subscribe((data) => {
      this.items.set(data.items);
      // this.items = this.items.filter(item => item._id !== id);
    });   
  }
}
