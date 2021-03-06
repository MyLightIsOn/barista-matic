'use strict';

describe('Service: drinks', function () {

  // load the service's module
  beforeEach(module('baristaMaticApp'));

  // instantiate service
  var drinks;
  beforeEach(inject(function (_drinks_) {
    drinks = _drinks_;
  }));

  it('should do something', function () {
    expect(!!drinks).toBe(true);
  });

  it('should return drinks object', function () {
    expect(!!drinks.drinkList).toBe(true);
  });

  it('should have drink select function', function () {
    expect(!!drinks.drinkSelect).toBe(true);
  });
});
