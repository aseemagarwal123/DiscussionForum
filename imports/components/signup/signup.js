import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import template from './signup.html';
import uiRouter from 'angular-ui-router';
import { Accounts } from 'meteor/accounts-base';
 
class SignUpCtrl {
  constructor($scope,$state) {
    $scope.viewModel(this);
    if (Meteor.userId()) {
      $state.go('todos')
    }
    Accounts.onLogin(function(err) {
      $state.go('todos')
    });
  }
}

export default angular.module('signup', [
  angularMeteor,
  uiRouter,
])
  .component('signup', {
    templateUrl: 'imports/components/signup/signup.html',
    controller: SignUpCtrl
  })
  .config(config);
 
function config($locationProvider, $urlRouterProvider,$stateProvider) {
  'ngInject';
  $stateProvider
  .state('signup', {
    url: '/signup',
    template: '<signup></signup>'
  });
  $locationProvider.html5Mode(true);
 
  $urlRouterProvider.otherwise('/signup');
}