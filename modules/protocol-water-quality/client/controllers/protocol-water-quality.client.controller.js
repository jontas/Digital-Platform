(function () {
  'use strict';

  angular
    .module('protocol-water-quality')
    .controller('ProtocolWaterQualityController', ProtocolWaterQualityController);

  ProtocolWaterQualityController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'moment', '$timeout',
  'lodash', 'ProtocolWaterQualityService'];

  function ProtocolWaterQualityController($scope, $rootScope, $state, $stateParams, $http, moment, $timeout,
    lodash, ProtocolWaterQualityService) {

    // Set up the values for dropdowns
    $scope.waterTemperatureMethods = [
      { name: 'Digital thermometer', value: 'digitalThermometer' },
      { name: 'Analog thermometer', value: 'analogThermometer' },
      { name: 'Sensor*', value: 'sensor' }
    ];

    $scope.dissolvedOxygenMethods = [
      { name: 'Colormetric ampules', value: 'colormetricvAmpules' },
      { name: 'Sensor', value: 'sensor' },
      { name: 'Winkler', value: 'winkler' }
    ];

    $scope.salinityMethods = [
      { name: 'Hydrometer', value: 'hydrometer' },
      { name: 'Refractometer', value: 'refractometer' },
      { name: 'Sensor', value: 'sensor' }
    ];

    $scope.pHMethods = [
      { name: 'Test strips', value: 'testStrips' },
      { name: 'Sensor (read only)', value: 'sensorRO' },
      { name: 'Sensor', value: 'sensor' }
    ];

    $scope.turbidityMethods = [
      { name: 'Turbidity tube', value: 'turbidityTube' }
    ];

    $scope.ammoniaMethods = [
      { name: 'Test strips', value: 'testStrips' },
      { name: 'Photometer', value: 'photometer' }
    ];

    $scope.nitratesMethods = [
      { name: 'Test strips', value: 'testStrips' },
      { name: 'Photometer', value: 'photometer' }
    ];

    $scope.getWaterTemperatureMethod = function(value) {
      var index = lodash.findIndex($scope.waterTemperatureMethods, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.waterTemperatureMethods[index].name : '';
    };

    $scope.getDissolvedOxygenMethod = function(value) {
      var index = lodash.findIndex($scope.dissolvedOxygenMethods, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.dissolvedOxygenMethods[index].name : '';
    };

    $scope.getSalinityMethod = function(value) {
      var index = lodash.findIndex($scope.salinityMethods, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.salinityMethods[index].name : '';
    };

    $scope.getPHMethod = function(value) {
      var index = lodash.findIndex($scope.pHMethods, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.pHMethods[index].name : '';
    };

    $scope.getTurbidityMethod = function(value) {
      var index = lodash.findIndex($scope.turbidityMethods, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.turbidityMethods[index].name : '';
    };

    $scope.getAmmoniaMethod = function(value) {
      var index = lodash.findIndex($scope.ammoniaMethods, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.ammoniaMethods[index].name : '';
    };

    $scope.getNitratesMethod = function(value) {
      var index = lodash.findIndex($scope.nitratesMethods, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.nitratesMethods[index].name : '';
    };

    $scope.waterTemperatureUnits = [
      { name: 'F', value: 'f' },
      { name: 'C', value: 'c' }
    ];

    $scope.dissolvedOxygenUnits = [
      { name: 'mg/L (ppm)', value: 'mgl' },
      { name: '% saturation', value: 'saturation' }
    ];

    $scope.salinityUnits = [
      { name: 'PPT', value: 'ppt' }
    ];

    $scope.pHUnits = [
      { name: 'pH (logscale)', value: 'pHlogscale' }
    ];

    $scope.turbidityUnits = [
      { name: 'cm', value: 'cm' }
    ];

    $scope.ammoniaUnits = [
      { name: 'ppm', value: 'ppm' }
    ];

    $scope.nitratesUnits = [
      { name: 'ppm', value: 'ppm' }
    ];

    $scope.getDissolvedOxygenUnit = function(value) {
      var index = lodash.findIndex($scope.dissolvedOxygenUnits, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.dissolvedOxygenUnits[index].name : '';
    };

    $scope.getSalinityUnit = function(value) {
      var index = lodash.findIndex($scope.salinityUnits, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.salinityUnits[index].name : '';
    };

    $scope.getPHUnits = function(value) {
      var index = lodash.findIndex($scope.pHUnits, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.pHUnits[index].name : '';
    };

    $scope.getTurbidityUnit = function(value) {
      var index = lodash.findIndex($scope.turbidityUnits, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.turbidityUnits[index].name : '';
    };

    $scope.getAmmoniaUnit = function(value) {
      var index = lodash.findIndex($scope.ammoniaUnits, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.ammoniaUnits[index].name : '';
    };

    $scope.getNitratesUnit = function(value) {
      var index = lodash.findIndex($scope.nitratesUnits, function(c) {
        return c.value === value;
      });
      return (index > -1) ? $scope.nitratesUnits[index].name : '';
    };

    // Get the average of the results
    var average = function(result0, result1, result2) {
      var sum = 0;
      var divBy = 0;
      if (result0) {
        sum += result0;
        divBy += 1;
      }
      if (result1) {
        sum += result1;
        divBy += 1;
      }
      if (result2) {
        sum += result2;
        divBy += 1;
      }

      if (sum && divBy > 0) {
        var avg = (sum / divBy);
        var rounded = avg.toFixed(2);
        return Number(rounded);
      } else {
        return 0;
      }
    };

    // Get water temperature average
    $scope.waterTemperatureAverage = function(sample) {
      sample.waterTemperature.average = average(sample.waterTemperature.results[0], sample.waterTemperature.results[1],
        sample.waterTemperature.results[2]);
    };

    // Get dissoved oxygen average
    $scope.dissolvedOxygenAverage = function(sample) {
      sample.dissolvedOxygen.average = average(sample.dissolvedOxygen.results[0], sample.dissolvedOxygen.results[1],
        sample.dissolvedOxygen.results[2]);
    };

    // Get salinity average
    $scope.salinityAverage = function(sample) {
      sample.salinity.average = average(sample.salinity.results[0], sample.salinity.results[1],
        sample.salinity.results[2]);
    };

    // Get pH average
    $scope.pHAverage = function(sample) {
      sample.pH.average = average(sample.pH.results[0], sample.pH.results[1], sample.pH.results[2]);
    };

    // Get turbidity average
    $scope.turbidityAverage = function(sample) {
      sample.turbidity.average = average(sample.turbidity.results[0], sample.turbidity.results[1],
        sample.turbidity.results[2]);
    };

    // Get ammonia average
    $scope.ammoniaAverage = function(sample) {
      sample.ammonia.average = average(sample.ammonia.results[0], sample.ammonia.results[1],
        sample.ammonia.results[2]);
    };

    // Get nitrates average
    $scope.nitratesAverage = function(sample) {
      sample.nitrates.average = average(sample.nitrates.results[0], sample.nitrates.results[1],
        sample.nitrates.results[2]);
    };

    // Get other average
    $scope.otherAverage = function(other) {
      other.average = average(other.results[0], other.results[1], other.results[2]);
    };

    // Update averages
    var updateAverages = function() {
      for (var i = 0; i < $scope.waterQuality.samples.length; i++) {
        var sample = $scope.waterQuality.samples[i];
        $scope.waterTemperatureAverage(sample);
        $scope.dissolvedOxygenAverage(sample);
        $scope.salinityAverage(sample);
        $scope.pHAverage(sample);
        $scope.turbidityAverage(sample);
        $scope.ammoniaAverage(sample);
        $scope.nitratesAverage(sample);

        for (var j = 0; j < sample.others.length; j++) {
          var other = sample.others[j];
          $scope.otherAverage(other);
        }
      }
    };

    // Add a sample form
    $scope.addSampleForm = function () {
      if ($scope.form && $scope.form.waterQualityForm) {
        $scope.form.waterQualityForm.$setSubmitted(false);
        $scope.form.waterQualityForm.$setPristine(true);
      }
      $scope.waterQuality.samples.push({
        locationOfWaterSample: {
          latitude: $scope.waterQuality.latitude,
          longitude: $scope.waterQuality.longitude
        },
        waterTemperature: {
          results: []
        },
        dissolvedOxygen: {
          results: []
        },
        salinity: {
          results: []
        },
        pH: {
          results: []
        },
        turbidity: {
          results: []
        },
        ammonia: {
          results: []
        },
        nitrates: {
          results: []
        },
        others: [{
          results: []
        }]
      });
    };

    $scope.removeSampleForm = function (index) {
      $scope.waterQuality.samples.splice(index, 1);
    };

    // Set up initial values
    if (!$scope.waterQuality.samples || $scope.waterQuality.samples.length === 0) {
      $scope.waterQuality.samples = [];
      $scope.addSampleForm();
    }
    $scope.waterQuality.collectionTime = moment($scope.waterQuality.collectionTime).startOf('minute').toDate();

    $scope.saveWaterQuality = function(saveSuccessCallback, saveErrorCallback) {
      if (!$scope.form.waterQualityForm.$valid) {
        $scope.$broadcast('show-errors-check-validity', '$scope.form.waterQualityForm.$valid');
      }

      $http.post('/api/protocol-water-quality/' + $scope.waterQuality._id + '/incremental-save',
        $scope.waterQuality)
        .success(function (data, status, headers, config) {
          if (data.errors) {
            $scope.form.waterQualityForm.$setSubmitted(true);
            errorCallback(data.errors);
          } else {
            $scope.waterQualityErrors = null;
            successCallback();
          }
        })
        .error(function (data, status, headers, config) {
          $scope.form.waterQualityForm.$setSubmitted(true);
          errorCallback(data.message);
        });

      function successCallback() {
        var waterQualityId = $scope.waterQuality._id;

        saveSuccessCallback();
      }

      function errorCallback(errorMessage) {
        $scope.waterQualityErrors = errorMessage;
        saveErrorCallback();
      }
    };

    $scope.validateWaterQuality = function(validateSuccessCallback, validateErrorCallback) {
      if ($scope.waterQuality && $scope.waterQuality._id) {
        $http.post('/api/protocol-water-quality/' + $scope.waterQuality._id + '/incremental-save',
          $scope.waterQuality)
          .success(function (data, status, headers, config) {
            if (data.errors) {
              $scope.form.waterQualityForm.$setSubmitted(true);
              errorCallback(data.errors);
            } else {
              successCallback();
            }
          })
          .error(function (data, status, headers, config) {
            $scope.form.waterQualityForm.$setSubmitted(true);
            errorCallback(data.message);
          });
      }

      function successCallback() {
        var waterQualityId = $scope.waterQuality._id;
        validateSuccessCallback();
      }

      function errorCallback(errorMessage) {
        $scope.waterQualityErrors = errorMessage;
        validateErrorCallback();
      }
    };
  }
})();
