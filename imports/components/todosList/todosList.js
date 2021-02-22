import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todosList.html';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks.js';
import uiRouter from 'angular-ui-router';
 
class TodosListCtrl {
  constructor($scope,$state) {
    $scope.viewModel(this);
    if (!Meteor.userId()) {
      $state.go('signup')
    }
        Accounts.onLogout(function(err) {
      $state.go('signup')
    });
    this.hideCompleted = false;
    this.helpers({
      tasks() {
        const selector = {};
 
        // If hide completed is checked, filter tasks
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }
        return Tasks.find(selector, {
          sort: {
            createdAt: -1
          }
        });
      },
      incompleteCount() {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count();
      },
      currentUser() {
        return Meteor.user();
      }
    })
  }
  addTask(newTask) {
    // Insert a task into the collection
    Meteor.call('tasks.insert', newTask);
    // Clear form
    this.newTask = '';
  }
  setChecked(task) {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', task._id, !task.checked);
  }
 
  removeTask(task) {
    Meteor.call('tasks.remove', task._id);
  }
}

export default angular.module('todosList', [
  angularMeteor,
  uiRouter,
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: TodosListCtrl
  })
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('todos', {
      url: '/todos',
      template: '<todos-list></todos-list>'
    });
}