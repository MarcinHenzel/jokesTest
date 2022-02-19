export type JokeResponse = SuccessJokeResponse ; 

export interface SuccessJokeResponse {
  error: 'false';
  amount: number;
  jokes: Joke[];
}
export interface ErrorJokeResponse {
  error: 'true';
  internalError: boolean;
  code: number;
  message: string;
  causedBy: string[];
  additionalInfo: string;
  timestamp: number;
}

export type Joke = SingleJoke | TwoPart;
export interface BaseJoke {
  category: Category;
  flags: Flags;
  id: number;
  lang: Lang;
  safe: boolean;
  imgSrc?: string;
}
export interface SingleJoke extends BaseJoke {
  type: 'single';
  joke: string;
}
export interface TwoPart extends BaseJoke {
  type: 'twopart';
  setup: string;
  delivery: string;
}
export type Type = 'single' | 'twopart';
export type Category =
  | 'Programming'
  | 'Misc'
  | 'Dark'
  | 'Pun'
  | 'Spooky'
  | 'Christmas'
export type Lang = 'de' | 'en' | 'es' | 'cs' | 'fr' | 'pt';
export interface Flags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
}
