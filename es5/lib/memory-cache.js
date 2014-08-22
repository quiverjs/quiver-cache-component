"use strict";
Object.defineProperties(exports, {
  memoryCacheStoreBundle: {get: function() {
      return memoryCacheStoreBundle;
    }},
  makeMemoryCacheFilters: {get: function() {
      return makeMemoryCacheFilters;
    }},
  __esModule: {value: true}
});
var error = $traceurRuntime.assertObject(require('quiver-error')).error;
var $__0 = $traceurRuntime.assertObject(require('quiver-promise')),
    reject = $__0.reject,
    resolve = $__0.resolve,
    async = $__0.async;
var simpleToStreamHandler = $traceurRuntime.assertObject(require('quiver-simple-handler')).simpleToStreamHandler;
var $__0 = $traceurRuntime.assertObject(require('quiver-stream-util')),
    reuseStream = $__0.reuseStream,
    reuseStreamable = $__0.reuseStreamable;
var $__0 = $traceurRuntime.assertObject(require('quiver-component')),
    handleableBuilder = $__0.handleableBuilder,
    streamHandlerBuilder = $__0.streamHandlerBuilder,
    handlerBundle = $__0.handlerBundle;
var $__0 = $traceurRuntime.assertObject(require('./cache-filter.js')),
    abstractCacheFilter = $__0.abstractCacheFilter,
    abstractCacheInvalidationFilter = $__0.abstractCacheInvalidationFilter;
var inMemoryStreamable = async($traceurRuntime.initGeneratorFunction(function $__1(streamable) {
  var $__2,
      $__3,
      $__4,
      $__5,
      $__6;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $ctx.state = 2;
          return reuseStreamable(streamable);
        case 2:
          streamable = $ctx.sent;
          $ctx.state = 4;
          break;
        case 4:
          $ctx.state = (!streamable.offMemory) ? 5 : 6;
          break;
        case 5:
          $ctx.returnValue = streamable;
          $ctx.state = -2;
          break;
        case 6:
          $__2 = streamable.toStream;
          $__3 = $__2.call(streamable);
          $ctx.state = 13;
          break;
        case 13:
          $ctx.state = 9;
          return $__3;
        case 9:
          $__4 = $ctx.sent;
          $ctx.state = 11;
          break;
        case 11:
          $__5 = reuseStream($__4);
          $__6 = $__5.toStream;
          $ctx.state = 15;
          break;
        case 15:
          $ctx.state = 17;
          return $__6;
        case 17:
          streamable.toStream = $ctx.sent;
          $ctx.state = 19;
          break;
        case 19:
          streamable.offMemory = false;
          $ctx.state = 23;
          break;
        case 23:
          $ctx.returnValue = streamable;
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__1, this);
}));
var memoryCacheStoreBundle = handlerBundle((function(config) {
  var cacheStore = {};
  var getCacheEntry = (function(args) {
    var cacheId = $traceurRuntime.assertObject(args).cacheId;
    if (cacheStore[cacheId]) {
      var streamable = cacheStore[cacheId];
      if (!streamable.isClosed)
        return streamable;
      cacheStore[cacheId] = null;
    }
    return reject(error(404, 'not found'));
  });
  var setCacheEntry = async($traceurRuntime.initGeneratorFunction(function $__7(args, streamable) {
    var cacheId;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            cacheId = $traceurRuntime.assertObject(args).cacheId;
            $ctx.state = 6;
            break;
          case 6:
            $ctx.state = 2;
            return inMemoryStreamable(streamable);
          case 2:
            streamable = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            cacheStore[cacheId] = streamable;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__7, this);
  }));
  var removeCacheEntry = (function(args) {
    var cacheId = $traceurRuntime.assertObject(args).cacheId;
    cacheStore[cacheId] = null;
  });
  return {
    getCacheEntry: getCacheEntry,
    setCacheEntry: setCacheEntry,
    removeCacheEntry: removeCacheEntry
  };
})).simpleHandler('getCacheEntry', 'void', 'streamable').simpleHandler('setCacheEntry', 'streamable', 'void').simpleHandler('removeCacheEntry', 'void', 'void');
var cacheComponents = memoryCacheStoreBundle.handlerComponents;
var abstractMemoryCacheFilter = abstractCacheFilter.implement(cacheComponents);
var abstractMemoryCacheInvalidationFilter = abstractCacheInvalidationFilter.implement(cacheComponents);
var makeMemoryCacheFilters = (function(implMap) {
  var privateTable = {};
  return {
    cacheFilter: abstractMemoryCacheFilter.implement(implMap, privateTable).concretize(),
    cacheInvalidationFilter: abstractMemoryCacheInvalidationFilter.implement(implMap, privateTable).concretize()
  };
});
