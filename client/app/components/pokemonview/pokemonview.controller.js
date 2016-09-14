class PokemonviewController {
  constructor(pokeapiClientService, $stateParams, $http) {
    'ngInject';

    console.log($stateParams.id);  //the ':id' from the URL
    this.currPokemon;
    this.prevPokemon;
    this.nextPokemon;
    this.pokeDescription;

    this._http = $http;
    this._pokeapiClientService = pokeapiClientService;
    this._pokeId = $stateParams.id;
  }

  getPokemon(apiService, id, offset) {
    var newId = parseInt(id) + parseInt(offset);
    var url = '//pokeapi.co/api/v2/pokemon/' + newId;

    apiService.getPokemon(url, (err, pokemon) => {
      if(parseInt(offset) == -1) {
        this.prevPokemon = pokemon;
        console.log("this is the previous pokemon: ");
      }
      else if(parseInt(offset) == 0) {
        this.currPokemon = pokemon;
        console.log("this is the current pokemon: ");

        apiService.getDescription(this.currPokemon.id, (err, data) => {
          this.pokeDescription = data.descriptions[1];

          console.log(data);
        });
      }
      else if(parseInt(offset) == 1) {
        this.nextPokemon = pokemon;
        console.log("this is the next pokemon: ");
      }
      console.log(pokemon);
    });
  }

  $onInit() {
    this.getPokemon(this._pokeapiClientService, this._pokeId, 0);

    if(this._pokeId > 1 && this._pokeId < 151) {
      this.getPokemon(this._pokeapiClientService, this._pokeId, -1);
      this.getPokemon(this._pokeapiClientService, this._pokeId, 1);
    }
    else if(this._pokeId == 1) {
      this.getPokemon(this._pokeapiClientService, this._pokeId, 1);
    }
    else if(this._pokeId == 151) {
      this.getPokemon(this._pokeapiClientService, this._pokeId, -1);
    }
  }
}

export default PokemonviewController;
