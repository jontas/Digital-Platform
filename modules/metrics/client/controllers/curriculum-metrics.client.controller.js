(function () {
  'use strict';

  angular
    .module('metrics')
    .controller('CurriculumMetricsController', CurriculumMetricsController);

  CurriculumMetricsController.$inject = ['$scope', '$rootScope', '$timeout', 'MetricsCurriculumService'];

  function CurriculumMetricsController($scope, $rootScope, $timeout, MetricsCurriculumService) {
    $scope.getCurriculumMetrics = function() {
      MetricsCurriculumService.query({},
      function (data) {
        $scope.metrics = data;
        var lessonsPerUnitPieLabels = [];
        var lessonsPerUnitPieData = [];
        if($scope.metrics.unitLessonCounts !== null && $scope.metrics.unitLessonCounts !== undefined) {
          for(var i = 0; i < $scope.metrics.unitLessonCounts.length; i++) {
            lessonsPerUnitPieLabels.push($scope.metrics.unitLessonCounts[i].unit.title);
            lessonsPerUnitPieData.push($scope.metrics.unitLessonCounts[i].lessonCount);
          }
        }
        $scope.metrics.lessonsPerUnitPieLabels = lessonsPerUnitPieLabels;
        $scope.metrics.lessonsPerUnitPieData = lessonsPerUnitPieData;
        var lessonPeriodPieLabels = [];
        var lessonPeriodPieData = [];
        if($scope.metrics.lessonPeriodCounts !== null && $scope.metrics.lessonPeriodCounts !== undefined) {
          for(var j = 0; j < $scope.metrics.lessonPeriodCounts.length; j++) {
            lessonPeriodPieLabels.push($scope.metrics.lessonPeriodCounts[j].periods + ' Periods');
            lessonPeriodPieData.push($scope.metrics.lessonPeriodCounts[j].lessonCount);
          }
        }
        $scope.metrics.lessonPeriodPieLabels = lessonPeriodPieLabels;
        $scope.metrics.lessonPeriodPieData = lessonPeriodPieData;
        var lessonSettingPieLabels = [];
        var lessonSettingPieData = [];
        if($scope.metrics.lessonSettingCounts !== null && $scope.metrics.lessonSettingCounts !== undefined) {
          for(var k = 0; k < $scope.metrics.lessonSettingCounts.length; k++) {
            lessonSettingPieLabels.push($scope.metrics.lessonSettingCounts[k].setting);
            lessonSettingPieData.push($scope.metrics.lessonSettingCounts[k].lessonCount);
          }
        }
        $scope.metrics.lessonSettingPieLabels = lessonSettingPieLabels;
        $scope.metrics.lessonSettingPieData = lessonSettingPieData;

        $scope.error = null;
        $timeout(function() {
          $rootScope.$broadcast('iso-method', { name:null, params:null });
        });
      }, function(error) {
        $scope.error = error.data.message;
      });
    };

    // $scope.getMostActiveUsers = function() {
    //   MetricsUserActivityService.query({
    //     //TODO: add startDate and endDate wire up select box
    //   }, function(data) {
    //
    //   });
    // };

    $scope.getCurriculumMetrics();
  }
})();
