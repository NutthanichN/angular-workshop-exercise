import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pokemonImg = '';
  pokemonImgs = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService
      .getPokemonImgByName('ditto')
      .then((data) => (this.pokemonImg = data));

    // [Hint]: Get Pokemon Images
    this.pokemonService.getPokemonsImg().then((data) => {
      this.pokemonImgs = data;
      console.log(this.pokemonImgs);
    });
  }
}
