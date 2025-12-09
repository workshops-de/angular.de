angular.module( 'circuitBreakerDemo', ['angular-bacon'] )

.provider('cbConfig', function() {
  var cbConfig = {
    waitUntilRetry: 5000,
    failureLimit: 3,
    timeout: 1000
  }
  
  this.$get = function $get() {
      return cbConfig;
  };
})

.factory('circuitBreaker', function(cbConfig, $log) {
  var sendQueue = new Bacon.Bus();
  var failures = new Bacon.Bus();
  var successes = new Bacon.Bus();
  var recloses = new Bacon.Bus();
  var trips = new Bacon.Bus();
  var rejections = new Bacon.Bus();
  var retries = new Bacon.Bus();
  
  var failureCount = failures.map(1)
  .merge(successes.map(-1))
  .merge(recloses.map(-cbConfig.failureLimit))
  .scan(0, function(agg, val) {
    failureCountGreaterZero = Math.max(0, agg + val);
    return Math.min(failureCountGreaterZero, cbConfig.failureLimit);
  });
  
  var failuresReachedLimit = failureCount
  .map(function(fc) {
    return fc >= cbConfig.failureLimit;
  });
  
  failureCount.filter(function(fc) {
    return fc >= cbConfig.failureLimit;
  })
  .onValue(function() {
    trips.push(1);
  })
  
  var tripped = trips
  .map(true)
  .merge(recloses.map(false))
  .toProperty(false);
  
  var retryPing = failures
  .filter(tripped)
  .throttle(cbConfig.waitUntilRetry);
  
  var retryAllowed = retryPing
  .map(true)
  .merge(retries.map(false))
  .skipDuplicates()
  .toProperty(false);
  
  var retryNotAllowed = retryAllowed.not();
  
  var send = function(req) {
    req.config.timeout = cbConfig.timeout;
    req.deferred.resolve(req.config); 
  }
  
  var closedSend = sendQueue
  .filter(tripped.not());
  
  closedSend.onValue(function(req) {
    $log.debug("CLOSED: Sending request", req.config);
    send(req);
  });
  
  var openSend = sendQueue
  .filter(tripped)
  .filter(retryNotAllowed);
  
  openSend.onValue(function(req) {
    $log.warn("OPEN: Rejected because wait time has not yet elapsed", req.config);
    rejections.push(1);
    req.deferred.reject(req.config);
  });
  
  var halfOpenSend = sendQueue
  .filter(tripped)
  .filter(retryAllowed);
  
  halfOpenSend.onValue(function(req) {
    $log.info("HALF_OPEN: Trying one request", req.config);
    retries.push(1);
    send(req);
  });
  
  var halfOpenReceive = retries.map(2)
  .merge(successes.map(1))
  .merge(failures.map(3))
  .slidingWindow(2,2);
  
  $log.info(halfOpenReceive.desc());
  
  var halfOpenToClosedReceive = halfOpenReceive
  .filter(function(v){
    return v[0] == 2 && v[1] == 1;
  });
  
  var halfOpenToOpenReceive = halfOpenReceive
  .filter(function(v){
    return v[0] == 2 && v[1] == 3;
  });
  
  halfOpenToClosedReceive.onValue(function() {
    $log.info("CLOSED due to successful retry.");
    recloses.push(1);
  });

  return {
    // Use
    sendQueue: sendQueue,
    successes: successes,
    failures: failures,
    
    // Monitor
    failureCount: failureCount,
    failuresReachedLimit: failuresReachedLimit,
    state: halfOpenToClosedReceive.changes()
    .map('CLOSED')
    .merge(
      openSend
      .merge(halfOpenToOpenReceive.changes())
      .merge(tripped.changes())
      .map('OPEN')
    )
    .merge(
      retryPing
      .filter(retryAllowed)
      .map('HALF_OPEN')
    )
    .toProperty('CLOSED')
  }
})

.factory('circuitBreakerInterceptor', function(circuitBreaker, $q, $log) {

  return {
    request: function (config) {
      var deferred = $q.defer();
      circuitBreaker.sendQueue.push({deferred: deferred, config: config});
      return deferred.promise;
    },
    
    response: function (response) {
      $log.info("CB", "Response", response);
      circuitBreaker.successes.push(1);
      return response;
    },
    
    responseError: function (rejection) {
      $log.error("CB", "ResponseError", rejection);
      circuitBreaker.failures.push(1);
      return $q.reject(rejection);
    }
  }
})

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('circuitBreakerInterceptor');
}])

.controller( 'cbCtrl', function($scope, $http, circuitBreaker) {
  circuitBreaker.failureCount.digest($scope, 'cbFailureCount');
  circuitBreaker.failuresReachedLimit.digest($scope, 'cbFailuresReachedLimit');
  circuitBreaker.state.digest($scope, 'cbState');
  
  $scope.httpLog = [];
  $scope.send = function (delay) {
    delay = delay || 0;
    $scope.httpLog.push('?')
    $http({method: 'GET', url: 'http://httpbin.org/delay/' + delay})
    .success(function(data, status) {
      $scope.httpLog.push('!')
    })
    .error(function(data, status) {
      $scope.httpLog.push('X')
    });
  }
  
});
