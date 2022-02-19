import { Component, ViewChild, AfterViewInit, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { merge,  Observable,  of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Joke } from 'src/app/models/Joke';
import { JokesService } from '../jokes.service';

@Component({
  selector: 'app-table-joke',
  templateUrl: './table-joke.component.html',
  styleUrls: ['./table-joke.component.css'],
})
export class TableJokeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['image', 'id', 'jokeContent', 'category'];
  data: Joke[] = [];
  imageToShow: any;
  pageSize!: number ;
  isInit: boolean = false;
  @Input() set changePageSize(pageSize: any) {
    this.pageSize = pageSize;
 /*    if(this.isInit) {this.getJokes()}; */
  };
  resultsLength = 0;
  isLoadingResults = true;
  jokes$!: Observable<Joke[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private jokesService: JokesService) {
    
  }
  ngOnInit(): void {
    this.jokes$ = this.jokesService.jokes$;
  }
 
  ngAfterViewInit() {
    this.isInit = true;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.changePageSize = parseInt(window.localStorage.getItem('pageSize') || '5');
    /* this.getJokes(); */
    /* this.jokesService.initJokes().subscribe((first) => {console.log( first); }) */
  }
/*   getJokes(){
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.jokesService
          .getJokes(this.pageSize)
          .pipe(catchError(() => observableOf(null)));
      }),
      map((jokes) => {
        this.isLoadingResults = false;

        if (jokes === null) {
          return [];
        }

         this.resultsLength = amount; 
        return jokes.map((joke) => {
          const randomizer = Math.ceil((Math.random() * 1000));
          return {...joke, imgSrc:`https://picsum.photos/id/${randomizer}/200/300`}
        });
       
      })
    )
    .subscribe((jokes) => {
      this.data = jokes
    });
  } */
  
}
