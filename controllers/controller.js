var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http', ($scope, $http) => {

  var refresh= () => {
    $http.get('/contactlist').then((res) => {
      console.log("I got data I requested");
      $scope.contactlist = res.data;
    }).catch((err) => console.log(err))
  }
  refresh();

  $scope.addContact = () => {
    console.log($scope.person);
    $http.post('/addcontact', $scope.person)
      .then((res) => {
        refresh();
        $scope.person = null;
      })
  }

  $scope.removeContact = (id) => {
    console.log(id);
    $http.delete('/removecontact/' + id)
      .then((res) => {
        console.log("A person has been removed")
        refresh();
      })
  }

  $scope.editContact = (id) => {
    console.log(id);
    $http.get('/editcontact/' + id)
      .then((res) => {
        $scope.person = res.data;
      })
  }

  $scope.updateContact = () => {
    console.log($scope.person._id);
    $http.put('/updatecontact/' + $scope.person._id, $scope.person)
      .then((res) => {
        refresh();
        $scope.person = null;
      })
  }

}])