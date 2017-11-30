angular.module('election', [])
  .controller('voter', ['$scope', '$http', function($scope, $http) {
    $scope.candidates = [];
    $scope.getAll = function() {
      return $http.get('/candidates')
        .then(function(data) {
          $scope.candidates = data.data;
        });
    };
    $scope.getAll();
    $scope.ballot = [];
    $scope.toggleBallot = function(candidate) {
      console.log('toggleBallot');
      console.log($scope.ballot);
      let index = $scope.ballot.indexOf(candidate);
      console.log(index);
      if (index > -1) {
        $scope.ballot.splice(index,1)
      } else {
        $scope.ballot.push(candidate);
      }
    };
    $scope.vote = function() {
      console.log($scope.ballot);
      for (let i = 0; i < $scope.ballot.length; i++) {
        $http.put('/' + $scope.ballot[i]._id + '/upvote')
          .then(function(data) {
            console.log(data.data)
            console.log('upvoted!')
          })
      }
    };
  }])
  .controller('admin', ['$scope', '$http', function($scope, $http) {
    $scope.candidates = [];
    $scope.getAll = function() {
      return $http.get('/candidates')
        .then(function(data) {
          $scope.candidates = data.data;
        });
    };
    $scope.getAll();
    $scope.addCandidate = function() {
      return $http.post('/candidate', {name:$scope.name})
        .then(function(data) {
          $scope.candidates.push(data.data);
        });
    };
    $scope.delete = function(candidate) {
      return $http.delete('/' + candidate._id)
        .then(function(data) {
          console.log('candidate deleted');
          $scope.candidates.splice($scope.candidates.indexOf(candidate),1);
        });
    }
  }]);
