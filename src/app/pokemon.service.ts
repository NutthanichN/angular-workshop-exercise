import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonImgByName(name: string): Promise<string> {
    return this.http
      .get<{ sprites: { front_default: string } }>(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      )
      .pipe(map((data) => data.sprites.front_default))
      .toPromise();
  }

  getPokemonsImg() {
    return this.http
      .get<{ results: { url: string }[] }>(
        'https://pokeapi.co/api/v2/pokemon?limit=100'
      )
      .pipe(
        map((data) => data.results.map(({ url }) => url)),
        switchMap((urls) =>
          forkJoin(
            urls.map((url) =>
              this.http.get<{ sprites: { front_default: string } }>(url)
            )
          )
        ),
        map((results) => results.map((data) => data.sprites.front_default))
      )
      .toPromise();
  }

  // export const getPokemonsImg = async (name) => {
  //   const { data } = await axios.get(
  //     'https://pokeapi.co/api/v2/pokemon?limit=100'
  //   );
  //   const getImgs = data.results.map((value) => axios.get(value.url));
  //   const fetchResult = await Promise.all(getImgs);
  //   return fetchResult.map(({ data }) => data.sprites.front_default);
  // };
}
