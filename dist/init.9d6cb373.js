// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"init.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import EventEmitter from './js/Utils/EventEmitter.js'
var EventEmitter = /*#__PURE__*/function () {
  /**
   * Constructor
   */
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.callbacks = {};
    this.callbacks.base = {};
  }
  /**
   * On
   */


  _createClass(EventEmitter, [{
    key: "on",
    value: function on(_names, callback) {
      var that = this; // Errors

      if (typeof _names === 'undefined' || _names === '') {
        console.warn('wrong names');
        return false;
      }

      if (typeof callback === 'undefined') {
        console.warn('wrong callback');
        return false;
      } // Resolve names


      var names = this.resolveNames(_names); // Each name

      names.forEach(function (_name) {
        // Resolve name
        var name = that.resolveName(_name); // Create namespace if not exist

        if (!(that.callbacks[name.namespace] instanceof Object)) that.callbacks[name.namespace] = {}; // Create callback if not exist

        if (!(that.callbacks[name.namespace][name.value] instanceof Array)) that.callbacks[name.namespace][name.value] = []; // Add callback

        that.callbacks[name.namespace][name.value].push(callback);
      });
      return this;
    }
    /**
     * Off
     */

  }, {
    key: "off",
    value: function off(_names) {
      var that = this; // Errors

      if (typeof _names === 'undefined' || _names === '') {
        console.warn('wrong name');
        return false;
      } // Resolve names


      var names = this.resolveNames(_names); // Each name

      names.forEach(function (_name) {
        // Resolve name
        var name = that.resolveName(_name); // Remove namespace

        if (name.namespace !== 'base' && name.value === '') {
          delete that.callbacks[name.namespace];
        } // Remove specific callback in namespace
        else {
            // Default
            if (name.namespace === 'base') {
              // Try to remove from each namespace
              for (var namespace in that.callbacks) {
                if (that.callbacks[namespace] instanceof Object && that.callbacks[namespace][name.value] instanceof Array) {
                  delete that.callbacks[namespace][name.value]; // Remove namespace if empty

                  if (Object.keys(that.callbacks[namespace]).length === 0) delete that.callbacks[namespace];
                }
              }
            } // Specified namespace
            else if (that.callbacks[name.namespace] instanceof Object && that.callbacks[name.namespace][name.value] instanceof Array) {
                delete that.callbacks[name.namespace][name.value]; // Remove namespace if empty

                if (Object.keys(that.callbacks[name.namespace]).length === 0) delete that.callbacks[name.namespace];
              }
          }
      });
      return this;
    }
    /**
     * Trigger
     */

  }, {
    key: "trigger",
    value: function trigger(_name, _args) {
      // Errors
      if (typeof _name === 'undefined' || _name === '') {
        console.warn('wrong name');
        return false;
      }

      var that = this;
      var finalResult = null;
      var result = null; // Default args

      var args = !(_args instanceof Array) ? [] : _args; // Resolve names (should on have one event)

      var name = this.resolveNames(_name); // Resolve name

      name = this.resolveName(name[0]); // Default namespace

      if (name.namespace === 'base') {
        // Try to find callback in each namespace
        for (var namespace in that.callbacks) {
          if (that.callbacks[namespace] instanceof Object && that.callbacks[namespace][name.value] instanceof Array) {
            that.callbacks[namespace][name.value].forEach(function (callback) {
              result = callback.apply(that, args);

              if (typeof finalResult === 'undefined') {
                finalResult = result;
              }
            });
          }
        }
      } // Specified namespace
      else if (this.callbacks[name.namespace] instanceof Object) {
          if (name.value === '') {
            console.warn('wrong name');
            return this;
          }

          that.callbacks[name.namespace][name.value].forEach(function (callback) {
            result = callback.apply(that, args);
            if (typeof finalResult === 'undefined') finalResult = result;
          });
        }

      return finalResult;
    }
    /**
     * Resolve names
     */

  }, {
    key: "resolveNames",
    value: function resolveNames(_names) {
      var names = _names;
      names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
      names = names.replace(/[,/]+/g, ' ');
      names = names.split(' ');
      return names;
    }
    /**
     * Resolve name
     */

  }, {
    key: "resolveName",
    value: function resolveName(name) {
      var newName = {};
      var parts = name.split('.');
      newName.original = name;
      newName.value = parts[0];
      newName.namespace = 'base'; // Base namespace
      // Specified namespace

      if (parts.length > 1 && parts[1] !== '') {
        newName.namespace = parts[1];
      }

      return newName;
    }
  }]);

  return EventEmitter;
}(); // import Time from './js/Utils/Time.js'


var Time = /*#__PURE__*/function () {
  /**
   * Constructor
   */
  function Time() {
    _classCallCheck(this, Time);

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.tick = this.tick.bind(this);
  }
  /**
   * Tick
   */


  _createClass(Time, [{
    key: "tick",
    value: function tick() {
      this.ticker = window.requestAnimationFrame(this.tick);
      var current = Date.now();
      this.delta = current - this.current;
      this.elapsed = current - this.start;
      this.current = current;

      if (this.delta > 60) {
        this.delta = 60;
      }

      world.step(1 / 60, this.delta, 3);
      eventHandler.trigger('tick');
      renderer.render(scene, camera.instance);
    }
    /**
     * Stop
     */

  }, {
    key: "stop",
    value: function stop() {
      window.cancelAnimationFrame(this.ticker);
    }
  }]);

  return Time;
}();

eventHandler = new EventEmitter();
time = new Time();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42413" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","init.js"], null)
//# sourceMappingURL=/init.9d6cb373.js.map