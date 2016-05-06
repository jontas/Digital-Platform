(function() {
  'use strict';

  angular
    .module('protocol-oyster-measurements')
    .directive('formSubstrateShell', function(moment) {
      return {
        restrict: 'AE',
        templateUrl: 'modules/protocol-oyster-measurements/client/views/form-substrate-shell.client.view.html',
        scope: {
          substrate: '=',
          maxLiveOysters: '=',
          outerSubstrateUploader: '=',
          innerSubstrateUploader: '=',
          outerSubstrateUrl: '=',
          innerSubstrateUrl: '=',
          saveFunction: '=',
          cancelFunction: '=',
          index: '@'
        },
        replace: true,
        link: function (scope, element, attrs) {
          scope.dateTime = {
            min: moment().subtract(7, 'days').toDate(),
            max: moment().add(1, 'year').toDate()
          };
          if (!scope.substrate.setDate) scope.substrate.setDate = new Date();

          element.bind('show.bs.modal', function () {
            scope.form.substrateForm.$setPristine();
          });

          scope.submitForm = function(substrate, isValid) {
            console.log('submitForm');
            if (scope.outerSubstrateUrl === undefined || scope.outerSubstrateUrl === null || scope.outerSubstrateUrl === '') {
              scope.form.substrateForm.$setValidity('outerImg', false);
              isValid = false;
            }
            if (scope.innerSubstrateUrl === undefined || scope.innerSubstrateUrl === null || scope.innerSubstrateUrl === '') {
              scope.form.substrateForm.$setValidity('innerImg', false);
              isValid = false;
            }
            if (!isValid) {
              scope.$broadcast('show-errors-check-validity', 'form.substrateForm');
              return false;
            }
            scope.saveFunction(substrate, scope.index, isValid);
          };
        }
      };
    });
})();
