var fizzbuzz = angular.module('fizzbuzz', []);

fizzbuzz.factory('Counter', function($http) {
  var getCount = function() {
    return $http({
      method: 'GET',
      url: '/api/count'
    });  
  };

  var postCount = function() {
    return $http({
      method: 'POST',
      url: '/api/count',
    })
  };

  return {
    getCount: getCount,
    postCount: postCount
  };
});

fizzbuzz.controller('fizzbuzzCtrl', function($scope, Counter) {
  $scope.display = 'hi';
  $scope.increment = function() {
    Counter.postCount()
    .then(function() {
      return Counter.getCount();
    }).then(function(res) {
      if(res.data % 15 === 0) {
      $scope.display = 'FIZZBUZZ';
    } else if (res.data % 3 === 0) {
      $scope.display = 'FIZZ';
    } else if (res.data % 5 === 0) {
      $scope.display = 'BUZZ';
    } else {
      $scope.display = res.data;
    }
   });
  };
  
});

