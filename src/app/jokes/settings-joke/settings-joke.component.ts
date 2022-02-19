import { Component,  OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from 'src/app/models/Joke';
import { JokesService } from '../jokes.service';

@Component({
  selector: 'app-settings-joke',
  templateUrl: './settings-joke.component.html',
  styleUrls: ['./settings-joke.component.css'],
})
export class SettingsJokeComponent implements OnInit {
  categories = new FormControl();

  filterCategories!: Category[];
  constructor(private jokesService: JokesService) {
    this.filterCategories = this.jokesService.selectedCategories;
    this.categories.setValue(this.jokesService.selectedCategories);
  }

  ngOnInit(): void {
    this.categories.valueChanges.subscribe(data => {
      this.jokesService.updateSelectedCategories(data)
    })
  }

  
}
