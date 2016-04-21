'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('baristaMaticApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/ingredients')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    $httpBackend.expectGET('/api/drinks')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of ingredients to the scope', function () {
    $httpBackend.flush();
    expect(scope.ingredientList.length).toBe(4);
  });

  it('should attach a list of drinks to the scope', function () {
    $httpBackend.flush();
    expect(scope.drinkList.length).toBe(4);
  });
});
