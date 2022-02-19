import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Joke, JokeWithImage } from 'src/app/models/Joke';
import { JokeLocalStorageService } from '../joke-local-storage.service';
import { JokesService } from '../jokes.service';

@Component({
  selector: 'app-table-joke',
  templateUrl: './table-joke.component.html',
  styleUrls: ['./table-joke.component.css'],
})
export class TableJokeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['image', 'id', 'jokeContent', 'category'];
  imageToShow: any;
  pageSize$!: Observable<number>;
  dataSource: MatTableDataSource<JokeWithImage> = new MatTableDataSource();
  isLoadingResults = true;
  jokes$!: Observable<Joke[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private jokesService: JokesService,
    private jokeLocal: JokeLocalStorageService
  ) {
    this.pageSize$ = this.jokeLocal.jokePageSize$;
  }
  ngOnInit(): void {
    this.jokesService.jokes$.subscribe((jokes) => {
      this.dataSource.data = jokes.map((joke) => ({...joke, imgSrc: this.getImgSrc(joke)}));
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe((pageEvent) =>
      this.jokeLocal.changeJokePageSize(pageEvent.pageSize)
    );
  }
  getImgSrc(joke: Joke): string {
    const randomImgId = Math.floor(Math.random() * 1000);
    const grayscale = joke.category === 'Dark' ? '?grayscale' : '';
    const blurred = joke.flags.racist ? 'blur=3' : '';
    const blurPrefix = grayscale && blurred ? '&' : blurred ? '?' : '';
    const filters = `${grayscale}${blurPrefix}${blurred}`;
    return `https://picsum.photos/id/${randomImgId}/200/300${filters}`;
  }

  handleImgError(event: any, joke: JokeWithImage) {
    event.target.src = this.getImgSrc(joke);
  }
}
