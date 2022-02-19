
import { Category, Lang } from "./Joke";

export interface InfoResponse {
  error: boolean;
  version: string;
  jokes: Jokes;
  formats: string[];
  jokeLanguages: number;
  systemLanguages: number;
  info: string;
  timestamp: number;
}

export interface Jokes {
  totalCount: number;
  categories: Category[];
  flags: string[];
  types: string[];
  submissionURL: string;
  idRange: IDRange;
  safeJokes: SafeJoke[];
}
export type IDRange = Record<Lang, number[]>; 

export interface SafeJoke {
  lang: string;
  count: number;
}