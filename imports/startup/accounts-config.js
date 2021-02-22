import { $IsStateFilter } from 'angular-ui-router/lib/stateFilters';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
});
