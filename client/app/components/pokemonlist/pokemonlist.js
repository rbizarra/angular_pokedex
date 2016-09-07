import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pokemonlistComponent from './pokemonlist.component';

let pokemonlistModule = angular.module('pokemonlist', [
  uiRouter
])

.component('pokemonlist', pokemonlistComponent)

.config(($stateProvider, $urlRouterProvider) => {
      "ngInject";

      $stateProvider
        .state('pokemonlist', {
          url: '/pokemonlist',
          component: 'pokemonlist'
        });
    })

.name;

export default pokemonlistModule;
