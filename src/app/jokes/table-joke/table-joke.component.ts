import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable  } from 'rxjs';
import { Joke } from 'src/app/models/Joke';
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
  dataSource: MatTableDataSource<Joke> = new MatTableDataSource();
  isLoadingResults = true;
  jokes$!: Observable<Joke[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private jokesService: JokesService, private jokeLocal: JokeLocalStorageService) {
    this.pageSize$ = this.jokeLocal.jokePageSize$;
  }
  ngOnInit(): void {
    this.jokesService.jokes$.subscribe((jokes) => {
      this.dataSource.data = jokes;
    });
  }

  ngAfterViewInit() {
    console.log(this.sort);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe((pageEvent) => this.jokeLocal.changeJokePageSize(pageEvent.pageSize))
  }
  // jokes.filter((el) => !categoryFilter.includes(el.category))
  //.sort((a,b)=> this.isAsc ? a-b : b-a)
  //.slice(page * pageSize, page * pageSize + pageSize)
/*   initSortAndPagination() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        })
      )
      .subscribe((data) => (this.data = data));
  } */
}
