angular.module('store', [])
  .controller('shopper', ['$scope', '$http', function($scope, $http) {
    $scope.products = [];
    $scope.getAll = function() {
      return $http.get('/products')
        .then(function(data) {
          $scope.products = data.data;
        });
    };
    $scope.getAll();
    $scope.cart = [];
    $scope.purchased = [];
    $scope.toggleCart = function(product) {
      console.log('toggleCart');
      console.log($scope.cart);
      let index = $scope.cart.indexOf(product);
      console.log(index);
      if (index > -1) {
        $scope.cart.splice(index,1)
      } else {
        $scope.cart.push(product);
      }
    };
    $scope.order = function() {
      $scope.purchased = [];
      console.log($scope.cart);
      result = null;
      for (let i = 0; i < $scope.cart.length; i++) {
        result = $http.put('/' + $scope.cart[i]._id + '/order');
        result = result.then(function(data) {
              $scope.purchased.push(data.data);
        });
        console.log(result);
      }

    };
  }])
  .controller('admin', ['$scope', '$http', function($scope, $http) {
    $scope.products = [];
    $scope.getAll = function() {
      return $http.get('/products')
        .then(function(data) {
          $scope.products = data.data;
        });
    };
    $scope.getAll();
    $scope.addProduct = function() {
      return $http.post('/product', {
        name: $scope.name,
        price: $scope.price,
        imageUrl: $scope.imageUrl
      }).then(function(data) {
          $scope.products.push(data.data);
          $scope.name = '';
          $scope.price = '';
          $scope.imageUrl = '';
        });
    };
    $scope.delete = function(product) {
      return $http.delete('/' + product._id)
        .then(function(data) {
          console.log('product deleted');
          $scope.products.splice($scope.products.indexOf(product),1);
        });
    }
  }]);
