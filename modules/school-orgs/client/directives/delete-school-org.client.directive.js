(function() {
  'use strict';

  angular
    .module('school-orgs')
    .directive('deleteSchoolOrgModal', function() {
      return {
        restrict: 'AE',
        templateUrl: 'modules/school-orgs/client/views/delete-school-org.client.view.html',
        scope: {
          organization: '=',
          closeFunction: '='
        },
        replace: true,
        controller: 'SchoolOrganizationDeleteController',
        link: function(scope, element, attrs) {
          scope.$watch('organization', function(newValue, oldValue) {
            scope.organization = newValue;
          });
        }
      };
    });
})();
