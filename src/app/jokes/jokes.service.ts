import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { InfoResponse } from '../models/Info';
import { Category, Joke, JokeResponse } from '../models/Joke';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  private readonly MAX_POSSIBLE_AMOUNT = 10;
  private readonly JOKE_API = 'https://v2.jokeapi.dev';
  private readonly JOKE_SUBMIT_HREF = this.JOKE_API + '/submit';
  private readonly JOKE_HREF = this.JOKE_API + '/joke/any';
  private readonly INFO_HREF = this.JOKE_API + '/info';
  selectedCategories: Category[] = [
    'Christmas',
    'Dark',
    'Misc',
    'Programming',
    'Pun',
    'Spooky',
  ];
  private readonly _jokes = new BehaviorSubject<Joke[]>([]);
  readonly jokes$ = this._jokes
    .asObservable()
    .pipe(
      map((jokes) =>
        jokes.filter((joke) => this.selectedCategories.includes(joke.category))
      )
    );
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {
    this.init();
  }
  init() {
    this.startFetchingJokes();
  }
  updateSelectedCategories(categories: Exclude<Category, 'Any'>[]) {
    this.selectedCategories = categories;
    this._jokes.next(this._jokes.getValue());
  }
  private startFetchingJokes() {
    this.getInfo()
      .pipe(
        mergeMap((resp) => {
          if (resp.error) {
            this._snackBar.open(
              'Api not available, please try later',
              'Error',
              { duration: 3000 }
            );
            return throwError(() => 'No joke info');
          } else {
            return of(resp);
          }
        }),
        concatMap((resp) => {
          const maxEnId = resp.jokes.idRange.en[1];
          return this.initJokes(maxEnId);
        })
      )
      .subscribe(
        (resp) => {
          this._jokes.next([...this._jokes.getValue(), ...resp]);
        },
        (err) => {
          console.error(err);
          if (err.status === 429) {
            this._snackBar.open('Exceeded max amount of joke calls', 'Error', {
              duration: 3000,
            });
          }
        }
      );
  }

  private initJokes(maxEnId: number) {
    const toCall: { from: number; to: number }[] = [];
    for (
      let index = 0;
      index < maxEnId;
      index = index + this.MAX_POSSIBLE_AMOUNT
    ) {
      const from = index;
      let to = from + this.MAX_POSSIBLE_AMOUNT - 1;
      to = to > maxEnId ? maxEnId : to;
      toCall.push({ from, to });
    }

    return from(toCall).pipe(
      mergeMap(({ from, to }) => {
        return this.getJokes(from, to);
      })
    );
  }
  getJokes(from: number, to: number): Observable<Joke[]> {
    const params = new HttpParams()
      .set('amount', this.MAX_POSSIBLE_AMOUNT)
      .set('idRange', `${from}-${to}`);

    return this.httpClient.get<JokeResponse>(this.JOKE_HREF, { params }).pipe(
      map(
        (jokes) => {
          return jokes.jokes;
        },
        catchError((err) => of([] as Joke[]))
      )
    );
  }
  getInfo() {
    return this.httpClient
      .get<InfoResponse>(this.INFO_HREF)
      .pipe(catchError((err) => of({ error: true as const })));
  }
  newJoke(newJoke: Joke) {
    console.log(newJoke);
    return this.httpClient
      .post(this.JOKE_SUBMIT_HREF, {...newJoke, formatVersion: 3})
      .pipe(catchError((err) => of(err)));
  }
}
