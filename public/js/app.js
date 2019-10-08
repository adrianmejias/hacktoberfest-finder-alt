(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/App.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/App.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppHeader */ "./src/js/components/AppHeader.vue");
/* harmony import */ var _AppMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppMain */ "./src/js/components/AppMain.vue");
/* harmony import */ var _AppMainModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppMainModal */ "./src/js/components/AppMainModal.vue");
/* harmony import */ var _AppFooter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AppFooter */ "./src/js/components/AppFooter.vue");
/* harmony import */ var _data_languages_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data/languages.json */ "./src/js/data/languages.json");
var _data_languages_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../data/languages.json */ "./src/js/data/languages.json", 1);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AppHeader: _AppHeader__WEBPACK_IMPORTED_MODULE_0__["default"],
    AppMain: _AppMain__WEBPACK_IMPORTED_MODULE_1__["default"],
    AppMainModal: _AppMainModal__WEBPACK_IMPORTED_MODULE_2__["default"],
    AppFooter: _AppFooter__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      topLanguages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'PHP', 'Go', 'HTML', 'C++', 'C#', 'Ruby'],
      languages: _data_languages_json__WEBPACK_IMPORTED_MODULE_4__,
      labels: ['hacktoberfest'],
      results: [],
      page: 1,
      currentLanguage: '',
      isFilterToggled: false,
      isFetching: false,
      showViewMore: false,
      noReplyOnly: false,
      currentResult: null
    };
  },
  created: function created() {
    this.currentLanguage = localStorage.getItem('language') || '';
    this.labels = JSON.parse(localStorage.getItem('labels') || JSON.stringify(this.labels));
    this.noReplyOnly = (localStorage.getItem('noreply') || 'false') === 'true';
    this.languages.sort();
    this.loadIssues();
  },
  mounted: function mounted() {
    var _this = this;

    Bus.$on('toggleFilter', function () {
      _this.toggleFilter();
    });
    Bus.$on('removeLabel', function (labelName) {
      _this.removeLabel(labelName);
    });
    Bus.$on('toggleNoReplyFilter', function () {
      _this.toggleNoReplyFilter();
    });
    Bus.$on('chooseLanguage', function (language) {
      _this.chooseLanguage(language);
    });
    Bus.$on('loadMoreIssues', function () {
      _this.loadMoreIssues();
    });
    Bus.$on('appendLabel', function (labelName) {
      _this.appendLabel(labelName);
    });
    Bus.$on('toggleIssue', function (result) {
      _this.toggleIssue(result);
    });
    Bus.$on('closeModal', function () {
      _this.closeModal();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.results = [];
  },
  methods: {
    loadIssues: function loadIssues() {
      var _this2 = this;

      this.showViewMore = false;
      this.isFetching = true;
      fetch("https://api.github.com/search/issues?page=".concat(this.page, "&q=").concat(this.filterLabels).concat(this.filterLanguage, "+type:issue+state:open").concat(this.filterNoReply)).then(function (response) {
        return response.json();
      }).then(function (response) {
        var items = response.items.map(function (_ref) {
          var repository_url = _ref.repository_url,
              updated_at = _ref.updated_at,
              rest = _objectWithoutProperties(_ref, ["repository_url", "updated_at"]);

          return _objectSpread({}, rest, {
            repoTitle: repository_url.split('/').slice(-1).join(),
            unformattedDate: _this2.unformatDate(updated_at),
            formattedDate: _this2.formatDate(new Date(updated_at))
          });
        });
        _this2.results = [].concat(_toConsumableArray(_this2.results), _toConsumableArray(items)).sort(function (a, b) {
          if (new Date(a.updated_at) > new Date(b.updated_at)) {
            return 1;
          } else if (new Date(b.updated_at) > new Date(a.updated_at)) {
            return -1;
          }

          return 0;
        });
        _this2.showViewMore = _this2.results.length < response.total_count;
        _this2.isFetching = false;
      })["catch"](function (error) {
        _this2.showViewMore = false;
        _this2.isFetching = false;
      });
    },
    unformatDate: function unformatDate(updatedAt) {
      return "".concat(new Date(updatedAt).toLocaleDateString(), " ").concat(new Date(updatedAt).toLocaleTimeString());
    },
    formatDate: function formatDate(updatedAt) {
      var delta = Math.round((+new Date() - updatedAt) / 1000);
      var minute = 60;
      var hour = minute * 60;
      var day = hour * 24;
      var week = day * 7;
      var daysInYear = updatedAt.getFullYear() % 400 === 0 || updatedAt.getFullYear() % 100 !== 0 && updatedAt.getFullYear() % 4 === 0 ? 366 : 365;

      if (delta < 30) {
        return 'just now';
      } else if (delta < minute) {
        return delta + ' seconds ago';
      } else if (delta < 2 * minute) {
        return 'a minute ago';
      } else if (delta < hour) {
        return Math.floor(delta / minute) + ' minutes ago';
      } else if (Math.floor(delta / hour) == 1) {
        return 'an hour ago';
      } else if (delta < day) {
        return Math.floor(delta / hour) + ' hours ago';
      } else if (delta < day * 2) {
        return 'yesterday';
      } else if (delta < week) {
        return 'last week';
      } else if (delta < daysInYear) {
        return 'last year';
      }

      return "".concat(new Date(updatedAt).toLocaleDateString(), ", ").concat(new Date(updatedAt).toLocaleTimeString());
    },
    loadMoreIssues: function loadMoreIssues() {
      this.page++;
      this.loadIssues();
    },
    reloadIssues: function reloadIssues() {
      this.results = [];
      this.isFilterToggled = false;
      this.showViewMore = false;
      this.isFetching = false;
      this.page = 1;
      this.loadIssues();
    },
    chooseLanguage: function chooseLanguage(language) {
      this.currentLanguage = language;
      localStorage.setItem('language', this.currentLanguage);
      this.reloadIssues();
    },
    removeLabel: function removeLabel(labelName) {
      if (!['hacktoberfest'].includes(labelName.toLowerCase())) {
        this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);
        localStorage.setItem('labels', JSON.stringify(this.labels));
        this.reloadIssues();
      }
    },
    appendLabel: function appendLabel(labelName) {
      if (this.labels.includes(labelName.toLowerCase())) {
        this.labels.splice(this.labels.indexOf(labelName.toLowerCase()), 1);
      } else {
        this.labels.push(labelName);
      }

      localStorage.setItem('labels', JSON.stringify(this.labels));
      this.reloadIssues();
    },
    toggleFilter: function toggleFilter() {
      this.isFilterToggled = !this.isFilterToggled;
    },
    toggleNoReplyFilter: function toggleNoReplyFilter() {
      this.results = [];
      this.noReplyOnly = !this.noReplyOnly;
      this.showViewMore = false;
      this.isFetching = false;
      this.page = 1;
      localStorage.setItem('noreply', this.noReplyOnly);
      this.loadIssues();
    },
    toggleIssue: function toggleIssue(result) {
      this.currentResult = result;
    },
    closeModal: function closeModal() {
      this.toggleIssue(null);
    }
  },
  computed: {
    filterLabels: function filterLabels() {
      return 'label:' + this.labels.map(function (name) {
        return "\"".concat(name, "\"").split('+').join('%2B').split('#').join('%23').toLowerCase();
      }).join('+label:');
    },
    filterNoReply: function filterNoReply() {
      if (this.noReplyOnly) {
        return '+comments:0';
      }

      return '';
    },
    filterLanguage: function filterLanguage() {
      if (this.currentLanguage) {
        return '+language:' + this.currentLanguage.split('+').join('%2B').split('#').join('%23').toLowerCase();
      }

      return '';
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppFooter.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/AppFooter.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppHeader.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/AppHeader.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_fixed_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-fixed-header */ "./node_modules/vue-fixed-header/dist/vue-fixed-header.common.js");
/* harmony import */ var vue_fixed_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_fixed_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_click_outside__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-click-outside */ "./node_modules/vue-click-outside/index.js");
/* harmony import */ var vue_click_outside__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_click_outside__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['labels', 'languages', 'currentLanguage', 'isFilterToggled', 'noReplyOnly'],
  components: {
    FixedHeader: vue_fixed_header__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  directives: {
    ClickOutside: vue_click_outside__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      autoRefresh: false,
      autoRefreshTime: 1000 * 60 * 15,
      // 15 minutes
      autoTimer: null
    };
  },
  watch: {
    autoRefresh: function autoRefresh(newValue, oldValue) {
      localStorage.setItem('auto-refresh', newValue);

      if (newValue) {
        this.startAutoRefresh();
      } else {
        this.cancelAutoRefresh();
      }
    }
  },
  created: function created() {
    this.autoRefresh = (localStorage.getItem('auto-refresh') || 'false') === 'true';
    this.startAutoRefresh();
  },
  beforeDestroy: function beforeDestroy() {
    this.cancelAutoRefresh();
  },
  methods: {
    hideFilter: function hideFilter() {
      if (this.isFilterToggled) {
        this.toggleFilter();
      }
    },
    toggleFilter: function toggleFilter() {
      Bus.$emit('toggleFilter');
    },
    removeLabel: function removeLabel(labelName) {
      Bus.$emit('removeLabel', labelName);
    },
    toggleNoReplyFilter: function toggleNoReplyFilter() {
      Bus.$emit('toggleNoReplyFilter');
    },
    refreshLanguage: function refreshLanguage() {
      Bus.$emit('chooseLanguage', this.currentLanguage);
    },
    startAutoRefresh: function startAutoRefresh() {
      if (this.autoRefresh) {
        this.autoTimer = setInterval(this.refreshLanguage, this.autoRefreshTime);
      }
    },
    cancelAutoRefresh: function cancelAutoRefresh() {
      clearInterval(this.autoTimer);
    },
    chooseLanguage: function chooseLanguage(language) {
      this.cancelAutoRefresh();
      Bus.$emit('chooseLanguage', language);
      this.startAutoRefresh();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppMain.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/AppMain.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['labels', 'noReplyOnly', 'isFetching', 'results', 'showViewMore'],
  methods: {
    loadMoreIssues: function loadMoreIssues() {
      Bus.$emit('loadMoreIssues');
    },
    appendLabel: function appendLabel(labelName) {
      Bus.$emit('appendLabel', labelName);
    },
    toggleIssue: function toggleIssue(result) {
      Bus.$emit('toggleIssue', result);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppMainModal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/AppMainModal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['labels', 'noReplyOnly', 'currentResult'],
  mounted: function mounted() {
    var _this = this;

    (function () {
      document.addEventListener('keydown', _this.escapeModal, false);
    })();
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('keydown', this.escapeModal, false);
  },
  methods: {
    escapeModal: function escapeModal(event) {
      if ((event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) && event.target.nodeName.toLowerCase() === 'body') {
        event.preventDefault();
        this.closeModal();
      }
    },
    closeModal: function closeModal() {
      Bus.$emit('closeModal');
    },
    openWindow: function openWindow() {
      window.open(this.currentResult.html_url, 'hofWindow');
    }
  }
});

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-click-outside/index.js":
/*!*************************************************!*\
  !*** ./node_modules/vue-click-outside/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function validate(binding) {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

function isPopup(popupItem, elements) {
  if (!popupItem || !elements)
    return false

  for (var i = 0, len = elements.length; i < len; i++) {
    try {
      if (popupItem.contains(elements[i])) {
        return true
      }
      if (elements[i].contains(popupItem)) {
        return false
      }
    } catch(e) {
      return false
    }
  }

  return false
}

function isServer(vNode) {
  return typeof vNode.componentInstance !== 'undefined' && vNode.componentInstance.$isServer
}

exports = module.exports = {
  bind: function (el, binding, vNode) {
    if (!validate(binding)) return

    // Define Handler and cache it on the element
    function handler(e) {
      if (!vNode.context) return

      // some components may have related popup item, on which we shall prevent the click outside event handler.
      var elements = e.path || (e.composedPath && e.composedPath())
      elements && elements.length > 0 && elements.unshift(e.target)
      
      if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return

      el.__vueClickOutside__.callback(e)
    }

    // add Event Listeners
    el.__vueClickOutside__ = {
      handler: handler,
      callback: binding.value
    }
    !isServer(vNode) && document.addEventListener('click', handler)
  },

  update: function (el, binding) {
    if (validate(binding)) el.__vueClickOutside__.callback = binding.value
  },
  
  unbind: function (el, binding, vNode) {
    // Remove Event Listeners
    !isServer(vNode) && document.removeEventListener('click', el.__vueClickOutside__.handler)
    delete el.__vueClickOutside__
  }
}


/***/ }),

/***/ "./node_modules/vue-fixed-header/dist/vue-fixed-header.common.js":
/*!***********************************************************************!*\
  !*** ./node_modules/vue-fixed-header/dist/vue-fixed-header.common.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0cd8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var $reduce = __webpack_require__("7b23");

$export($export.P + $export.F * !__webpack_require__("2f21")([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1991":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var invoke = __webpack_require__("31f4");
var html = __webpack_require__("fab2");
var cel = __webpack_require__("230e");
var global = __webpack_require__("7726");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("2d95")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2caf":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__("5ca1");

$export($export.S, 'Array', { isArray: __webpack_require__("1169") });


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "31f4":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "504c":
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__("0d58");
var toIObject = __webpack_require__("6821");
var isEnum = __webpack_require__("52a7").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "551c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var global = __webpack_require__("7726");
var ctx = __webpack_require__("9b43");
var classof = __webpack_require__("23c6");
var $export = __webpack_require__("5ca1");
var isObject = __webpack_require__("d3f4");
var aFunction = __webpack_require__("d8e8");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var speciesConstructor = __webpack_require__("ebd6");
var task = __webpack_require__("1991").set;
var microtask = __webpack_require__("8079")();
var newPromiseCapabilityModule = __webpack_require__("a5b8");
var perform = __webpack_require__("9c80");
var userAgent = __webpack_require__("a25f");
var promiseResolve = __webpack_require__("bcaa");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("2b4c")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("dcbc")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7f20")($Promise, PROMISE);
__webpack_require__("7a56")(PROMISE);
Wrapper = __webpack_require__("8378")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("5cc5")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6d67":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var $map = __webpack_require__("0a49")(1);

$export($export.P + $export.F * !__webpack_require__("2f21")([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7b23":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("d8e8");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var toLength = __webpack_require__("9def");

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8079":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var macrotask = __webpack_require__("1991").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("2d95")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");

/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9c80":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a25f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "a5b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("d8e8");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "bcaa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var newPromiseCapability = __webpack_require__("a5b8");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d25f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var $filter = __webpack_require__("0a49")(2);

$export($export.P + $export.F * !__webpack_require__("2f21")([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/slicedToArray.js



function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.entries.js
var es7_object_entries = __webpack_require__("ffc1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.map.js
var es6_array_map = __webpack_require__("6d67");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.filter.js
var es6_array_filter = __webpack_require__("d25f");

// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/objectSpread.js

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.reduce.js
var es6_array_reduce = __webpack_require__("0cd8");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.is-array.js
var es6_array_is_array = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/arrayWithoutHoles.js
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/iterableToArray.js
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/builtin/es6/toConsumableArray.js



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// CONCATENATED MODULE: ./src/utils/getTargetTag.ts



function getTargetTag(userAgent) {
  if (userAgent.includes('Edge')) {
    return 'body';
  }

  if (userAgent.includes('Firefox/') && +userAgent.split('Firefox/')[1] >= 62) {
    return 'html';
  }

  if (userAgent.includes('Chrome') && !userAgent.includes('opr')) {
    return 'html';
  }

  return 'html';
}
// CONCATENATED MODULE: ./src/components/vue-fixed-header.tsx
















/* harmony default export */ var vue_fixed_header = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  props: {
    threshold: {
      required: false,
      type: Number,
      default: 0
    },
    headerClass: {
      required: false,
      type: String,
      default: 'vue-fixed-header'
    },
    fixedClass: {
      required: false,
      type: String,
      default: 'vue-fixed-header--isFixed'
    },
    hideScrollUp: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      qs: null,
      check: null,
      tag: null,
      isFixed: false,
      lastScrollTop: 0
    };
  },
  mounted: function mounted() {
    this.main();
    this.registerEvent();
  },
  beforeDestroy: function beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    main: function main() {
      var _this = this;

      this.qs = function (e) {
        return document.querySelector(e);
      };

      this.tag = getTargetTag(navigator.userAgent);

      this.check = function () {
        var tag = _this.tag,
            qs = _this.qs,
            threshold = _this.threshold,
            hideScrollUp = _this.hideScrollUp;
        var offsetHeight = _this.$el.offsetHeight;

        if (!hideScrollUp) {
          if (tag && _this.isFixed !== qs(tag).scrollTop > threshold) {
            _this.isFixed = qs(tag).scrollTop > threshold;

            _this.$emit('change', _this.isFixed);

            _this.$forceUpdate();
          }
        } else {
          _this.isFixed = _this.isFixed ? qs(tag).scrollTop > threshold : window.pageYOffset > _this.lastScrollTop && window.pageYOffset > offsetHeight;

          _this.$emit('change', _this.isFixed);

          _this.$forceUpdate();

          _this.lastScrollTop = window.pageYOffset;
        }
      };
    },
    registerEvent: function registerEvent() {
      window.addEventListener('scroll', this.check);
    },
    removeEvent: function removeEvent() {
      window.removeEventListener('scroll', this.check);
    }
  },
  render: function render(h) {
    var _objectSpread3;

    var children = this.$slots.default;

    if (!children || !_toConsumableArray(children)[0]) {
      return h();
    }

    var _child = _toConsumableArray(children)[0];

    var child = h(_child.tag, _child.data, _child.children || _child.text);
    child.data = child.data || {
      class: ''
    };

    if (typeof child.data.class === 'string') {
      child.data.class = child.data.class.split(' ');
    }

    if (Array.isArray(child.data.class)) {
      child.data.class = _toConsumableArray(child.data.class).reduce(function (a, b) {
        return _objectSpread({}, a, _defineProperty({}, b, true));
      }, {});
    }

    child.data.class = _objectSpread({}, child.data.class, (_objectSpread3 = {}, _defineProperty(_objectSpread3, this.headerClass, true), _defineProperty(_objectSpread3, this.fixedClass, !!this.isFixed), _objectSpread3));
    child.data.class = Object.entries(child.data.class).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      return v ? k : null;
    }).filter(function (v) {
      return v;
    }).join(' ');
    return child;
  }
}));
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (vue_fixed_header);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "ffc1":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__("5ca1");
var $entries = __webpack_require__("504c")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ })

/******/ });
//# sourceMappingURL=vue-fixed-header.common.js.map

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/App.vue?vue&type=template&id=9c9d20f6&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/App.vue?vue&type=template&id=9c9d20f6& ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {},
    [
      _c("app-header", {
        attrs: {
          labels: _vm.labels,
          languages: _vm.languages,
          "current-language": _vm.currentLanguage,
          "is-filter-toggled": _vm.isFilterToggled,
          "no-reply-only": _vm.noReplyOnly
        }
      }),
      _vm._v(" "),
      _c("app-main", {
        attrs: {
          labels: _vm.labels,
          "no-reply-only": _vm.noReplyOnly,
          "is-fetching": _vm.isFetching,
          results: _vm.results,
          "show-view-more": _vm.showViewMore
        }
      }),
      _vm._v(" "),
      _vm.currentResult
        ? _c("app-main-modal", {
            attrs: {
              labels: _vm.labels,
              "no-reply-only": _vm.noReplyOnly,
              "current-result": _vm.currentResult
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("app-footer")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppFooter.vue?vue&type=template&id=6e2f9600&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/AppFooter.vue?vue&type=template&id=6e2f9600& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("footer", { staticClass: "bg-primary w-full mt-8" }, [_vm._m(0)])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass:
          "container mx-auto flex flex-row items-center justify-between p-8"
      },
      [
        _c(
          "div",
          { staticClass: "flex flex-row items-center justify-center" },
          [
            _c("div", { staticClass: "text-amber" }, [
              _vm._v("\n                Unofficial site by "),
              _c(
                "a",
                {
                  staticClass: "text-secondary",
                  attrs: {
                    href: "http://duncan.mcclean.co.uk",
                    target: "_blank",
                    title: "Duncan McClean",
                    rel: "noreferrer"
                  }
                },
                [_vm._v("Duncan McClean")]
              ),
              _vm._v(" and "),
              _c(
                "a",
                {
                  staticClass: "text-secondary",
                  attrs: {
                    href:
                      "https://github.com/damcclean/hacktoberfest-finder/blob/master/CONTRIBUTORS.md",
                    target: "_blank",
                    title: "contributors",
                    rel: "noreferrer"
                  }
                },
                [_vm._v("contributors")]
              ),
              _vm._v(". Contribute on "),
              _c(
                "a",
                {
                  staticClass: "text-secondary",
                  attrs: {
                    href: "https://github.com/damcclean/hacktoberfest-finder",
                    target: "_blank",
                    title: "GitHub!",
                    rel: "noreferrer"
                  }
                },
                [_vm._v("GitHub!")]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "flex flex-row items-center justify-center" },
          [
            _c(
              "a",
              {
                staticClass: "mx-2 w-6 h-6",
                attrs: {
                  href: "https://www.digitalocean.com",
                  title: "DigitalOcean",
                  target: "_blank",
                  rel: "noreferrer"
                }
              },
              [
                _c("img", {
                  staticClass: "w-6 h-6",
                  attrs: {
                    src: "/images/digital-ocean.png",
                    alt: "DigitalOcean"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c(
              "a",
              {
                staticClass: "mx-2 w-6 h-6",
                attrs: {
                  href: "https://dev.to",
                  title: "DEV",
                  target: "_blank",
                  rel: "noreferrer"
                }
              },
              [
                _c("img", {
                  staticClass: "w-6 h-6",
                  attrs: { src: "/images/dev.svg", alt: "DEV" }
                })
              ]
            )
          ]
        )
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppHeader.vue?vue&type=template&id=e13c0c1c&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/AppHeader.vue?vue&type=template&id=e13c0c1c& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("fixed-header", [
    _c(
      "header",
      {
        staticClass:
          "container mx-auto my-6 flex flex-row flex-wrap justify-between items-center"
      },
      [
        _c(
          "div",
          { staticClass: "flex flex-row flex-wrap items-center logo-wrapper" },
          [
            _c(
              "a",
              {
                staticClass: "logo-link",
                attrs: {
                  href: "https://hacktoberfest.digitalocean.com",
                  title: "Hacktoberfest 2019",
                  target: "_blank",
                  rel: "noreferrer"
                }
              },
              [
                _c("img", {
                  staticClass: "mx-auto md:w-64 sm:w-full logo",
                  attrs: {
                    src: "/images/header.svg",
                    alt: "Hacktoberfest 2019"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c(
              "h1",
              {
                staticClass:
                  "text-5xl font-bold text-primary uppercase mx-auto my-4 md:my-0 text-center logo-title"
              },
              [_vm._v("\n                Issue Finder\n            ")]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "w-full md:w-auto flex flex-row flex-wrap items-center justify-around mx-auto my-4"
          },
          [
            _c(
              "span",
              {
                staticClass: "text-primary text-lg font-semibold uppercase mx-2"
              },
              [_vm._v("\n                Filter By:\n            ")]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                directives: [
                  {
                    name: "click-outside",
                    rawName: "v-click-outside",
                    value: _vm.hideFilter,
                    expression: "hideFilter"
                  }
                ],
                staticClass:
                  "flex flex-column justify-around items-center filter relative"
              },
              [
                _c(
                  "button",
                  {
                    staticClass:
                      "text-primary text-lg font-semibold uppercase relative focus:outline-none",
                    attrs: { type: "button" },
                    on: { click: _vm.toggleFilter }
                  },
                  [_vm._v("\n                    Language\n                ")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.isFilterToggled,
                        expression: "isFilterToggled"
                      }
                    ],
                    staticClass:
                      "filter-values flex flex-col bg-primary absolute top-0 right-0 mt-2 w-48 shadow-xl rounded-lg overflow-hidden overflow-y-auto border-2 border-primary border-solid h-64"
                  },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "font-bold text-md p-2 language",
                        class: {
                          "text-white bg-secondary hover:bg-secondary hover:text-white": !_vm.currentLanguage,
                          "text-secondary bg-primary hover:bg-secondary hover:text-white":
                            _vm.currentLanguage
                        },
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.chooseLanguage("")
                          }
                        }
                      },
                      [_vm._v("Any")]
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.languages, function(language) {
                      return _c("button", {
                        staticClass: "font-thin text-sm p-2 language",
                        class: {
                          "text-white bg-secondary hover:bg-secondary hover:text-white":
                            _vm.currentLanguage === language,
                          "text-secondary bg-primary hover:bg-secondary hover:text-white":
                            _vm.currentLanguage !== language
                        },
                        attrs: { type: "button" },
                        domProps: { textContent: _vm._s(language) },
                        on: {
                          click: function($event) {
                            return _vm.chooseLanguage(language)
                          }
                        }
                      })
                    })
                  ],
                  2
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "span",
              {
                staticClass: "text-primary text-lg font-semibold uppercase mx-2"
              },
              [_vm._v("\n                /\n            ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass:
                  "text-primary text-lg font-semibold uppercase mx-2 px-2 py-1 rounded border-1",
                class: { "bg-primary text-secondary": _vm.noReplyOnly },
                attrs: { type: "button" },
                on: { click: _vm.toggleNoReplyFilter }
              },
              [_vm._v("\n                No Reply\n            ")]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "flex flex-row flex-wrap justify-center items-center"
          },
          [
            _c("div", { staticClass: "md:w-64 sm:w-full" }, [
              _c("label", { staticClass: "text-primary" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.autoRefresh,
                      expression: "autoRefresh"
                    }
                  ],
                  staticClass: "mr-2 leading-tight",
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.autoRefresh)
                      ? _vm._i(_vm.autoRefresh, null) > -1
                      : _vm.autoRefresh
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.autoRefresh,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 && (_vm.autoRefresh = $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            (_vm.autoRefresh = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.autoRefresh = $$c
                      }
                    }
                  }
                }),
                _vm._v(" "),
                _c("span", { staticClass: "text-xs" }, [
                  _vm._v(
                    "\n                        Auto Refresh\n                    "
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "text-primary text-xs font-semibold mx-2 my-2",
                  attrs: { type: "button" },
                  on: { click: _vm.refreshLanguage }
                },
                [_vm._v("\n                    (refresh)\n                ")]
              )
            ]),
            _vm._v(" "),
            _vm.currentLanguage
              ? _c("div", {
                  staticClass: "text-primary text-xs font-semibold mx-2 my-2",
                  domProps: { textContent: _vm._s(_vm.currentLanguage + ":") }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.labels, function(name) {
              return _c("button", {
                staticClass: "text-amber text-xs font-semibold mx-2 my-2",
                attrs: { type: "button" },
                domProps: { textContent: _vm._s("#" + name.toLowerCase()) },
                on: {
                  click: function($event) {
                    return _vm.removeLabel(name)
                  }
                }
              })
            })
          ],
          2
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppMain.vue?vue&type=template&id=839dd344&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/AppMain.vue?vue&type=template&id=839dd344& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("main", { staticClass: "container mx-auto my-12" }, [
    _c(
      "div",
      { staticClass: "grid", attrs: { id: "results" } },
      _vm._l(_vm.results, function(result) {
        return _c(
          "div",
          {
            staticClass:
              "bg-white hover:bg-pinkish rounded-lg p-2 text-black flex flex-col justify-center items-center overflow-hidden overflow-y-auto shadow-lg grid-item",
            on: {
              click: function($event) {
                return _vm.toggleIssue(result)
              }
            }
          },
          [
            _c(
              "div",
              {
                staticClass:
                  "flex flex-wrap flex-row w-full items-center justify-center mb-2"
              },
              _vm._l(result.labels, function(label) {
                return _c("button", {
                  staticClass:
                    "text-center rounded-sm text-xs px-2 py-1 m-1 shadow-md",
                  class: {
                    "font-bold": _vm.labels.includes(label.name.toLowerCase())
                  },
                  style: { backgroundColor: "#" + label.color },
                  attrs: { type: "button" },
                  domProps: { textContent: _vm._s(label.name.toLowerCase()) },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      $event.stopPropagation()
                      return _vm.appendLabel(label.name)
                    }
                  }
                })
              }),
              0
            ),
            _vm._v(" "),
            _c("h2", {
              staticClass: "text-center text-xl mb-4 font-bold",
              domProps: { textContent: _vm._s(result.title) }
            }),
            _vm._v(" "),
            _c("h3", {
              staticClass: "text-center text-blue text-sm mb-4 break-words",
              domProps: {
                textContent: _vm._s(result.user.login + "/" + result.repoTitle)
              }
            }),
            _vm._v(" "),
            _c("div", {
              staticClass:
                "text-left border-gray border-solid border-l-4 pl-2 text-sm mb-4 truncate max-w-xs",
              domProps: { textContent: _vm._s(result.body) }
            }),
            _vm._v(" "),
            !_vm.noReplyOnly
              ? _c("div", {
                  staticClass: "text-center text-xs mb-4",
                  class: { "text-amber": !result.comments },
                  domProps: {
                    textContent: _vm._s(
                      result.comments > 0
                        ? "Replies: " + result.comments
                        : "Gimme Gimme"
                    )
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _c("div", {
              staticClass: "text-left text-xs mb-4",
              domProps: {
                textContent: _vm._s("Opend by: " + result.user.login)
              }
            }),
            _vm._v(" "),
            _c("div", { staticClass: "text-center text-xs mb-4" }, [
              _c("time", {
                attrs: { datetime: result.unformattedDate },
                domProps: {
                  textContent: _vm._s("Last updated: " + result.formattedDate)
                }
              })
            ])
          ]
        )
      }),
      0
    ),
    _vm._v(" "),
    _vm.showViewMore || _vm.isFetching
      ? _c(
          "div",
          { staticClass: "flex flex-row items-center justify-center mt-6" },
          [
            _c("button", {
              staticClass:
                "uppercase font-thin text-primary border-2 border-primary text-3xl bg-secondary hover:bg-primary hover:text-secondary py-2 px-4 rounded",
              attrs: { type: "button", disabled: _vm.isFetching },
              domProps: {
                textContent: _vm._s(
                  _vm.isFetching ? "Loading More Issues..." : "Load More Issues"
                )
              },
              on: { click: _vm.loadMoreIssues }
            })
          ]
        )
      : _vm.results.length === 0
      ? _c(
          "div",
          { staticClass: "flex flex-row items-center justify-center mt-6" },
          [
            _c(
              "div",
              {
                staticClass:
                  "uppercase font-thin text-primary text-3xl bg-secondary py-2 px-4"
              },
              [_vm._v("\n            No issues found\n        ")]
            )
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppMainModal.vue?vue&type=template&id=3c80b69f&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/AppMainModal.vue?vue&type=template&id=3c80b69f& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    {
      staticClass:
        "grid-item-container fixed top-0 bottom-0 left-0 right-0 max-w-full h-full",
      on: { click: _vm.closeModal }
    },
    [
      _c(
        "a",
        {
          staticClass:
            "bg-white hover:bg-pinkish rounded-lg p-2 text-black flex flex-col justify-center items-center overflow-hidden overflow-y-auto shadow-lg grid-item max-w-md mx-auto",
          attrs: {
            href: _vm.currentResult.html_url,
            target: "_blank",
            title: _vm.currentResult.title
          },
          on: {
            click: function($event) {
              $event.preventDefault()
              $event.stopPropagation()
              return _vm.openWindow($event)
            }
          }
        },
        [
          _c(
            "div",
            {
              staticClass:
                "flex flex-wrap flex-row w-full items-center justify-center mb-2"
            },
            _vm._l(_vm.currentResult.labels, function(label) {
              return _c("span", {
                staticClass:
                  "text-center rounded-sm text-xs px-2 py-1 m-1 shadow-md",
                class: {
                  "font-bold": _vm.labels.includes(label.name.toLowerCase())
                },
                style: { backgroundColor: "#" + label.color },
                domProps: { textContent: _vm._s(label.name.toLowerCase()) }
              })
            }),
            0
          ),
          _vm._v(" "),
          _c("h2", {
            staticClass: "text-center text-xl mb-4 font-bold",
            domProps: { textContent: _vm._s(_vm.currentResult.title) }
          }),
          _vm._v(" "),
          _c("h3", {
            staticClass: "text-center text-blue text-sm mb-4 break-words",
            domProps: {
              textContent: _vm._s(
                _vm.currentResult.user.login + "/" + _vm.currentResult.repoTitle
              )
            }
          }),
          _vm._v(" "),
          _c("div", {
            staticClass:
              "text-left border-gray border-solid border-l-4 pl-2 text-sm mb-4 overflow-hidden overflow-y-scroll max-w-sm whitespace-pre-wrap h-full",
            staticStyle: { "max-height": "14rem" },
            domProps: { textContent: _vm._s(_vm.currentResult.body) }
          }),
          _vm._v(" "),
          !_vm.noReplyOnly
            ? _c("div", {
                staticClass: "text-center text-xs mb-4",
                class: { "text-amber": !_vm.currentResult.comments },
                domProps: {
                  textContent: _vm._s(
                    _vm.currentResult.comments > 0
                      ? "Replies: " + _vm.currentResult.comments
                      : "Gimme Gimme"
                  )
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("div", {
            staticClass: "text-left text-xs mb-4",
            domProps: {
              textContent: _vm._s("Opend by: " + _vm.currentResult.user.login)
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "text-center text-xs mb-4" }, [
            _c("time", {
              attrs: { datetime: _vm.currentResult.unformattedDate },
              domProps: {
                textContent: _vm._s(
                  "Last updated: " + _vm.currentResult.formattedDate
                )
              }
            })
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/css/app.css":
/*!*************************!*\
  !*** ./src/css/app.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/App */ "./src/js/components/App.vue");
// Require dependencies
window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
window.Bus = new Vue(); // Configure Vue

Vue.config.productionTip = "development" === 'development'; // @url https://github.com/vuejs/vue-devtools

Vue.config.devtools = "development" === 'development'; // Create a Vue component

 // Create a Vue instance

new Vue({
  render: function render(h) {
    return h(_components_App__WEBPACK_IMPORTED_MODULE_0__["default"]);
  }
}).$mount('#app');

/***/ }),

/***/ "./src/js/components/App.vue":
/*!***********************************!*\
  !*** ./src/js/components/App.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_9c9d20f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=9c9d20f6& */ "./src/js/components/App.vue?vue&type=template&id=9c9d20f6&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "./src/js/components/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_9c9d20f6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_9c9d20f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/components/App.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./src/js/components/App.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/js/components/App.vue?vue&type=template&id=9c9d20f6&":
/*!******************************************************************!*\
  !*** ./src/js/components/App.vue?vue&type=template&id=9c9d20f6& ***!
  \******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_9c9d20f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=9c9d20f6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/App.vue?vue&type=template&id=9c9d20f6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_9c9d20f6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_9c9d20f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/components/AppFooter.vue":
/*!*****************************************!*\
  !*** ./src/js/components/AppFooter.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppFooter_vue_vue_type_template_id_6e2f9600___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppFooter.vue?vue&type=template&id=6e2f9600& */ "./src/js/components/AppFooter.vue?vue&type=template&id=6e2f9600&");
/* harmony import */ var _AppFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppFooter.vue?vue&type=script&lang=js& */ "./src/js/components/AppFooter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AppFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppFooter_vue_vue_type_template_id_6e2f9600___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AppFooter_vue_vue_type_template_id_6e2f9600___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/AppFooter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/components/AppFooter.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./src/js/components/AppFooter.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AppFooter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppFooter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/js/components/AppFooter.vue?vue&type=template&id=6e2f9600&":
/*!************************************************************************!*\
  !*** ./src/js/components/AppFooter.vue?vue&type=template&id=6e2f9600& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_template_id_6e2f9600___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AppFooter.vue?vue&type=template&id=6e2f9600& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppFooter.vue?vue&type=template&id=6e2f9600&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_template_id_6e2f9600___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_template_id_6e2f9600___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/components/AppHeader.vue":
/*!*****************************************!*\
  !*** ./src/js/components/AppHeader.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppHeader_vue_vue_type_template_id_e13c0c1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppHeader.vue?vue&type=template&id=e13c0c1c& */ "./src/js/components/AppHeader.vue?vue&type=template&id=e13c0c1c&");
/* harmony import */ var _AppHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppHeader.vue?vue&type=script&lang=js& */ "./src/js/components/AppHeader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AppHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppHeader_vue_vue_type_template_id_e13c0c1c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AppHeader_vue_vue_type_template_id_e13c0c1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/AppHeader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/components/AppHeader.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./src/js/components/AppHeader.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AppHeader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppHeader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/js/components/AppHeader.vue?vue&type=template&id=e13c0c1c&":
/*!************************************************************************!*\
  !*** ./src/js/components/AppHeader.vue?vue&type=template&id=e13c0c1c& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppHeader_vue_vue_type_template_id_e13c0c1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AppHeader.vue?vue&type=template&id=e13c0c1c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppHeader.vue?vue&type=template&id=e13c0c1c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppHeader_vue_vue_type_template_id_e13c0c1c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppHeader_vue_vue_type_template_id_e13c0c1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/components/AppMain.vue":
/*!***************************************!*\
  !*** ./src/js/components/AppMain.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppMain_vue_vue_type_template_id_839dd344___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppMain.vue?vue&type=template&id=839dd344& */ "./src/js/components/AppMain.vue?vue&type=template&id=839dd344&");
/* harmony import */ var _AppMain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppMain.vue?vue&type=script&lang=js& */ "./src/js/components/AppMain.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AppMain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppMain_vue_vue_type_template_id_839dd344___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AppMain_vue_vue_type_template_id_839dd344___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/AppMain.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/components/AppMain.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/js/components/AppMain.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AppMain.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppMain.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMain_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/js/components/AppMain.vue?vue&type=template&id=839dd344&":
/*!**********************************************************************!*\
  !*** ./src/js/components/AppMain.vue?vue&type=template&id=839dd344& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMain_vue_vue_type_template_id_839dd344___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AppMain.vue?vue&type=template&id=839dd344& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppMain.vue?vue&type=template&id=839dd344&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMain_vue_vue_type_template_id_839dd344___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMain_vue_vue_type_template_id_839dd344___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/components/AppMainModal.vue":
/*!********************************************!*\
  !*** ./src/js/components/AppMainModal.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppMainModal_vue_vue_type_template_id_3c80b69f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppMainModal.vue?vue&type=template&id=3c80b69f& */ "./src/js/components/AppMainModal.vue?vue&type=template&id=3c80b69f&");
/* harmony import */ var _AppMainModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppMainModal.vue?vue&type=script&lang=js& */ "./src/js/components/AppMainModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AppMainModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppMainModal_vue_vue_type_template_id_3c80b69f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AppMainModal_vue_vue_type_template_id_3c80b69f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/AppMainModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/components/AppMainModal.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./src/js/components/AppMainModal.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMainModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AppMainModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppMainModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMainModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/js/components/AppMainModal.vue?vue&type=template&id=3c80b69f&":
/*!***************************************************************************!*\
  !*** ./src/js/components/AppMainModal.vue?vue&type=template&id=3c80b69f& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMainModal_vue_vue_type_template_id_3c80b69f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AppMainModal.vue?vue&type=template&id=3c80b69f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/AppMainModal.vue?vue&type=template&id=3c80b69f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMainModal_vue_vue_type_template_id_3c80b69f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppMainModal_vue_vue_type_template_id_3c80b69f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/data/languages.json":
/*!************************************!*\
  !*** ./src/js/data/languages.json ***!
  \************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, default */
/***/ (function(module) {

module.exports = JSON.parse("[\"ActionScript\",\"C\",\"C#\",\"C++\",\"Clojure\",\"CoffeeScript\",\"CSS\",\"Go\",\"Haskell\",\"HTML\",\"Java\",\"JavaScript\",\"Lua\",\"MATLAB\",\"Objective-C\",\"Perl\",\"PHP\",\"Python\",\"R\",\"Ruby\",\"Scala\",\"Shell\",\"Swift\",\"TeX\",\"Vim script\",\"1C Enterprise\",\"ABAP\",\"ABNF\",\"Ada\",\"Adobe Font Metrics\",\"Agda\",\"AGS Script\",\"Alloy\",\"Alpine Abuild\",\"AMPL\",\"AngelScript\",\"Ant Build System\",\"ANTLR\",\"ApacheConf\",\"Apex\",\"API Blueprint\",\"APL\",\"Apollo Guidance Computer\",\"AppleScript\",\"Arc\",\"AsciiDoc\",\"ASN.1\",\"ASP\",\"AspectJ\",\"Assembly\",\"ATS\",\"Augeas\",\"AutoHotkey\",\"AutoIt\",\"Awk\",\"Ballerina\",\"Batchfile\",\"Befunge\",\"Bison\",\"BitBake\",\"Blade\",\"BlitzBasic\",\"BlitzMax\",\"Bluespec\",\"Boo\",\"Brainfuck\",\"Brightscript\",\"Bro\",\"C-ObjDump\",\"C2hs Haskell\",\"Cap'n Proto\",\"CartoCSS\",\"Ceylon\",\"Chapel\",\"Charity\",\"ChucK\",\"Cirru\",\"Clarion\",\"Clean\",\"Click\",\"CLIPS\",\"Closure Templates\",\"Cloud Firestore Security Rules\",\"CMake\",\"COBOL\",\"ColdFusion\",\"ColdFusion CFC\",\"COLLADA\",\"Common Lisp\",\"Common Workflow Language\",\"Component Pascal\",\"CoNLL-U\",\"Cool\",\"Coq\",\"Cpp-ObjDump\",\"Creole\",\"Crystal\",\"CSON\",\"Csound\",\"Csound Document\",\"Csound Score\",\"CSV\",\"Cuda\",\"CWeb\",\"Cycript\",\"Cython\",\"D\",\"D-ObjDump\",\"Darcs Patch\",\"Dart\",\"DataWeave\",\"desktop\",\"Diff\",\"DIGITAL Command Language\",\"DM\",\"DNS Zone\",\"Dockerfile\",\"Dogescript\",\"DTrace\",\"Dylan\",\"E\",\"Eagle\",\"Easybuild\",\"EBNF\",\"eC\",\"Ecere Projects\",\"ECL\",\"ECLiPSe\",\"Edje Data Collection\",\"edn\",\"Eiffel\",\"EJS\",\"Elixir\",\"Elm\",\"Emacs Lisp\",\"EmberScript\",\"EML\",\"EQ\",\"Erlang\",\"F#\",\"F*\",\"Factor\",\"Fancy\",\"Fantom\",\"FIGlet Font\",\"Filebench WML\",\"Filterscript\",\"fish\",\"FLUX\",\"Formatted\",\"Forth\",\"Fortran\",\"FreeMarker\",\"Frege\",\"G-code\",\"Game Maker Language\",\"GAMS\",\"GAP\",\"GCC Machine Description\",\"GDB\",\"GDScript\",\"Genie\",\"Genshi\",\"Gentoo Ebuild\",\"Gentoo Eclass\",\"Gerber Image\",\"Gettext Catalog\",\"Gherkin\",\"GLSL\",\"Glyph\",\"Glyph Bitmap Distribution Format\",\"GN\",\"Gnuplot\",\"Golo\",\"Gosu\",\"Grace\",\"Gradle\",\"Grammatical Framework\",\"Graph Modeling Language\",\"GraphQL\",\"Graphviz (DOT)\",\"Groovy\",\"Groovy Server Pages\",\"Hack\",\"Haml\",\"Handlebars\",\"HAProxy\",\"Harbour\",\"Haxe\",\"HCL\",\"HiveQL\",\"HLSL\",\"HTML+Django\",\"HTML+ECR\",\"HTML+EEX\",\"HTML+ERB\",\"HTML+PHP\",\"HTML+Razor\",\"HTTP\",\"HXML\",\"Hy\",\"HyPhy\",\"IDL\",\"Idris\",\"IGOR Pro\",\"Inform 7\",\"INI\",\"Inno Setup\",\"Io\",\"Ioke\",\"IRC log\",\"Isabelle\",\"Isabelle ROOT\",\"J\",\"Jasmin\",\"Java Properties\",\"Java Server Pages\",\"JFlex\",\"Jison\",\"Jison Lex\",\"Jolie\",\"JSON\",\"JSON with Comments\",\"JSON5\",\"JSONiq\",\"JSONLD\",\"JSX\",\"Julia\",\"Jupyter Notebook\",\"KiCad Layout\",\"KiCad Legacy Layout\",\"KiCad Schematic\",\"Kit\",\"Kotlin\",\"KRL\",\"LabVIEW\",\"Lasso\",\"Latte\",\"Lean\",\"Less\",\"Lex\",\"LFE\",\"LilyPond\",\"Limbo\",\"Linker Script\",\"Linux Kernel Module\",\"Liquid\",\"Literate Agda\",\"Literate CoffeeScript\",\"Literate Haskell\",\"LiveScript\",\"LLVM\",\"Logos\",\"Logtalk\",\"LOLCODE\",\"LookML\",\"LoomScript\",\"LSL\",\"M\",\"M4\",\"M4Sugar\",\"Makefile\",\"Mako\",\"Markdown\",\"Marko\",\"Mask\",\"Mathematica\",\"Maven POM\",\"Max\",\"MAXScript\",\"MediaWiki\",\"Mercury\",\"Meson\",\"Metal\",\"MiniD\",\"Mirah\",\"Modelica\",\"Modula-2\",\"Modula-3\",\"Module Management System\",\"Monkey\",\"Moocode\",\"MoonScript\",\"MQL4\",\"MQL5\",\"MTML\",\"MUF\",\"mupad\",\"Myghty\",\"NCL\",\"Nearley\",\"Nemerle\",\"nesC\",\"NetLinx\",\"NetLinx+ERB\",\"NetLogo\",\"NewLisp\",\"Nextflow\",\"Nginx\",\"Nim\",\"Ninja\",\"Nit\",\"Nix\",\"NL\",\"NSIS\",\"Nu\",\"NumPy\",\"ObjDump\",\"Objective-C++\",\"Objective-J\",\"OCaml\",\"Omgrofl\",\"ooc\",\"Opa\",\"Opal\",\"OpenCL\",\"OpenEdge ABL\",\"OpenRC runscript\",\"OpenSCAD\",\"OpenType Feature File\",\"Org\",\"Ox\",\"Oxygene\",\"Oz\",\"P4\",\"Pan\",\"Papyrus\",\"Parrot\",\"Parrot Assembly\",\"Parrot Internal Representation\",\"Pascal\",\"Pawn\",\"Pep8\",\"Perl 6\",\"Pic\",\"Pickle\",\"PicoLisp\",\"PigLatin\",\"Pike\",\"PLpgSQL\",\"PLSQL\",\"Pod\",\"Pod 6\",\"PogoScript\",\"Pony\",\"PostCSS\",\"PostScript\",\"POV-Ray SDL\",\"PowerBuilder\",\"PowerShell\",\"Processing\",\"Prolog\",\"Propeller Spin\",\"Protocol Buffer\",\"Public Key\",\"Pug\",\"Puppet\",\"Pure Data\",\"PureBasic\",\"PureScript\",\"Python console\",\"Python traceback\",\"q\",\"QMake\",\"QML\",\"Quake\",\"Racket\",\"Ragel\",\"RAML\",\"Rascal\",\"Raw token data\",\"RDoc\",\"REALbasic\",\"Reason\",\"Rebol\",\"Red\",\"Redcode\",\"Regular Expression\",\"Ren'Py\",\"RenderScript\",\"reStructuredText\",\"REXX\",\"RHTML\",\"Ring\",\"RMarkdown\",\"RobotFramework\",\"Roff\",\"Rouge\",\"RPC\",\"RPM Spec\",\"RUNOFF\",\"Rust\",\"Sage\",\"SaltStack\",\"SAS\",\"Sass\",\"Scaml\",\"Scheme\",\"Scilab\",\"SCSS\",\"sed\",\"Self\",\"ShaderLab\",\"ShellSession\",\"Shen\",\"Slash\",\"Slice\",\"Slim\",\"Smali\",\"Smalltalk\",\"Smarty\",\"SMT\",\"Solidity\",\"SourcePawn\",\"SPARQL\",\"Spline Font Database\",\"SQF\",\"SQL\",\"SQLPL\",\"Squirrel\",\"SRecode Template\",\"Stan\",\"Standard ML\",\"Stata\",\"STON\",\"Stylus\",\"SubRip Text\",\"SugarSS\",\"SuperCollider\",\"SVG\",\"SystemVerilog\",\"Tcl\",\"Tcsh\",\"Tea\",\"Terra\",\"Text\",\"Textile\",\"Thrift\",\"TI Program\",\"TLA\",\"TOML\",\"Turing\",\"Turtle\",\"Twig\",\"TXL\",\"Type Language\",\"TypeScript\",\"Unified Parallel C\",\"Unity3D Asset\",\"Unix Assembly\",\"Uno\",\"UnrealScript\",\"UrWeb\",\"Vala\",\"VCL\",\"Verilog\",\"VHDL\",\"Visual Basic\",\"Volt\",\"Vue\",\"Wavefront Material\",\"Wavefront Object\",\"wdl\",\"Web Ontology Language\",\"WebAssembly\",\"WebIDL\",\"Windows Registry Entries\",\"wisp\",\"World of Warcraft Addon Data\",\"X BitMap\",\"X Font Directory Index\",\"X PixMap\",\"X10\",\"xBase\",\"XC\",\"XCompose\",\"XML\",\"Xojo\",\"XPages\",\"XProc\",\"XQuery\",\"XS\",\"XSLT\",\"Xtend\",\"Yacc\",\"YAML\",\"YANG\",\"YARA\",\"YASnippet\",\"Zephir\",\"Zimpl\"]");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./src/js/app.js ./src/css/app.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Volumes/Mackup/GitHub/hacktoberfest-finder/src/js/app.js */"./src/js/app.js");
module.exports = __webpack_require__(/*! /Volumes/Mackup/GitHub/hacktoberfest-finder/src/css/app.css */"./src/css/app.css");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvQXBwLnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvQXBwRm9vdGVyLnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvQXBwSGVhZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvQXBwTWFpbi52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL0FwcE1haW5Nb2RhbC52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWNsaWNrLW91dHNpZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1maXhlZC1oZWFkZXIvZGlzdC92dWUtZml4ZWQtaGVhZGVyLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9BcHAudnVlP2U1MDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQXBwRm9vdGVyLnZ1ZT83MWE2Iiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0FwcEhlYWRlci52dWU/ZDQzYSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9BcHBNYWluLnZ1ZT9hNTdmIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0FwcE1haW5Nb2RhbC52dWU/M2I0NyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9hcHAuY3NzPzRhNjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9BcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0FwcC52dWU/NjkyYSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9BcHAudnVlPzNiZDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQXBwRm9vdGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9BcHBGb290ZXIudnVlPzM2ZGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQXBwRm9vdGVyLnZ1ZT9mYmY5Iiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0FwcEhlYWRlci52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQXBwSGVhZGVyLnZ1ZT82MjhhIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0FwcEhlYWRlci52dWU/YmM2YyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9BcHBNYWluLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9BcHBNYWluLnZ1ZT8zNzBlIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0FwcE1haW4udnVlP2FlMmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQXBwTWFpbk1vZGFsLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9BcHBNYWluTW9kYWwudnVlPzcyNWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQXBwTWFpbk1vZGFsLnZ1ZT9jZmNkIl0sIm5hbWVzIjpbIndpbmRvdyIsIlZ1ZSIsInJlcXVpcmUiLCJCdXMiLCJjb25maWciLCJwcm9kdWN0aW9uVGlwIiwicHJvY2VzcyIsImRldnRvb2xzIiwicmVu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QUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFp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O0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLEtBQVUsRUFBRSxZQWlCZjtBQUNEO0FBQ2UsZ0Y7Ozs7Ozs7Ozs7OztBQ3RDZjtBQUFBO0FBQUEsd0NBQXlMLENBQWdCLHFQQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7O0FDQTdNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQXNGO0FBQzNCO0FBQ0w7OztBQUd0RDtBQUM2RjtBQUM3RixnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSw2RUFBTTtBQUNSLEVBQUUsa0ZBQU07QUFDUixFQUFFLDJGQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUF1TCxDQUFnQixtUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0EzTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUEyRjtBQUMzQjtBQUNMOzs7QUFHM0Q7QUFDNkY7QUFDN0YsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsa0ZBQU07QUFDUixFQUFFLHVGQUFNO0FBQ1IsRUFBRSxnR0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBNEwsQ0FBZ0Isd1BBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBaE47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6Ii9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiB2LWNsb2FrPlxuICAgICAgICA8YXBwLWhlYWRlciA6bGFiZWxzPVwibGFiZWxzXCIgOmxhbmd1YWdlcz1cImxhbmd1YWdlc1wiIDpjdXJyZW50LWxhbmd1YWdlPVwiY3VycmVudExhbmd1YWdlXCIgOmlzLWZpbHRlci10b2dnbGVkPVwiaXNGaWx0ZXJUb2dnbGVkXCIgOm5vLXJlcGx5LW9ubHk9XCJub1JlcGx5T25seVwiPjwvYXBwLWhlYWRlcj5cbiAgICAgICAgPGFwcC1tYWluIDpsYWJlbHM9XCJsYWJlbHNcIiA6bm8tcmVwbHktb25seT1cIm5vUmVwbHlPbmx5XCIgOmlzLWZldGNoaW5nPVwiaXNGZXRjaGluZ1wiIDpyZXN1bHRzPVwicmVzdWx0c1wiIDpzaG93LXZpZXctbW9yZT1cInNob3dWaWV3TW9yZVwiPjwvYXBwLW1haW4+XG4gICAgICAgIDxhcHAtbWFpbi1tb2RhbCA6bGFiZWxzPVwibGFiZWxzXCIgOm5vLXJlcGx5LW9ubHk9XCJub1JlcGx5T25seVwiIDpjdXJyZW50LXJlc3VsdD1cImN1cnJlbnRSZXN1bHRcIiB2LWlmPVwiY3VycmVudFJlc3VsdFwiPjwvYXBwLW1haW4tbW9kYWw+XG4gICAgICAgIDxhcHAtZm9vdGVyPjwvYXBwLWZvb3Rlcj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IEFwcEhlYWRlciBmcm9tICcuL0FwcEhlYWRlcic7XG4gICAgaW1wb3J0IEFwcE1haW4gZnJvbSAnLi9BcHBNYWluJztcbiAgICBpbXBvcnQgQXBwTWFpbk1vZGFsIGZyb20gJy4vQXBwTWFpbk1vZGFsJztcbiAgICBpbXBvcnQgQXBwRm9vdGVyIGZyb20gJy4vQXBwRm9vdGVyJztcbiAgICBpbXBvcnQgbGFuZ3VhZ2VzIGZyb20gJy4uL2RhdGEvbGFuZ3VhZ2VzLmpzb24nO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7IEFwcEhlYWRlciwgQXBwTWFpbiwgQXBwTWFpbk1vZGFsLCBBcHBGb290ZXIgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0b3BMYW5ndWFnZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgJ0phdmFTY3JpcHQnLFxuICAgICAgICAgICAgICAgICAgICAnVHlwZVNjcmlwdCcsXG4gICAgICAgICAgICAgICAgICAgICdQeXRob24nLFxuICAgICAgICAgICAgICAgICAgICAnSmF2YScsXG4gICAgICAgICAgICAgICAgICAgICdQSFAnLFxuICAgICAgICAgICAgICAgICAgICAnR28nLFxuICAgICAgICAgICAgICAgICAgICAnSFRNTCcsXG4gICAgICAgICAgICAgICAgICAgICdDKysnLFxuICAgICAgICAgICAgICAgICAgICAnQyMnLFxuICAgICAgICAgICAgICAgICAgICAnUnVieSdcbiAgICAgICAgICAgICAgICBdLFxuXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VzOiBsYW5ndWFnZXMsXG5cbiAgICAgICAgICAgICAgICBsYWJlbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2hhY2t0b2JlcmZlc3QnXG4gICAgICAgICAgICAgICAgXSxcblxuICAgICAgICAgICAgICAgIHJlc3VsdHM6IFtdLFxuICAgICAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICAgICAgY3VycmVudExhbmd1YWdlOiAnJyxcbiAgICAgICAgICAgICAgICBpc0ZpbHRlclRvZ2dsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dWaWV3TW9yZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgbm9SZXBseU9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRSZXN1bHQ6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExhbmd1YWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmd1YWdlJykgfHwgJyc7XG4gICAgICAgICAgICB0aGlzLmxhYmVscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhYmVscycpIHx8IEpTT04uc3RyaW5naWZ5KHRoaXMubGFiZWxzKSk7XG4gICAgICAgICAgICB0aGlzLm5vUmVwbHlPbmx5ID0gKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdub3JlcGx5JykgfHwgJ2ZhbHNlJykgPT09ICd0cnVlJztcblxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZXMuc29ydCgpO1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRJc3N1ZXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgQnVzLiRvbigndG9nZ2xlRmlsdGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRmlsdGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQnVzLiRvbigncmVtb3ZlTGFiZWwnLCAobGFiZWxOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMYWJlbChsYWJlbE5hbWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIEJ1cy4kb24oJ3RvZ2dsZU5vUmVwbHlGaWx0ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVOb1JlcGx5RmlsdGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQnVzLiRvbignY2hvb3NlTGFuZ3VhZ2UnLCAobGFuZ3VhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNob29zZUxhbmd1YWdlKGxhbmd1YWdlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBCdXMuJG9uKCdsb2FkTW9yZUlzc3VlcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNb3JlSXNzdWVzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQnVzLiRvbignYXBwZW5kTGFiZWwnLCAobGFiZWxOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRMYWJlbChsYWJlbE5hbWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIEJ1cy4kb24oJ3RvZ2dsZUlzc3VlJywgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlSXNzdWUocmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBCdXMuJG9uKCdjbG9zZU1vZGFsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGxvYWRJc3N1ZXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Vmlld01vcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmV0Y2hpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vc2VhcmNoL2lzc3Vlcz9wYWdlPSR7dGhpcy5wYWdlfSZxPSR7dGhpcy5maWx0ZXJMYWJlbHN9JHt0aGlzLmZpbHRlckxhbmd1YWdlfSt0eXBlOmlzc3VlK3N0YXRlOm9wZW4ke3RoaXMuZmlsdGVyTm9SZXBseX1gKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gcmVzcG9uc2UuaXRlbXMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7IHJlcG9zaXRvcnlfdXJsLCB1cGRhdGVkX2F0LCAuLi5yZXN0IH0pID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnJlc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9UaXRsZTogcmVwb3NpdG9yeV91cmxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuam9pbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmZvcm1hdHRlZERhdGU6IHRoaXMudW5mb3JtYXREYXRlKHVwZGF0ZWRfYXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWREYXRlOiB0aGlzLmZvcm1hdERhdGUobmV3IERhdGUodXBkYXRlZF9hdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IFsuLi50aGlzLnJlc3VsdHMsIC4uLml0ZW1zXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGEudXBkYXRlZF9hdCkgPiBuZXcgRGF0ZShiLnVwZGF0ZWRfYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3IERhdGUoYi51cGRhdGVkX2F0KSA+IG5ldyBEYXRlKGEudXBkYXRlZF9hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZXdNb3JlID0gdGhpcy5yZXN1bHRzLmxlbmd0aCA8IHJlc3BvbnNlLnRvdGFsX2NvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0ZldGNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWV3TW9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0ZldGNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdW5mb3JtYXREYXRlKHVwZGF0ZWRBdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtuZXcgRGF0ZSh1cGRhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfSAke25ldyBEYXRlKHVwZGF0ZWRBdCkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9YDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGZvcm1hdERhdGUodXBkYXRlZEF0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBNYXRoLnJvdW5kKCgrbmV3IERhdGUgLSB1cGRhdGVkQXQpIC8gMTAwMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWludXRlID0gNjA7XG4gICAgICAgICAgICAgICAgY29uc3QgaG91ciA9IG1pbnV0ZSAqIDYwO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRheSA9IGhvdXIgKiAyNDtcbiAgICAgICAgICAgICAgICBjb25zdCB3ZWVrID0gZGF5ICogNztcbiAgICAgICAgICAgICAgICBjb25zdCBkYXlzSW5ZZWFyID0gdXBkYXRlZEF0LmdldEZ1bGxZZWFyKCkgJSA0MDAgPT09IDAgfHwgKHVwZGF0ZWRBdC5nZXRGdWxsWWVhcigpICUgMTAwICE9PSAwICYmIHVwZGF0ZWRBdC5nZXRGdWxsWWVhcigpICUgNCA9PT0gMCkgPyAzNjYgOiAzNjU7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVsdGEgPCAzMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2p1c3Qgbm93JztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlbHRhIDwgbWludXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWx0YSArICcgc2Vjb25kcyBhZ28nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsdGEgPCAyICogbWludXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYSBtaW51dGUgYWdvJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlbHRhIDwgaG91cikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihkZWx0YSAvIG1pbnV0ZSkgKyAnIG1pbnV0ZXMgYWdvJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguZmxvb3IoZGVsdGEgLyBob3VyKSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYW4gaG91ciBhZ28nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsdGEgPCBkYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoZGVsdGEgLyBob3VyKSArICcgaG91cnMgYWdvJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlbHRhIDwgZGF5ICogMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3llc3RlcmRheSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWx0YSA8IHdlZWspIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdsYXN0IHdlZWsnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsdGEgPCBkYXlzSW5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnbGFzdCB5ZWFyJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bmV3IERhdGUodXBkYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKX0sICR7bmV3IERhdGUodXBkYXRlZEF0KS50b0xvY2FsZVRpbWVTdHJpbmcoKX1gO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbG9hZE1vcmVJc3N1ZXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlKys7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSXNzdWVzKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZWxvYWRJc3N1ZXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclRvZ2dsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWV3TW9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGZXRjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRJc3N1ZXMoKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNob29zZUxhbmd1YWdlKGxhbmd1YWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGFuZ3VhZ2UgPSBsYW5ndWFnZTtcblxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYW5ndWFnZScsIHRoaXMuY3VycmVudExhbmd1YWdlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkSXNzdWVzKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVMYWJlbChsYWJlbE5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIVsnaGFja3RvYmVyZmVzdCddLmluY2x1ZGVzKGxhYmVsTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVscy5zcGxpY2UodGhpcy5sYWJlbHMuaW5kZXhPZihsYWJlbE5hbWUudG9Mb3dlckNhc2UoKSksIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYWJlbHMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmxhYmVscykpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkSXNzdWVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYXBwZW5kTGFiZWwobGFiZWxOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFiZWxzLmluY2x1ZGVzKGxhYmVsTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVscy5zcGxpY2UodGhpcy5sYWJlbHMuaW5kZXhPZihsYWJlbE5hbWUudG9Mb3dlckNhc2UoKSksIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxzLnB1c2gobGFiZWxOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFiZWxzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5sYWJlbHMpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkSXNzdWVzKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpbHRlclRvZ2dsZWQgPSAhdGhpcy5pc0ZpbHRlclRvZ2dsZWQ7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVOb1JlcGx5RmlsdGVyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMubm9SZXBseU9ubHkgPSAhdGhpcy5ub1JlcGx5T25seTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWV3TW9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGZXRjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG5cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbm9yZXBseScsIHRoaXMubm9SZXBseU9ubHkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkSXNzdWVzKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVJc3N1ZShyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbG9zZU1vZGFsKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlSXNzdWUobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIGZpbHRlckxhYmVscygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xhYmVsOicgKyB0aGlzLmxhYmVscy5tYXAobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgXCIke25hbWV9XCJgXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJysnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oJyUyQicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJyMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oJyUyMycpXG4gICAgICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCcrbGFiZWw6Jyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlsdGVyTm9SZXBseSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub1JlcGx5T25seSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJytjb21tZW50czowJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlsdGVyTGFuZ3VhZ2UoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudExhbmd1YWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnK2xhbmd1YWdlOicgKyB0aGlzLmN1cnJlbnRMYW5ndWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCcrJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCclMkInKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCcjJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCclMjMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGZvb3RlciBjbGFzcz1cImJnLXByaW1hcnkgdy1mdWxsIG10LThcIiB2LWNsb2FrPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIG14LWF1dG8gZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtOFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtYW1iZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgVW5vZmZpY2lhbCBzaXRlIGJ5IDxhIGNsYXNzPVwidGV4dC1zZWNvbmRhcnlcIiBocmVmPVwiaHR0cDovL2R1bmNhbi5tY2NsZWFuLmNvLnVrXCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJEdW5jYW4gTWNDbGVhblwiIHJlbD1cIm5vcmVmZXJyZXJcIj5EdW5jYW4gTWNDbGVhbjwvYT4gYW5kIDxhIGNsYXNzPVwidGV4dC1zZWNvbmRhcnlcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2RhbWNjbGVhbi9oYWNrdG9iZXJmZXN0LWZpbmRlci9ibG9iL21hc3Rlci9DT05UUklCVVRPUlMubWRcIiB0YXJnZXQ9XCJfYmxhbmtcIiB0aXRsZT1cImNvbnRyaWJ1dG9yc1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5jb250cmlidXRvcnM8L2E+LiBDb250cmlidXRlIG9uIDxhIGNsYXNzPVwidGV4dC1zZWNvbmRhcnlcIiBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2RhbWNjbGVhbi9oYWNrdG9iZXJmZXN0LWZpbmRlclwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiR2l0SHViIVwiIHJlbD1cIm5vcmVmZXJyZXJcIj5HaXRIdWIhPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm14LTIgdy02IGgtNlwiIGhyZWY9XCJodHRwczovL3d3dy5kaWdpdGFsb2NlYW4uY29tXCIgdGl0bGU9XCJEaWdpdGFsT2NlYW5cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJ3LTYgaC02XCIgc3JjPVwiL2ltYWdlcy9kaWdpdGFsLW9jZWFuLnBuZ1wiIGFsdD1cIkRpZ2l0YWxPY2VhblwiPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm14LTIgdy02IGgtNlwiIGhyZWY9XCJodHRwczovL2Rldi50b1wiIHRpdGxlPVwiREVWXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwidy02IGgtNlwiIHNyYz1cIi9pbWFnZXMvZGV2LnN2Z1wiIGFsdD1cIkRFVlwiPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Zvb3Rlcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge31cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxmaXhlZC1oZWFkZXI+XG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJjb250YWluZXIgbXgtYXV0byBteS02IGZsZXggZmxleC1yb3cgZmxleC13cmFwIGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIiB2LWNsb2FrPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZmxleC1yb3cgZmxleC13cmFwIGl0ZW1zLWNlbnRlciBsb2dvLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9oYWNrdG9iZXJmZXN0LmRpZ2l0YWxvY2Vhbi5jb21cIiB0aXRsZT1cIkhhY2t0b2JlcmZlc3QgMjAxOVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIiBjbGFzcz1cImxvZ28tbGlua1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibXgtYXV0byBtZDp3LTY0IHNtOnctZnVsbCBsb2dvXCIgc3JjPVwiL2ltYWdlcy9oZWFkZXIuc3ZnXCIgYWx0PVwiSGFja3RvYmVyZmVzdCAyMDE5XCI+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInRleHQtNXhsIGZvbnQtYm9sZCB0ZXh0LXByaW1hcnkgdXBwZXJjYXNlIG14LWF1dG8gbXktNCBtZDpteS0wIHRleHQtY2VudGVyIGxvZ28tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgSXNzdWUgRmluZGVyXG4gICAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInctZnVsbCBtZDp3LWF1dG8gZmxleCBmbGV4LXJvdyBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYXJvdW5kIG14LWF1dG8gbXktNFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1wcmltYXJ5IHRleHQtbGcgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgbXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICBGaWx0ZXIgQnk6XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtY29sdW1uIGp1c3RpZnktYXJvdW5kIGl0ZW1zLWNlbnRlciBmaWx0ZXIgcmVsYXRpdmVcIiB2LWNsaWNrLW91dHNpZGU9XCJoaWRlRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidGV4dC1wcmltYXJ5IHRleHQtbGcgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgcmVsYXRpdmUgZm9jdXM6b3V0bGluZS1ub25lXCIgQGNsaWNrPVwidG9nZ2xlRmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW5ndWFnZVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LXNob3c9XCJpc0ZpbHRlclRvZ2dsZWRcIiBjbGFzcz1cImZpbHRlci12YWx1ZXMgZmxleCBmbGV4LWNvbCBiZy1wcmltYXJ5IGFic29sdXRlIHRvcC0wIHJpZ2h0LTAgbXQtMiB3LTQ4IHNoYWRvdy14bCByb3VuZGVkLWxnIG92ZXJmbG93LWhpZGRlbiBvdmVyZmxvdy15LWF1dG8gYm9yZGVyLTIgYm9yZGVyLXByaW1hcnkgYm9yZGVyLXNvbGlkIGgtNjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZm9udC1ib2xkIHRleHQtbWQgcC0yIGxhbmd1YWdlXCIgOmNsYXNzPVwieyAndGV4dC13aGl0ZSBiZy1zZWNvbmRhcnkgaG92ZXI6Ymctc2Vjb25kYXJ5IGhvdmVyOnRleHQtd2hpdGUnOiAhY3VycmVudExhbmd1YWdlLCAndGV4dC1zZWNvbmRhcnkgYmctcHJpbWFyeSBob3ZlcjpiZy1zZWNvbmRhcnkgaG92ZXI6dGV4dC13aGl0ZSc6IGN1cnJlbnRMYW5ndWFnZSB9XCIgQGNsaWNrPVwiY2hvb3NlTGFuZ3VhZ2UoJycpXCI+QW55PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB2LWZvcj1cImxhbmd1YWdlIGluIGxhbmd1YWdlc1wiIGNsYXNzPVwiZm9udC10aGluIHRleHQtc20gcC0yIGxhbmd1YWdlXCIgOmNsYXNzPVwieyAndGV4dC13aGl0ZSBiZy1zZWNvbmRhcnkgaG92ZXI6Ymctc2Vjb25kYXJ5IGhvdmVyOnRleHQtd2hpdGUnOiBjdXJyZW50TGFuZ3VhZ2UgPT09IGxhbmd1YWdlLCAndGV4dC1zZWNvbmRhcnkgYmctcHJpbWFyeSBob3ZlcjpiZy1zZWNvbmRhcnkgaG92ZXI6dGV4dC13aGl0ZSc6IGN1cnJlbnRMYW5ndWFnZSAhPT0gbGFuZ3VhZ2UgfVwiIEBjbGljaz1cImNob29zZUxhbmd1YWdlKGxhbmd1YWdlKVwiIHYtdGV4dD1cImxhbmd1YWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1wcmltYXJ5IHRleHQtbGcgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgbXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICAvXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidGV4dC1wcmltYXJ5IHRleHQtbGcgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgbXgtMiBweC0yIHB5LTEgcm91bmRlZCBib3JkZXItMVwiIDpjbGFzcz1cInsgJ2JnLXByaW1hcnkgdGV4dC1zZWNvbmRhcnknOiBub1JlcGx5T25seSB9XCIgQGNsaWNrPVwidG9nZ2xlTm9SZXBseUZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICBObyBSZXBseVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LXJvdyBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1kOnctNjQgc206dy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInRleHQtcHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwibXItMiBsZWFkaW5nLXRpZ2h0XCIgdHlwZT1cImNoZWNrYm94XCIgdi1tb2RlbD1cImF1dG9SZWZyZXNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdXRvIFJlZnJlc2hcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ0ZXh0LXByaW1hcnkgdGV4dC14cyBmb250LXNlbWlib2xkIG14LTIgbXktMlwiIEBjbGljaz1cInJlZnJlc2hMYW5ndWFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlZnJlc2gpXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXByaW1hcnkgdGV4dC14cyBmb250LXNlbWlib2xkIG14LTIgbXktMlwiIHYtaWY9XCJjdXJyZW50TGFuZ3VhZ2VcIiB2LXRleHQ9XCJgJHtjdXJyZW50TGFuZ3VhZ2V9OmBcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB2LWZvcj1cIm5hbWUgaW4gbGFiZWxzXCIgY2xhc3M9XCJ0ZXh0LWFtYmVyIHRleHQteHMgZm9udC1zZW1pYm9sZCBteC0yIG15LTJcIiBAY2xpY2s9XCJyZW1vdmVMYWJlbChuYW1lKVwiIHYtdGV4dD1cImAjJHtuYW1lLnRvTG93ZXJDYXNlKCl9YFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgIDwvZml4ZWQtaGVhZGVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgRml4ZWRIZWFkZXIgZnJvbSAndnVlLWZpeGVkLWhlYWRlcic7XG4gICAgaW1wb3J0IENsaWNrT3V0c2lkZSBmcm9tICd2dWUtY2xpY2stb3V0c2lkZSc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiBbJ2xhYmVscycsICdsYW5ndWFnZXMnLCAnY3VycmVudExhbmd1YWdlJywgJ2lzRmlsdGVyVG9nZ2xlZCcsICdub1JlcGx5T25seSddLFxuXG4gICAgICAgIGNvbXBvbmVudHM6IHsgRml4ZWRIZWFkZXIgfSxcbiAgICAgICAgZGlyZWN0aXZlczogeyBDbGlja091dHNpZGUgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhdXRvUmVmcmVzaDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXV0b1JlZnJlc2hUaW1lOiAxMDAwICogNjAgKiAxNSwgLy8gMTUgbWludXRlc1xuICAgICAgICAgICAgICAgIGF1dG9UaW1lcjogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICBhdXRvUmVmcmVzaChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXV0by1yZWZyZXNoJywgbmV3VmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsQXV0b1JlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1JlZnJlc2ggPSAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2F1dG8tcmVmcmVzaCcpIHx8ICdmYWxzZScpID09PSAndHJ1ZSc7XG5cbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUmVmcmVzaCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbEF1dG9SZWZyZXNoKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgaGlkZUZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ZpbHRlclRvZ2dsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVGaWx0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVGaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgQnVzLiRlbWl0KCd0b2dnbGVGaWx0ZXInKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZUxhYmVsKGxhYmVsTmFtZSkge1xuICAgICAgICAgICAgICAgIEJ1cy4kZW1pdCgncmVtb3ZlTGFiZWwnLCBsYWJlbE5hbWUpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlTm9SZXBseUZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICBCdXMuJGVtaXQoJ3RvZ2dsZU5vUmVwbHlGaWx0ZXInKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlZnJlc2hMYW5ndWFnZSgpIHtcbiAgICAgICAgICAgICAgICBCdXMuJGVtaXQoJ2Nob29zZUxhbmd1YWdlJywgdGhpcy5jdXJyZW50TGFuZ3VhZ2UpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RhcnRBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9UaW1lciA9IHNldEludGVydmFsKHRoaXMucmVmcmVzaExhbmd1YWdlLCB0aGlzLmF1dG9SZWZyZXNoVGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2FuY2VsQXV0b1JlZnJlc2goKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9UaW1lcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjaG9vc2VMYW5ndWFnZShsYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsQXV0b1JlZnJlc2goKTtcbiAgICAgICAgICAgICAgICBCdXMuJGVtaXQoJ2Nob29zZUxhbmd1YWdlJywgbGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUmVmcmVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPG1haW4gY2xhc3M9XCJjb250YWluZXIgbXgtYXV0byBteS0xMlwiIHYtY2xvYWs+XG4gICAgICAgIDxkaXYgaWQ9XCJyZXN1bHRzXCIgY2xhc3M9XCJncmlkXCI+XG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwicmVzdWx0IGluIHJlc3VsdHNcIiBjbGFzcz1cImJnLXdoaXRlIGhvdmVyOmJnLXBpbmtpc2ggcm91bmRlZC1sZyBwLTIgdGV4dC1ibGFjayBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gb3ZlcmZsb3cteS1hdXRvIHNoYWRvdy1sZyBncmlkLWl0ZW1cIiBAY2xpY2s9XCJ0b2dnbGVJc3N1ZShyZXN1bHQpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZmxleC13cmFwIGZsZXgtcm93IHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB2LWZvcj1cImxhYmVsIGluIHJlc3VsdC5sYWJlbHNcIiBjbGFzcz1cInRleHQtY2VudGVyIHJvdW5kZWQtc20gdGV4dC14cyBweC0yIHB5LTEgbS0xIHNoYWRvdy1tZFwiIDpzdHlsZT1cInsgYmFja2dyb3VuZENvbG9yOiBgIyR7bGFiZWwuY29sb3J9YCB9XCIgOmNsYXNzPVwieyAnZm9udC1ib2xkJzogbGFiZWxzLmluY2x1ZGVzKGxhYmVsLm5hbWUudG9Mb3dlckNhc2UoKSkgfVwiIEBjbGljay5wcmV2ZW50LnN0b3A9XCJhcHBlbmRMYWJlbChsYWJlbC5uYW1lKVwiIHYtdGV4dD1cImxhYmVsLm5hbWUudG9Mb3dlckNhc2UoKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInRleHQtY2VudGVyIHRleHQteGwgbWItNCBmb250LWJvbGRcIiB2LXRleHQ9XCJyZXN1bHQudGl0bGVcIj48L2gyPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInRleHQtY2VudGVyIHRleHQtYmx1ZSB0ZXh0LXNtIG1iLTQgYnJlYWstd29yZHNcIiB2LXRleHQ9XCJgJHtyZXN1bHQudXNlci5sb2dpbn0vJHtyZXN1bHQucmVwb1RpdGxlfWBcIj48L2gzPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxlZnQgYm9yZGVyLWdyYXkgYm9yZGVyLXNvbGlkIGJvcmRlci1sLTQgcGwtMiB0ZXh0LXNtIG1iLTQgdHJ1bmNhdGUgbWF4LXcteHNcIiB2LXRleHQ9XCJyZXN1bHQuYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciB0ZXh0LXhzIG1iLTRcIiA6Y2xhc3M9XCJ7ICd0ZXh0LWFtYmVyJzogIXJlc3VsdC5jb21tZW50cyB9XCIgdi1pZj1cIiFub1JlcGx5T25seVwiIHYtdGV4dD1cInJlc3VsdC5jb21tZW50cyA+IDAgPyBgUmVwbGllczogJHtyZXN1bHQuY29tbWVudHN9YCA6ICdHaW1tZSBHaW1tZSdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1sZWZ0IHRleHQteHMgbWItNFwiIHYtdGV4dD1cImBPcGVuZCBieTogJHtyZXN1bHQudXNlci5sb2dpbn1gXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyIHRleHQteHMgbWItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8dGltZSA6ZGF0ZXRpbWU9XCJyZXN1bHQudW5mb3JtYXR0ZWREYXRlXCIgdi10ZXh0PVwiYExhc3QgdXBkYXRlZDogJHtyZXN1bHQuZm9ybWF0dGVkRGF0ZX1gXCI+PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHYtaWY9XCJzaG93Vmlld01vcmUgfHwgaXNGZXRjaGluZ1wiIGNsYXNzPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbXQtNlwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ1cHBlcmNhc2UgZm9udC10aGluIHRleHQtcHJpbWFyeSBib3JkZXItMiBib3JkZXItcHJpbWFyeSB0ZXh0LTN4bCBiZy1zZWNvbmRhcnkgaG92ZXI6YmctcHJpbWFyeSBob3Zlcjp0ZXh0LXNlY29uZGFyeSBweS0yIHB4LTQgcm91bmRlZFwiIDpkaXNhYmxlZD1cImlzRmV0Y2hpbmdcIiBAY2xpY2s9XCJsb2FkTW9yZUlzc3Vlc1wiIHYtdGV4dD1cImlzRmV0Y2hpbmcgPyAnTG9hZGluZyBNb3JlIElzc3Vlcy4uLicgOiAnTG9hZCBNb3JlIElzc3VlcydcIj48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgdi1lbHNlLWlmPVwicmVzdWx0cy5sZW5ndGggPT09IDBcIiBjbGFzcz1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG10LTZcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1cHBlcmNhc2UgZm9udC10aGluIHRleHQtcHJpbWFyeSB0ZXh0LTN4bCBiZy1zZWNvbmRhcnkgcHktMiBweC00XCI+XG4gICAgICAgICAgICAgICAgTm8gaXNzdWVzIGZvdW5kXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiBbJ2xhYmVscycsICdub1JlcGx5T25seScsICdpc0ZldGNoaW5nJywgJ3Jlc3VsdHMnLCAnc2hvd1ZpZXdNb3JlJ10sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgbG9hZE1vcmVJc3N1ZXMoKSB7XG4gICAgICAgICAgICAgICAgQnVzLiRlbWl0KCdsb2FkTW9yZUlzc3VlcycpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYXBwZW5kTGFiZWwobGFiZWxOYW1lKSB7XG4gICAgICAgICAgICAgICAgQnVzLiRlbWl0KCdhcHBlbmRMYWJlbCcsIGxhYmVsTmFtZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVJc3N1ZShyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBCdXMuJGVtaXQoJ3RvZ2dsZUlzc3VlJywgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxzZWN0aW9uIGNsYXNzPVwiZ3JpZC1pdGVtLWNvbnRhaW5lciBmaXhlZCB0b3AtMCBib3R0b20tMCBsZWZ0LTAgcmlnaHQtMCBtYXgtdy1mdWxsIGgtZnVsbFwiIEBjbGljaz1cImNsb3NlTW9kYWxcIiB2LWNsb2FrPlxuICAgICAgICA8YSA6aHJlZj1cImN1cnJlbnRSZXN1bHQuaHRtbF91cmxcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImJnLXdoaXRlIGhvdmVyOmJnLXBpbmtpc2ggcm91bmRlZC1sZyBwLTIgdGV4dC1ibGFjayBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gb3ZlcmZsb3cteS1hdXRvIHNoYWRvdy1sZyBncmlkLWl0ZW0gbWF4LXctbWQgbXgtYXV0b1wiIDp0aXRsZT1cImN1cnJlbnRSZXN1bHQudGl0bGVcIiBAY2xpY2sucHJldmVudC5zdG9wPVwib3BlbldpbmRvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZmxleC13cmFwIGZsZXgtcm93IHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIHYtZm9yPVwibGFiZWwgaW4gY3VycmVudFJlc3VsdC5sYWJlbHNcIiBjbGFzcz1cInRleHQtY2VudGVyIHJvdW5kZWQtc20gdGV4dC14cyBweC0yIHB5LTEgbS0xIHNoYWRvdy1tZFwiIDpzdHlsZT1cInsgYmFja2dyb3VuZENvbG9yOiBgIyR7bGFiZWwuY29sb3J9YCB9XCIgOmNsYXNzPVwieyAnZm9udC1ib2xkJzogbGFiZWxzLmluY2x1ZGVzKGxhYmVsLm5hbWUudG9Mb3dlckNhc2UoKSkgfVwiIHYtdGV4dD1cImxhYmVsLm5hbWUudG9Mb3dlckNhc2UoKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC14bCBtYi00IGZvbnQtYm9sZFwiIHYtdGV4dD1cImN1cnJlbnRSZXN1bHQudGl0bGVcIj48L2gyPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC1ibHVlIHRleHQtc20gbWItNCBicmVhay13b3Jkc1wiIHYtdGV4dD1cImAke2N1cnJlbnRSZXN1bHQudXNlci5sb2dpbn0vJHtjdXJyZW50UmVzdWx0LnJlcG9UaXRsZX1gXCI+PC9oMz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxlZnQgYm9yZGVyLWdyYXkgYm9yZGVyLXNvbGlkIGJvcmRlci1sLTQgcGwtMiB0ZXh0LXNtIG1iLTQgb3ZlcmZsb3ctaGlkZGVuIG92ZXJmbG93LXktc2Nyb2xsIG1heC13LXNtIHdoaXRlc3BhY2UtcHJlLXdyYXAgaC1mdWxsXCIgdi10ZXh0PVwiY3VycmVudFJlc3VsdC5ib2R5XCIgc3R5bGU9XCJtYXgtaGVpZ2h0OiAxNHJlbTtcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciB0ZXh0LXhzIG1iLTRcIiA6Y2xhc3M9XCJ7ICd0ZXh0LWFtYmVyJzogIWN1cnJlbnRSZXN1bHQuY29tbWVudHMgfVwiIHYtaWY9XCIhbm9SZXBseU9ubHlcIiB2LXRleHQ9XCJjdXJyZW50UmVzdWx0LmNvbW1lbnRzID4gMCA/IGBSZXBsaWVzOiAke2N1cnJlbnRSZXN1bHQuY29tbWVudHN9YCA6ICdHaW1tZSBHaW1tZSdcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWxlZnQgdGV4dC14cyBtYi00XCIgdi10ZXh0PVwiYE9wZW5kIGJ5OiAke2N1cnJlbnRSZXN1bHQudXNlci5sb2dpbn1gXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC14cyBtYi00XCI+XG4gICAgICAgICAgICAgICAgPHRpbWUgOmRhdGV0aW1lPVwiY3VycmVudFJlc3VsdC51bmZvcm1hdHRlZERhdGVcIiB2LXRleHQ9XCJgTGFzdCB1cGRhdGVkOiAke2N1cnJlbnRSZXN1bHQuZm9ybWF0dGVkRGF0ZX1gXCI+PC90aW1lPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYT5cbiAgICA8L3NlY3Rpb24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IFsnbGFiZWxzJywgJ25vUmVwbHlPbmx5JywgJ2N1cnJlbnRSZXN1bHQnXSxcblxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5lc2NhcGVNb2RhbCwgZmFsc2UpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuZXNjYXBlTW9kYWwsIGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBlc2NhcGVNb2RhbChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICgoZXZlbnQua2V5ID09PSAnRXNjYXBlJyB8fCBldmVudC5rZXkgPT09ICdFc2MnIHx8IGV2ZW50LmtleUNvZGUgPT09IDI3KSAmJiAoZXZlbnQudGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdib2R5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgICAgICAgICBCdXMuJGVtaXQoJ2Nsb3NlTW9kYWwnKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9wZW5XaW5kb3coKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odGhpcy5jdXJyZW50UmVzdWx0Lmh0bWxfdXJsLCAnaG9mV2luZG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG4iLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcbiIsImZ1bmN0aW9uIHZhbGlkYXRlKGJpbmRpbmcpIHtcclxuICBpZiAodHlwZW9mIGJpbmRpbmcudmFsdWUgIT09ICdmdW5jdGlvbicpIHtcclxuICAgIGNvbnNvbGUud2FybignW1Z1ZS1jbGljay1vdXRzaWRlOl0gcHJvdmlkZWQgZXhwcmVzc2lvbicsIGJpbmRpbmcuZXhwcmVzc2lvbiwgJ2lzIG5vdCBhIGZ1bmN0aW9uLicpXHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUG9wdXAocG9wdXBJdGVtLCBlbGVtZW50cykge1xyXG4gIGlmICghcG9wdXBJdGVtIHx8ICFlbGVtZW50cylcclxuICAgIHJldHVybiBmYWxzZVxyXG5cclxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChwb3B1cEl0ZW0uY29udGFpbnMoZWxlbWVudHNbaV0pKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWxlbWVudHNbaV0uY29udGFpbnMocG9wdXBJdGVtKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsc2VcclxufVxyXG5cclxuZnVuY3Rpb24gaXNTZXJ2ZXIodk5vZGUpIHtcclxuICByZXR1cm4gdHlwZW9mIHZOb2RlLmNvbXBvbmVudEluc3RhbmNlICE9PSAndW5kZWZpbmVkJyAmJiB2Tm9kZS5jb21wb25lbnRJbnN0YW5jZS4kaXNTZXJ2ZXJcclxufVxyXG5cclxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGJpbmQ6IGZ1bmN0aW9uIChlbCwgYmluZGluZywgdk5vZGUpIHtcclxuICAgIGlmICghdmFsaWRhdGUoYmluZGluZykpIHJldHVyblxyXG5cclxuICAgIC8vIERlZmluZSBIYW5kbGVyIGFuZCBjYWNoZSBpdCBvbiB0aGUgZWxlbWVudFxyXG4gICAgZnVuY3Rpb24gaGFuZGxlcihlKSB7XHJcbiAgICAgIGlmICghdk5vZGUuY29udGV4dCkgcmV0dXJuXHJcblxyXG4gICAgICAvLyBzb21lIGNvbXBvbmVudHMgbWF5IGhhdmUgcmVsYXRlZCBwb3B1cCBpdGVtLCBvbiB3aGljaCB3ZSBzaGFsbCBwcmV2ZW50IHRoZSBjbGljayBvdXRzaWRlIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgIHZhciBlbGVtZW50cyA9IGUucGF0aCB8fCAoZS5jb21wb3NlZFBhdGggJiYgZS5jb21wb3NlZFBhdGgoKSlcclxuICAgICAgZWxlbWVudHMgJiYgZWxlbWVudHMubGVuZ3RoID4gMCAmJiBlbGVtZW50cy51bnNoaWZ0KGUudGFyZ2V0KVxyXG4gICAgICBcclxuICAgICAgaWYgKGVsLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBpc1BvcHVwKHZOb2RlLmNvbnRleHQucG9wdXBJdGVtLCBlbGVtZW50cykpIHJldHVyblxyXG5cclxuICAgICAgZWwuX192dWVDbGlja091dHNpZGVfXy5jYWxsYmFjayhlKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBFdmVudCBMaXN0ZW5lcnNcclxuICAgIGVsLl9fdnVlQ2xpY2tPdXRzaWRlX18gPSB7XHJcbiAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXHJcbiAgICAgIGNhbGxiYWNrOiBiaW5kaW5nLnZhbHVlXHJcbiAgICB9XHJcbiAgICAhaXNTZXJ2ZXIodk5vZGUpICYmIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcilcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uIChlbCwgYmluZGluZykge1xyXG4gICAgaWYgKHZhbGlkYXRlKGJpbmRpbmcpKSBlbC5fX3Z1ZUNsaWNrT3V0c2lkZV9fLmNhbGxiYWNrID0gYmluZGluZy52YWx1ZVxyXG4gIH0sXHJcbiAgXHJcbiAgdW5iaW5kOiBmdW5jdGlvbiAoZWwsIGJpbmRpbmcsIHZOb2RlKSB7XHJcbiAgICAvLyBSZW1vdmUgRXZlbnQgTGlzdGVuZXJzXHJcbiAgICAhaXNTZXJ2ZXIodk5vZGUpICYmIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWwuX192dWVDbGlja091dHNpZGVfXy5oYW5kbGVyKVxyXG4gICAgZGVsZXRlIGVsLl9fdnVlQ2xpY2tPdXRzaWRlX19cclxuICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPVxuLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vKioqKioqLyBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vKioqKioqLyBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuLyoqKioqKi8gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4vKioqKioqLyBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuLyoqKioqKi8gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4vKioqKioqLyBcdFx0cmV0dXJuIG5zO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcImZiMTVcIik7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovICh7XG5cbi8qKiovIFwiMDFmOVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIExJQlJBUlkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmQwMFwiKTtcbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjVjYTFcIik7XG52YXIgcmVkZWZpbmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmFiYVwiKTtcbnZhciBoaWRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjMyZTlcIik7XG52YXIgSXRlcmF0b3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjg0ZjJcIik7XG52YXIgJGl0ZXJDcmVhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNDFhMFwiKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3ZjIwXCIpO1xudmFyIGdldFByb3RvdHlwZU9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjM4ZmRcIik7XG52YXIgSVRFUkFUT1IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmI0Y1wiKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiB0eXBlb2YgSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIwMmY0XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciB0b0ludGVnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNDU4OFwiKTtcbnZhciBkZWZpbmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImJlMTNcIik7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjAzOTBcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhdCA9IF9fd2VicGFja19yZXF1aXJlX18oXCIwMmY0XCIpKHRydWUpO1xuXG4gLy8gYEFkdmFuY2VTdHJpbmdJbmRleGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hZHZhbmNlc3RyaW5naW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFMsIGluZGV4LCB1bmljb2RlKSB7XG4gIHJldHVybiBpbmRleCArICh1bmljb2RlID8gYXQoUywgaW5kZXgpLmxlbmd0aCA6IDEpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIwYTQ5XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiOWI0M1wiKTtcbnZhciBJT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjYyNmFcIik7XG52YXIgdG9PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNGJmOFwiKTtcbnZhciB0b0xlbmd0aCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI5ZGVmXCIpO1xudmFyIGFzYyA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjZDFjXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVFlQRSwgJGNyZWF0ZSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHZhciBjcmVhdGUgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSU9iamVjdChPKTtcbiAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbCwgcmVzO1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgcmVzdWx0W2luZGV4XSA9IHJlczsgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzKSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcmVzdWx0LnB1c2godmFsKTsgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYgKElTX0VWRVJZKSByZXR1cm4gZmFsc2U7IC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjBiZmJcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzXG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiY2I3Y1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGhhdCA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICh0aGF0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYgKHRoYXQubXVsdGlsaW5lKSByZXN1bHQgKz0gJ20nO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjBjZDhcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjVjYTFcIik7XG52YXIgJHJlZHVjZSA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3YjIzXCIpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmYyMVwiKShbXS5yZWR1Y2UsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xOCAvIDE1LjQuNC4yMSBBcnJheS5wcm90b3R5cGUucmVkdWNlKGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcbiAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICAgIHJldHVybiAkcmVkdWNlKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50c1sxXSwgZmFsc2UpO1xuICB9XG59KTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIwZDU4XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImNlMTBcIik7XG52YXIgZW51bUJ1Z0tleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZTExZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiMTE2OVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyZDk1XCIpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIxMWU5XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBwSUUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNTJhN1wiKTtcbnZhciBjcmVhdGVEZXNjID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjQ2MzBcIik7XG52YXIgdG9JT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjY4MjFcIik7XG52YXIgdG9QcmltaXRpdmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNmE5OVwiKTtcbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNjlhOFwiKTtcbnZhciBJRThfRE9NX0RFRklORSA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjNjlhXCIpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiOWUxZVwiKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiMTQ5NVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZFAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiODZjY1wiKTtcbnZhciBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjYjdjXCIpO1xudmFyIGdldEtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMGQ1OFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiOWUxZVwiKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIxOTkxXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBjdHggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiOWI0M1wiKTtcbnZhciBpbnZva2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMzFmNFwiKTtcbnZhciBodG1sID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImZhYjJcIik7XG52YXIgY2VsID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjIzMGVcIik7XG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjc3MjZcIik7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHNldFRhc2sgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyVGFzayA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgaWYgKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spIHtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKF9fd2VicGFja19yZXF1aXJlX18oXCIyZDk1XCIpKHByb2Nlc3MpID09ICdwcm9jZXNzJykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCkge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiMWZhOFwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiY2I3Y1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIyMTRmXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiYjBjNVwiKTtcbnZhciByZWRlZmluZSA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyYWJhXCIpO1xudmFyIGhpZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMzJlOVwiKTtcbnZhciBmYWlscyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3OWU1XCIpO1xudmFyIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiYmUxM1wiKTtcbnZhciB3a3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmI0Y1wiKTtcbnZhciByZWdleHBFeGVjID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjUyMGFcIik7XG5cbnZhciBTUEVDSUVTID0gd2tzKCdzcGVjaWVzJyk7XG5cbnZhciBSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vICNyZXBsYWNlIG5lZWRzIGJ1aWx0LWluIHN1cHBvcnQgZm9yIG5hbWVkIGdyb3Vwcy5cbiAgLy8gI21hdGNoIHdvcmtzIGZpbmUgYmVjYXVzZSBpdCBqdXN0IHJldHVybiB0aGUgZXhlYyByZXN1bHRzLCBldmVuIGlmIGl0IGhhc1xuICAvLyBhIFwiZ3JvcHNcIiBwcm9wZXJ0eS5cbiAgdmFyIHJlID0gLy4vO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICByZXN1bHQuZ3JvdXBzID0geyBhOiAnNycgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICByZXR1cm4gJycucmVwbGFjZShyZSwgJyQ8YT4nKSAhPT0gJzcnO1xufSk7XG5cbnZhciBTUExJVF9XT1JLU19XSVRIX09WRVJXUklUVEVOX0VYRUMgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgNTEgaGFzIGEgYnVnZ3kgXCJzcGxpdFwiIGltcGxlbWVudGF0aW9uIHdoZW4gUmVnRXhwI2V4ZWMgIT09IG5hdGl2ZUV4ZWNcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoID09PSAyICYmIHJlc3VsdFswXSA9PT0gJ2EnICYmIHJlc3VsdFsxXSA9PT0gJ2InO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBsZW5ndGgsIGV4ZWMpIHtcbiAgdmFyIFNZTUJPTCA9IHdrcyhLRVkpO1xuXG4gIHZhciBERUxFR0FURVNfVE9fU1lNQk9MID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTdHJpbmcgbWV0aG9kcyBjYWxsIHN5bWJvbC1uYW1lZCBSZWdFcCBtZXRob2RzXG4gICAgdmFyIE8gPSB7fTtcbiAgICBPW1NZTUJPTF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9O1xuICAgIHJldHVybiAnJ1tLRVldKE8pICE9IDc7XG4gIH0pO1xuXG4gIHZhciBERUxFR0FURVNfVE9fRVhFQyA9IERFTEVHQVRFU19UT19TWU1CT0wgPyAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN5bWJvbC1uYW1lZCBSZWdFeHAgbWV0aG9kcyBjYWxsIC5leGVjXG4gICAgdmFyIGV4ZWNDYWxsZWQgPSBmYWxzZTtcbiAgICB2YXIgcmUgPSAvYS87XG4gICAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgZXhlY0NhbGxlZCA9IHRydWU7IHJldHVybiBudWxsOyB9O1xuICAgIGlmIChLRVkgPT09ICdzcGxpdCcpIHtcbiAgICAgIC8vIFJlZ0V4cFtAQHNwbGl0XSBkb2Vzbid0IGNhbGwgdGhlIHJlZ2V4J3MgZXhlYyBtZXRob2QsIGJ1dCBmaXJzdCBjcmVhdGVzXG4gICAgICAvLyBhIG5ldyBvbmUuIFdlIG5lZWQgdG8gcmV0dXJuIHRoZSBwYXRjaGVkIHJlZ2V4IHdoZW4gY3JlYXRpbmcgdGhlIG5ldyBvbmUuXG4gICAgICByZS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgICAgcmUuY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZTsgfTtcbiAgICB9XG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KSA6IHVuZGVmaW5lZDtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICAoS0VZID09PSAncmVwbGFjZScgJiYgIVJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTKSB8fFxuICAgIChLRVkgPT09ICdzcGxpdCcgJiYgIVNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQylcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBmbnMgPSBleGVjKFxuICAgICAgZGVmaW5lZCxcbiAgICAgIFNZTUJPTCxcbiAgICAgICcnW0tFWV0sXG4gICAgICBmdW5jdGlvbiBtYXliZUNhbGxOYXRpdmUobmF0aXZlTWV0aG9kLCByZWdleHAsIHN0ciwgYXJnMiwgZm9yY2VTdHJpbmdNZXRob2QpIHtcbiAgICAgICAgaWYgKHJlZ2V4cC5leGVjID09PSByZWdleHBFeGVjKSB7XG4gICAgICAgICAgaWYgKERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgICAgICAvLyBUaGUgbmF0aXZlIFN0cmluZyBtZXRob2QgYWxyZWFkeSBkZWxlZ2F0ZXMgdG8gQEBtZXRob2QgKHRoaXNcbiAgICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAgIC8vIFdlIGF2b2lkIGl0IGJ5IGRpcmVjdGx5IGNhbGxpbmcgdGhlIG5hdGl2ZSBAQG1ldGhvZCBtZXRob2QuXG4gICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlUmVnRXhwTWV0aG9kLmNhbGwocmVnZXhwLCBzdHIsIGFyZzIpIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVNZXRob2QuY2FsbChzdHIsIHJlZ2V4cCwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgICAgfVxuICAgICk7XG4gICAgdmFyIHN0cmZuID0gZm5zWzBdO1xuICAgIHZhciByeGZuID0gZm5zWzFdO1xuXG4gICAgcmVkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBzdHJmbik7XG4gICAgaGlkZShSZWdFeHAucHJvdG90eXBlLCBTWU1CT0wsIGxlbmd0aCA9PSAyXG4gICAgICAvLyAyMS4yLjUuOCBSZWdFeHAucHJvdG90eXBlW0BAcmVwbGFjZV0oc3RyaW5nLCByZXBsYWNlVmFsdWUpXG4gICAgICAvLyAyMS4yLjUuMTEgUmVnRXhwLnByb3RvdHlwZVtAQHNwbGl0XShzdHJpbmcsIGxpbWl0KVxuICAgICAgPyBmdW5jdGlvbiAoc3RyaW5nLCBhcmcpIHsgcmV0dXJuIHJ4Zm4uY2FsbChzdHJpbmcsIHRoaXMsIGFyZyk7IH1cbiAgICAgIC8vIDIxLjIuNS42IFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF0oc3RyaW5nKVxuICAgICAgLy8gMjEuMi41LjkgUmVnRXhwLnByb3RvdHlwZVtAQHNlYXJjaF0oc3RyaW5nKVxuICAgICAgOiBmdW5jdGlvbiAoc3RyaW5nKSB7IHJldHVybiByeGZuLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiMjMwZVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDNmNFwiKTtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3NzI2XCIpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIyM2M2XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjJkOTVcIik7XG52YXIgVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjJiNGNcIikoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIyN2VlXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBjbGFzc29mID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjIzYzZcIik7XG52YXIgSVRFUkFUT1IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmI0Y1wiKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiODRmMlwiKTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjgzNzhcIikuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIyOGE1XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBpc1JlZ0V4cCA9IF9fd2VicGFja19yZXF1aXJlX18oXCJhYWUzXCIpO1xudmFyIGFuT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImNiN2NcIik7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImViZDZcIik7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjAzOTBcIik7XG52YXIgdG9MZW5ndGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiOWRlZlwiKTtcbnZhciBjYWxsUmVnRXhwRXhlYyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI1ZjFiXCIpO1xudmFyIHJlZ2V4cEV4ZWMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNTIwYVwiKTtcbnZhciBmYWlscyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3OWU1XCIpO1xudmFyICRtaW4gPSBNYXRoLm1pbjtcbnZhciAkcHVzaCA9IFtdLnB1c2g7XG52YXIgJFNQTElUID0gJ3NwbGl0JztcbnZhciBMRU5HVEggPSAnbGVuZ3RoJztcbnZhciBMQVNUX0lOREVYID0gJ2xhc3RJbmRleCc7XG52YXIgTUFYX1VJTlQzMiA9IDB4ZmZmZmZmZmY7XG5cbi8vIGJhYmVsLW1pbmlmeSB0cmFuc3BpbGVzIFJlZ0V4cCgneCcsICd5JykgLT4gL3gveSBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgU1VQUE9SVFNfWSA9ICFmYWlscyhmdW5jdGlvbiAoKSB7IFJlZ0V4cChNQVhfVUlOVDMyLCAneScpOyB9KTtcblxuLy8gQEBzcGxpdCBsb2dpY1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIjIxNGZcIikoJ3NwbGl0JywgMiwgZnVuY3Rpb24gKGRlZmluZWQsIFNQTElULCAkc3BsaXQsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICB2YXIgaW50ZXJuYWxTcGxpdDtcbiAgaWYgKFxuICAgICdhYmJjJ1skU1BMSVRdKC8oYikqLylbMV0gPT0gJ2MnIHx8XG4gICAgJ3Rlc3QnWyRTUExJVF0oLyg/OikvLCAtMSlbTEVOR1RIXSAhPSA0IHx8XG4gICAgJ2FiJ1skU1BMSVRdKC8oPzphYikqLylbTEVOR1RIXSAhPSAyIHx8XG4gICAgJy4nWyRTUExJVF0oLyguPykoLj8pLylbTEVOR1RIXSAhPSA0IHx8XG4gICAgJy4nWyRTUExJVF0oLygpKCkvKVtMRU5HVEhdID4gMSB8fFxuICAgICcnWyRTUExJVF0oLy4/LylbTEVOR1RIXVxuICApIHtcbiAgICAvLyBiYXNlZCBvbiBlczUtc2hpbSBpbXBsZW1lbnRhdGlvbiwgbmVlZCB0byByZXdvcmsgaXRcbiAgICBpbnRlcm5hbFNwbGl0ID0gZnVuY3Rpb24gKHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgICBpZiAoc2VwYXJhdG9yID09PSB1bmRlZmluZWQgJiYgbGltaXQgPT09IDApIHJldHVybiBbXTtcbiAgICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgbmF0aXZlIHNwbGl0XG4gICAgICBpZiAoIWlzUmVnRXhwKHNlcGFyYXRvcikpIHJldHVybiAkc3BsaXQuY2FsbChzdHJpbmcsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgdmFyIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IubXVsdGlsaW5lID8gJ20nIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IudW5pY29kZSA/ICd1JyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLnN0aWNreSA/ICd5JyA6ICcnKTtcbiAgICAgIHZhciBsYXN0TGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBzcGxpdExpbWl0ID0gbGltaXQgPT09IHVuZGVmaW5lZCA/IE1BWF9VSU5UMzIgOiBsaW1pdCA+Pj4gMDtcbiAgICAgIC8vIE1ha2UgYGdsb2JhbGAgYW5kIGF2b2lkIGBsYXN0SW5kZXhgIGlzc3VlcyBieSB3b3JraW5nIHdpdGggYSBjb3B5XG4gICAgICB2YXIgc2VwYXJhdG9yQ29weSA9IG5ldyBSZWdFeHAoc2VwYXJhdG9yLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuICAgICAgdmFyIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGg7XG4gICAgICB3aGlsZSAobWF0Y2ggPSByZWdleHBFeGVjLmNhbGwoc2VwYXJhdG9yQ29weSwgc3RyaW5nKSkge1xuICAgICAgICBsYXN0SW5kZXggPSBzZXBhcmF0b3JDb3B5W0xBU1RfSU5ERVhdO1xuICAgICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICAgIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAgIGlmIChtYXRjaFtMRU5HVEhdID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0cmluZ1tMRU5HVEhdKSAkcHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF1bTEVOR1RIXTtcbiAgICAgICAgICBsYXN0TGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICAgIGlmIChvdXRwdXRbTEVOR1RIXSA+PSBzcGxpdExpbWl0KSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VwYXJhdG9yQ29weVtMQVNUX0lOREVYXSA9PT0gbWF0Y2guaW5kZXgpIHNlcGFyYXRvckNvcHlbTEFTVF9JTkRFWF0rKzsgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcFxuICAgICAgfVxuICAgICAgaWYgKGxhc3RMYXN0SW5kZXggPT09IHN0cmluZ1tMRU5HVEhdKSB7XG4gICAgICAgIGlmIChsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3JDb3B5LnRlc3QoJycpKSBvdXRwdXQucHVzaCgnJyk7XG4gICAgICB9IGVsc2Ugb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXRbTEVOR1RIXSA+IHNwbGl0TGltaXQgPyBvdXRwdXQuc2xpY2UoMCwgc3BsaXRMaW1pdCkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYgKCcwJ1skU1BMSVRdKHVuZGVmaW5lZCwgMClbTEVOR1RIXSkge1xuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgcmV0dXJuIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkICYmIGxpbWl0ID09PSAwID8gW10gOiAkc3BsaXQuY2FsbCh0aGlzLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGludGVybmFsU3BsaXQgPSAkc3BsaXQ7XG4gIH1cblxuICByZXR1cm4gW1xuICAgIC8vIGBTdHJpbmcucHJvdG90eXBlLnNwbGl0YCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnNwbGl0XG4gICAgZnVuY3Rpb24gc3BsaXQoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgdmFyIE8gPSBkZWZpbmVkKHRoaXMpO1xuICAgICAgdmFyIHNwbGl0dGVyID0gc2VwYXJhdG9yID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlcGFyYXRvcltTUExJVF07XG4gICAgICByZXR1cm4gc3BsaXR0ZXIgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHNwbGl0dGVyLmNhbGwoc2VwYXJhdG9yLCBPLCBsaW1pdClcbiAgICAgICAgOiBpbnRlcm5hbFNwbGl0LmNhbGwoU3RyaW5nKE8pLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAc3BsaXRcbiAgICAvL1xuICAgIC8vIE5PVEU6IFRoaXMgY2Fubm90IGJlIHByb3Blcmx5IHBvbHlmaWxsZWQgaW4gZW5naW5lcyB0aGF0IGRvbid0IHN1cHBvcnRcbiAgICAvLyB0aGUgJ3knIGZsYWcuXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCwgbGltaXQpIHtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUoaW50ZXJuYWxTcGxpdCwgcmVnZXhwLCB0aGlzLCBsaW1pdCwgaW50ZXJuYWxTcGxpdCAhPT0gJHNwbGl0KTtcbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcblxuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QocmVnZXhwKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHRoaXMpO1xuICAgICAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IocngsIFJlZ0V4cCk7XG5cbiAgICAgIHZhciB1bmljb2RlTWF0Y2hpbmcgPSByeC51bmljb2RlO1xuICAgICAgdmFyIGZsYWdzID0gKHJ4Lmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJ4Lm11bHRpbGluZSA/ICdtJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocngudW5pY29kZSA/ICd1JyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoU1VQUE9SVFNfWSA/ICd5JyA6ICdnJyk7XG5cbiAgICAgIC8vIF4oPyArIHJ4ICsgKSBpcyBuZWVkZWQsIGluIGNvbWJpbmF0aW9uIHdpdGggc29tZSBTIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICB2YXIgc3BsaXR0ZXIgPSBuZXcgQyhTVVBQT1JUU19ZID8gcnggOiAnXig/OicgKyByeC5zb3VyY2UgKyAnKScsIGZsYWdzKTtcbiAgICAgIHZhciBsaW0gPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gTUFYX1VJTlQzMiA6IGxpbWl0ID4+PiAwO1xuICAgICAgaWYgKGxpbSA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgaWYgKFMubGVuZ3RoID09PSAwKSByZXR1cm4gY2FsbFJlZ0V4cEV4ZWMoc3BsaXR0ZXIsIFMpID09PSBudWxsID8gW1NdIDogW107XG4gICAgICB2YXIgcCA9IDA7XG4gICAgICB2YXIgcSA9IDA7XG4gICAgICB2YXIgQSA9IFtdO1xuICAgICAgd2hpbGUgKHEgPCBTLmxlbmd0aCkge1xuICAgICAgICBzcGxpdHRlci5sYXN0SW5kZXggPSBTVVBQT1JUU19ZID8gcSA6IDA7XG4gICAgICAgIHZhciB6ID0gY2FsbFJlZ0V4cEV4ZWMoc3BsaXR0ZXIsIFNVUFBPUlRTX1kgPyBTIDogUy5zbGljZShxKSk7XG4gICAgICAgIHZhciBlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgeiA9PT0gbnVsbCB8fFxuICAgICAgICAgIChlID0gJG1pbih0b0xlbmd0aChzcGxpdHRlci5sYXN0SW5kZXggKyAoU1VQUE9SVFNfWSA/IDAgOiBxKSksIFMubGVuZ3RoKSkgPT09IHBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcSA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCBxLCB1bmljb2RlTWF0Y2hpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEEucHVzaChTLnNsaWNlKHAsIHEpKTtcbiAgICAgICAgICBpZiAoQS5sZW5ndGggPT09IGxpbSkgcmV0dXJuIEE7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gei5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIEEucHVzaCh6W2ldKTtcbiAgICAgICAgICAgIGlmIChBLmxlbmd0aCA9PT0gbGltKSByZXR1cm4gQTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcSA9IHAgPSBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBBLnB1c2goUy5zbGljZShwKSk7XG4gICAgICByZXR1cm4gQTtcbiAgICB9XG4gIF07XG59KTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIyYWJhXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNzcyNlwiKTtcbnZhciBoaWRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjMyZTlcIik7XG52YXIgaGFzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjY5YThcIik7XG52YXIgU1JDID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImNhNWFcIikoJ3NyYycpO1xudmFyICR0b1N0cmluZyA9IF9fd2VicGFja19yZXF1aXJlX18oXCJmYTViXCIpO1xudmFyIFRPX1NUUklORyA9ICd0b1N0cmluZyc7XG52YXIgVFBMID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiODM3OFwiKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiAkdG9TdHJpbmcuY2FsbChpdCk7XG59O1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWwsIHNhZmUpIHtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCAnbmFtZScpIHx8IGhpZGUodmFsLCAnbmFtZScsIGtleSk7XG4gIGlmIChPW2tleV0gPT09IHZhbCkgcmV0dXJuO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSBpZiAoIXNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9IGVsc2UgaWYgKE9ba2V5XSkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfVxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjJhZWJcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiY2I3Y1wiKTtcbnZhciBkUHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMTQ5NVwiKTtcbnZhciBlbnVtQnVnS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oXCJlMTFlXCIpO1xudmFyIElFX1BST1RPID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjYxM2JcIikoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjIzMGVcIikoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIF9fd2VicGFja19yZXF1aXJlX18oXCJmYWIyXCIpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIyYjRjXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBzdG9yZSA9IF9fd2VicGFja19yZXF1aXJlX18oXCI1NTM3XCIpKCd3a3MnKTtcbnZhciB1aWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiY2E1YVwiKTtcbnZhciBTeW1ib2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNzcyNlwiKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIyY2FmXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDIyLjEuMi4yIC8gMTUuNC4zLjIgQXJyYXkuaXNBcnJheShhcmcpXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI1Y2ExXCIpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ0FycmF5JywgeyBpc0FycmF5OiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMTE2OVwiKSB9KTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIyZDAwXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiMmQ5NVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiMmYyMVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGZhaWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjc5ZTVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbFxuICAgIGFyZyA/IG1ldGhvZC5jYWxsKG51bGwsIGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgMSkgOiBtZXRob2QuY2FsbChudWxsKTtcbiAgfSk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjJmZGJcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG4vLyAyMS4xLjMuNyBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKHNlYXJjaFN0cmluZywgcG9zaXRpb24gPSAwKVxuXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI1Y2ExXCIpO1xudmFyIGNvbnRleHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDJjOFwiKTtcbnZhciBJTkNMVURFUyA9ICdpbmNsdWRlcyc7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogX193ZWJwYWNrX3JlcXVpcmVfXyhcIjUxNDdcIikoSU5DTFVERVMpLCAnU3RyaW5nJywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qICwgcG9zaXRpb24gPSAwICovKSB7XG4gICAgcmV0dXJuICEhfmNvbnRleHQodGhpcywgc2VhcmNoU3RyaW5nLCBJTkNMVURFUylcbiAgICAgIC5pbmRleE9mKHNlYXJjaFN0cmluZywgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIzMWY0XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIzMmU5XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkUCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI4NmNjXCIpO1xudmFyIGNyZWF0ZURlc2MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNDYzMFwiKTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjllMWVcIikgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIzM2E0XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiODRmMlwiKTtcbnZhciBJVEVSQVRPUiA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyYjRjXCIpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjM4ZmRcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNjlhOFwiKTtcbnZhciB0b09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI0YmY4XCIpO1xudmFyIElFX1BST1RPID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjYxM2JcIikoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI0MWEwXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY3JlYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjJhZWJcIik7XG52YXIgZGVzY3JpcHRvciA9IF9fd2VicGFja19yZXF1aXJlX18oXCI0NjMwXCIpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjdmMjBcIik7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbl9fd2VicGFja19yZXF1aXJlX18oXCIzMmU5XCIpKEl0ZXJhdG9yUHJvdG90eXBlLCBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmI0Y1wiKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNDU4OFwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI0NjMwXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNGE1OVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgY3R4ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjliNDNcIik7XG52YXIgY2FsbCA9IF9fd2VicGFja19yZXF1aXJlX18oXCIxZmE4XCIpO1xudmFyIGlzQXJyYXlJdGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjMzYTRcIik7XG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiY2I3Y1wiKTtcbnZhciB0b0xlbmd0aCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI5ZGVmXCIpO1xudmFyIGdldEl0ZXJGbiA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyN2VlXCIpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjRiZjhcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiYmUxM1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI1MDRjXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnZXRLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjBkNThcIik7XG52YXIgdG9JT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjY4MjFcIik7XG52YXIgaXNFbnVtID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjUyYTdcIikuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlzRW50cmllcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoaXQpO1xuICAgIHZhciBrZXlzID0gZ2V0S2V5cyhPKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoTywga2V5ID0ga2V5c1tpKytdKSkge1xuICAgICAgcmVzdWx0LnB1c2goaXNFbnRyaWVzID8gW2tleSwgT1trZXldXSA6IE9ba2V5XSk7XG4gICAgfSByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI1MTQ3XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBNQVRDSCA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyYjRjXCIpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciByZSA9IC8uLztcbiAgdHJ5IHtcbiAgICAnLy4vJ1tLRVldKHJlKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICByZVtNQVRDSF0gPSBmYWxzZTtcbiAgICAgIHJldHVybiAhJy8uLydbS0VZXShyZSk7XG4gICAgfSBjYXRjaCAoZikgeyAvKiBlbXB0eSAqLyB9XG4gIH0gcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjUyMGFcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIHJlZ2V4cEZsYWdzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjBiZmJcIik7XG5cbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xuLy8gVGhpcyBhbHdheXMgcmVmZXJzIHRvIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24sIGJlY2F1c2UgdGhlXG4vLyBTdHJpbmcjcmVwbGFjZSBwb2x5ZmlsbCB1c2VzIC4vZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYy5qcyxcbi8vIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBiZWZvcmUgcGF0Y2hpbmcgdGhlIG1ldGhvZC5cbnZhciBuYXRpdmVSZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xuXG52YXIgcGF0Y2hlZEV4ZWMgPSBuYXRpdmVFeGVjO1xuXG52YXIgTEFTVF9JTkRFWCA9ICdsYXN0SW5kZXgnO1xuXG52YXIgVVBEQVRFU19MQVNUX0lOREVYX1dST05HID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlMSA9IC9hLyxcbiAgICAgIHJlMiA9IC9iKi9nO1xuICBuYXRpdmVFeGVjLmNhbGwocmUxLCAnYScpO1xuICBuYXRpdmVFeGVjLmNhbGwocmUyLCAnYScpO1xuICByZXR1cm4gcmUxW0xBU1RfSU5ERVhdICE9PSAwIHx8IHJlMltMQVNUX0lOREVYXSAhPT0gMDtcbn0pKCk7XG5cbi8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwLCBjb3BpZWQgZnJvbSBlczUtc2hpbSdzIFN0cmluZyNzcGxpdCBwYXRjaC5cbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEO1xuXG5pZiAoUEFUQ0gpIHtcbiAgcGF0Y2hlZEV4ZWMgPSBmdW5jdGlvbiBleGVjKHN0cikge1xuICAgIHZhciByZSA9IHRoaXM7XG4gICAgdmFyIGxhc3RJbmRleCwgcmVDb3B5LCBtYXRjaCwgaTtcblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHJlLnNvdXJjZSArICckKD8hXFxcXHMpJywgcmVnZXhwRmxhZ3MuY2FsbChyZSkpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZVtMQVNUX0lOREVYXTtcblxuICAgIG1hdGNoID0gbmF0aXZlRXhlYy5jYWxsKHJlLCBzdHIpO1xuXG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmVbTEFTVF9JTkRFWF0gPSByZS5nbG9iYWwgPyBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCA6IGxhc3RJbmRleDtcbiAgICB9XG4gICAgaWYgKE5QQ0dfSU5DTFVERUQgJiYgbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSkge1xuICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGBcbiAgICAgIC8vIGZvciBOUENHLCBsaWtlIElFOC4gTk9URTogVGhpcyBkb2Vzbicgd29yayBmb3IgLyguPyk/L1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvb3AtZnVuY1xuICAgICAgbmF0aXZlUmVwbGFjZS5jYWxsKG1hdGNoWzBdLCByZUNvcHksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldID09PSB1bmRlZmluZWQpIG1hdGNoW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hlZEV4ZWM7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNTJhN1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5leHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI1NTFjXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgTElCUkFSWSA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyZDAwXCIpO1xudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3NzI2XCIpO1xudmFyIGN0eCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI5YjQzXCIpO1xudmFyIGNsYXNzb2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMjNjNlwiKTtcbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjVjYTFcIik7XG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDNmNFwiKTtcbnZhciBhRnVuY3Rpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDhlOFwiKTtcbnZhciBhbkluc3RhbmNlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImY2MDVcIik7XG52YXIgZm9yT2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNGE1OVwiKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZWJkNlwiKTtcbnZhciB0YXNrID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjE5OTFcIikuc2V0O1xudmFyIG1pY3JvdGFzayA9IF9fd2VicGFja19yZXF1aXJlX18oXCI4MDc5XCIpKCk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiYTViOFwiKTtcbnZhciBwZXJmb3JtID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjljODBcIik7XG52YXIgdXNlckFnZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImEyNWZcIik7XG52YXIgcHJvbWlzZVJlc29sdmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiYmNhYVwiKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjggfHwgJyc7XG52YXIgJFByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV07XG52YXIgaXNOb2RlID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG52YXIgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgSW50ZXJuYWwsIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gJFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmI0Y1wiKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgICBleGVjKGVtcHR5LCBlbXB0eSk7XG4gICAgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKVxuICAgICAgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlXG4gICAgICAvLyB2OCA2LjYgKE5vZGUgMTAgYW5kIENocm9tZSA2NikgaGF2ZSBhIGJ1ZyB3aXRoIHJlc29sdmluZyBjdXN0b20gdGhlbmFibGVzXG4gICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgICAgIC8vIHdlIGNhbid0IGRldGVjdCBpdCBzeW5jaHJvbm91c2x5LCBzbyBqdXN0IGNoZWNrIHZlcnNpb25zXG4gICAgICAmJiB2OC5pbmRleE9mKCc2LjYnKSAhPT0gMFxuICAgICAgJiYgdXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZS82NicpID09PSAtMTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChwcm9taXNlLCBpc1JlamVjdCkge1xuICBpZiAocHJvbWlzZS5fbikgcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciBvayA9IHByb21pc2UuX3MgPT0gMTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uIChyZWFjdGlvbikge1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbDtcbiAgICAgIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgICAgIHZhciByZWplY3QgPSByZWFjdGlvbi5yZWplY3Q7XG4gICAgICB2YXIgZG9tYWluID0gcmVhY3Rpb24uZG9tYWluO1xuICAgICAgdmFyIHJlc3VsdCwgdGhlbiwgZXhpdGVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpOyAvLyBtYXkgdGhyb3dcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgZXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChkb21haW4gJiYgIWV4aXRlZCkgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhcHJvbWlzZS5faCkgb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciB1bmhhbmRsZWQgPSBpc1VuaGFuZGxlZChwcm9taXNlKTtcbiAgICB2YXIgcmVzdWx0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmICh1bmhhbmRsZWQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbikge1xuICAgICAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHVuaGFuZGxlZCAmJiByZXN1bHQuZSkgdGhyb3cgcmVzdWx0LnY7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLl9oICE9PSAxICYmIChwcm9taXNlLl9hIHx8IHByb21pc2UuX2MpLmxlbmd0aCA9PT0gMDtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCkge1xuICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdiB9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZiAoIXByb21pc2UuX2EpIHByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICB2YXIgdGhlbjtcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSkge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAkcmVqZWN0LmNhbGwoeyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImRjYmNcIikoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX2EpIHRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fcykgbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSAkUHJvbWlzZSB8fCBDID09PSBXcmFwcGVyXG4gICAgICA/IG5ldyBPd25Qcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgOiBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgUHJvbWlzZTogJFByb21pc2UgfSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiN2YyMFwiKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiN2E1NlwiKShQUk9NSVNFKTtcbldyYXBwZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiODM3OFwiKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNWNjNVwiKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNTUzN1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgY29yZSA9IF9fd2VicGFja19yZXF1aXJlX18oXCI4Mzc4XCIpO1xudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3NzI2XCIpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmQwMFwiKSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE5IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNWNhMVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjc3MjZcIik7XG52YXIgY29yZSA9IF9fd2VicGFja19yZXF1aXJlX18oXCI4Mzc4XCIpO1xudmFyIGhpZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMzJlOVwiKTtcbnZhciByZWRlZmluZSA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyYWJhXCIpO1xudmFyIGN0eCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI5YjQzXCIpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KTtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYgKHRhcmdldCkgcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYgKGV4cG9ydHNba2V5XSAhPSBvdXQpIGhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmIChJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dCkgZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI1Y2M1XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBJVEVSQVRPUiA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyYjRjXCIpKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uICgpIHsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBza2lwQ2xvc2luZykge1xuICBpZiAoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gWzddO1xuICAgIHZhciBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgZG9uZTogc2FmZSA9IHRydWUgfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNWRiY1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDNmNFwiKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oXCI4Yjk3XCIpLnNldDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRoYXQsIHRhcmdldCwgQykge1xuICB2YXIgUyA9IHRhcmdldC5jb25zdHJ1Y3RvcjtcbiAgdmFyIFA7XG4gIGlmIChTICE9PSBDICYmIHR5cGVvZiBTID09ICdmdW5jdGlvbicgJiYgKFAgPSBTLnByb3RvdHlwZSkgIT09IEMucHJvdG90eXBlICYmIGlzT2JqZWN0KFApICYmIHNldFByb3RvdHlwZU9mKSB7XG4gICAgc2V0UHJvdG90eXBlT2YodGhhdCwgUCk7XG4gIH0gcmV0dXJuIHRoYXQ7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjVmMWJcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGNsYXNzb2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMjNjNlwiKTtcbnZhciBidWlsdGluRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcblxuIC8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cGV4ZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIsIFMpIHtcbiAgdmFyIGV4ZWMgPSBSLmV4ZWM7XG4gIGlmICh0eXBlb2YgZXhlYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciByZXN1bHQgPSBleGVjLmNhbGwoUiwgUyk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWdFeHAgZXhlYyBtZXRob2QgcmV0dXJuZWQgc29tZXRoaW5nIG90aGVyIHRoYW4gYW4gT2JqZWN0IG9yIG51bGwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoY2xhc3NvZihSKSAhPT0gJ1JlZ0V4cCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG4gIH1cbiAgcmV0dXJuIGJ1aWx0aW5FeGVjLmNhbGwoUiwgUyk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjYxM2JcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHNoYXJlZCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI1NTM3XCIpKCdrZXlzJyk7XG52YXIgdWlkID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImNhNWFcIik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNjI2YVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyZDk1XCIpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjY3NjJcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L0FycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xudmFyICRleHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNWNhMVwiKTtcbnZhciAkaW5jbHVkZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiYzM2NlwiKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdBcnJheScsIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKGVsIC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiAkaW5jbHVkZXModGhpcywgZWwsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbl9fd2VicGFja19yZXF1aXJlX18oXCI5YzZjXCIpKCdpbmNsdWRlcycpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjY4MjFcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI2MjZhXCIpO1xudmFyIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiYmUxM1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNjlhOFwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjZhOTlcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDNmNFwiKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjZkNjdcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjVjYTFcIik7XG52YXIgJG1hcCA9IF9fd2VicGFja19yZXF1aXJlX18oXCIwYTQ5XCIpKDEpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmYyMVwiKShbXS5tYXAsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xNSAvIDE1LjQuNC4xOSBBcnJheS5wcm90b3R5cGUubWFwKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIG1hcDogZnVuY3Rpb24gbWFwKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNzcyNlwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiNzdmMVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjQ1ODhcIik7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjc5ZTVcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjdhNTZcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNzcyNlwiKTtcbnZhciBkUCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI4NmNjXCIpO1xudmFyIERFU0NSSVBUT1JTID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjllMWVcIik7XG52YXIgU1BFQ0lFUyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyYjRjXCIpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiN2IyM1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgYUZ1bmN0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImQ4ZThcIik7XG52YXIgdG9PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNGJmOFwiKTtcbnZhciBJT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjYyNmFcIik7XG52YXIgdG9MZW5ndGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiOWRlZlwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGhhdCwgY2FsbGJhY2tmbiwgYUxlbiwgbWVtbywgaXNSaWdodCkge1xuICBhRnVuY3Rpb24oY2FsbGJhY2tmbik7XG4gIHZhciBPID0gdG9PYmplY3QodGhhdCk7XG4gIHZhciBzZWxmID0gSU9iamVjdChPKTtcbiAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgdmFyIGluZGV4ID0gaXNSaWdodCA/IGxlbmd0aCAtIDEgOiAwO1xuICB2YXIgaSA9IGlzUmlnaHQgPyAtMSA6IDE7XG4gIGlmIChhTGVuIDwgMikgZm9yICg7Oykge1xuICAgIGlmIChpbmRleCBpbiBzZWxmKSB7XG4gICAgICBtZW1vID0gc2VsZltpbmRleF07XG4gICAgICBpbmRleCArPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGluZGV4ICs9IGk7XG4gICAgaWYgKGlzUmlnaHQgPyBpbmRleCA8IDAgOiBsZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xuICAgIH1cbiAgfVxuICBmb3IgKDtpc1JpZ2h0ID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4OyBpbmRleCArPSBpKSBpZiAoaW5kZXggaW4gc2VsZikge1xuICAgIG1lbW8gPSBjYWxsYmFja2ZuKG1lbW8sIHNlbGZbaW5kZXhdLCBpbmRleCwgTyk7XG4gIH1cbiAgcmV0dXJuIG1lbW87XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjdmMjBcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRlZiA9IF9fd2VicGFja19yZXF1aXJlX18oXCI4NmNjXCIpLmY7XG52YXIgaGFzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjY5YThcIik7XG52YXIgVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjJiNGNcIikoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiODA3OVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjc3MjZcIik7XG52YXIgbWFjcm90YXNrID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjE5OTFcIikuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmQ5NVwiKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyLCBleGNlcHQgaU9TIFNhZmFyaSAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgfSBlbHNlIGlmIChPYnNlcnZlciAmJiAhKGdsb2JhbC5uYXZpZ2F0b3IgJiYgZ2xvYmFsLm5hdmlnYXRvci5zdGFuZGFsb25lKSkge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjgzNzhcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNi41JyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI4NGYyXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiODZjY1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiY2I3Y1wiKTtcbnZhciBJRThfRE9NX0RFRklORSA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjNjlhXCIpO1xudmFyIHRvUHJpbWl0aXZlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjZhOTlcIik7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IF9fd2VicGFja19yZXF1aXJlX18oXCI5ZTFlXCIpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiOGI5N1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDNmNFwiKTtcbnZhciBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjYjdjXCIpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI5YjQzXCIpKEZ1bmN0aW9uLmNhbGwsIF9fd2VicGFja19yZXF1aXJlX18oXCIxMWU5XCIpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaCAoZSkgeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmIChidWdneSkgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjhiYmZcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidnVlXCIpO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI5MDkzXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjZTEwXCIpO1xudmFyIGhpZGRlbktleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZTExZVwiKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiOWI0M1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDhlOFwiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI5YzZjXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDIyLjEuMy4zMSBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbnZhciBVTlNDT1BBQkxFUyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyYjRjXCIpKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5pZiAoQXJyYXlQcm90b1tVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMzJlOVwiKShBcnJheVByb3RvLCBVTlNDT1BBQkxFUywge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCI5YzgwXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlOiBmYWxzZSwgdjogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBlOiB0cnVlLCB2OiBlIH07XG4gIH1cbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiOWRlZlwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNDU4OFwiKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIjllMWVcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhX193ZWJwYWNrX3JlcXVpcmVfXyhcIjc5ZTVcIikoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImEyNWZcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3NzI2XCIpO1xudmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiYTViOFwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDhlOFwiKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiYWE3N1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI1Y2ExXCIpO1xudmFyIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiYmUxM1wiKTtcbnZhciBmYWlscyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3OWU1XCIpO1xudmFyIHNwYWNlcyA9IF9fd2VicGFja19yZXF1aXJlX18oXCJmZGVmXCIpO1xudmFyIHNwYWNlID0gJ1snICsgc3BhY2VzICsgJ10nO1xudmFyIG5vbiA9ICdcXHUyMDBiXFx1MDA4NSc7XG52YXIgbHRyaW0gPSBSZWdFeHAoJ14nICsgc3BhY2UgKyBzcGFjZSArICcqJyk7XG52YXIgcnRyaW0gPSBSZWdFeHAoc3BhY2UgKyBzcGFjZSArICcqJCcpO1xuXG52YXIgZXhwb3J0ZXIgPSBmdW5jdGlvbiAoS0VZLCBleGVjLCBBTElBUykge1xuICB2YXIgZXhwID0ge307XG4gIHZhciBGT1JDRSA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gISFzcGFjZXNbS0VZXSgpIHx8IG5vbltLRVldKCkgIT0gbm9uO1xuICB9KTtcbiAgdmFyIGZuID0gZXhwW0tFWV0gPSBGT1JDRSA/IGV4ZWModHJpbSkgOiBzcGFjZXNbS0VZXTtcbiAgaWYgKEFMSUFTKSBleHBbQUxJQVNdID0gZm47XG4gICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogRk9SQ0UsICdTdHJpbmcnLCBleHApO1xufTtcblxuLy8gMSAtPiBTdHJpbmcjdHJpbUxlZnRcbi8vIDIgLT4gU3RyaW5nI3RyaW1SaWdodFxuLy8gMyAtPiBTdHJpbmcjdHJpbVxudmFyIHRyaW0gPSBleHBvcnRlci50cmltID0gZnVuY3Rpb24gKHN0cmluZywgVFlQRSkge1xuICBzdHJpbmcgPSBTdHJpbmcoZGVmaW5lZChzdHJpbmcpKTtcbiAgaWYgKFRZUEUgJiAxKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShsdHJpbSwgJycpO1xuICBpZiAoVFlQRSAmIDIpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gIHJldHVybiBzdHJpbmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydGVyO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImFhZTNcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4yLjggSXNSZWdFeHAoYXJndW1lbnQpXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDNmNFwiKTtcbnZhciBjb2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmQ5NVwiKTtcbnZhciBNQVRDSCA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyYjRjXCIpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY29mKGl0KSA9PSAnUmVnRXhwJyk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImFjNmFcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyICRpdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiY2FkZlwiKTtcbnZhciBnZXRLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjBkNThcIik7XG52YXIgcmVkZWZpbmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmFiYVwiKTtcbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNzcyNlwiKTtcbnZhciBoaWRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjMyZTlcIik7XG52YXIgSXRlcmF0b3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjg0ZjJcIik7XG52YXIgd2tzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjJiNGNcIik7XG52YXIgSVRFUkFUT1IgPSB3a3MoJ2l0ZXJhdG9yJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHdrcygndG9TdHJpbmdUYWcnKTtcbnZhciBBcnJheVZhbHVlcyA9IEl0ZXJhdG9ycy5BcnJheTtcblxudmFyIERPTUl0ZXJhYmxlcyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBDU1NTdHlsZURlY2xhcmF0aW9uOiBmYWxzZSxcbiAgQ1NTVmFsdWVMaXN0OiBmYWxzZSxcbiAgQ2xpZW50UmVjdExpc3Q6IGZhbHNlLFxuICBET01SZWN0TGlzdDogZmFsc2UsXG4gIERPTVN0cmluZ0xpc3Q6IGZhbHNlLFxuICBET01Ub2tlbkxpc3Q6IHRydWUsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiBmYWxzZSxcbiAgRmlsZUxpc3Q6IGZhbHNlLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogZmFsc2UsXG4gIEhUTUxDb2xsZWN0aW9uOiBmYWxzZSxcbiAgSFRNTEZvcm1FbGVtZW50OiBmYWxzZSxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IGZhbHNlLFxuICBNZWRpYUxpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBNaW1lVHlwZUFycmF5OiBmYWxzZSxcbiAgTmFtZWROb2RlTWFwOiBmYWxzZSxcbiAgTm9kZUxpc3Q6IHRydWUsXG4gIFBhaW50UmVxdWVzdExpc3Q6IGZhbHNlLFxuICBQbHVnaW46IGZhbHNlLFxuICBQbHVnaW5BcnJheTogZmFsc2UsXG4gIFNWR0xlbmd0aExpc3Q6IGZhbHNlLFxuICBTVkdOdW1iZXJMaXN0OiBmYWxzZSxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IGZhbHNlLFxuICBTVkdQb2ludExpc3Q6IGZhbHNlLFxuICBTVkdTdHJpbmdMaXN0OiBmYWxzZSxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogZmFsc2UsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IGZhbHNlLFxuICBTdHlsZVNoZWV0TGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIFRleHRUcmFja0N1ZUxpc3Q6IGZhbHNlLFxuICBUZXh0VHJhY2tMaXN0OiBmYWxzZSxcbiAgVG91Y2hMaXN0OiBmYWxzZVxufTtcblxuZm9yICh2YXIgY29sbGVjdGlvbnMgPSBnZXRLZXlzKERPTUl0ZXJhYmxlcyksIGkgPSAwOyBpIDwgY29sbGVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBjb2xsZWN0aW9uc1tpXTtcbiAgdmFyIGV4cGxpY2l0ID0gRE9NSXRlcmFibGVzW05BTUVdO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGtleTtcbiAgaWYgKHByb3RvKSB7XG4gICAgaWYgKCFwcm90b1tJVEVSQVRPUl0pIGhpZGUocHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgaWYgKCFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gICAgSXRlcmF0b3JzW05BTUVdID0gQXJyYXlWYWx1ZXM7XG4gICAgaWYgKGV4cGxpY2l0KSBmb3IgKGtleSBpbiAkaXRlcmF0b3JzKSBpZiAoIXByb3RvW2tleV0pIHJlZGVmaW5lKHByb3RvLCBrZXksICRpdGVyYXRvcnNba2V5XSwgdHJ1ZSk7XG4gIH1cbn1cblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCJiMGM1XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgcmVnZXhwRXhlYyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI1MjBhXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIjVjYTFcIikoe1xuICB0YXJnZXQ6ICdSZWdFeHAnLFxuICBwcm90bzogdHJ1ZSxcbiAgZm9yY2VkOiByZWdleHBFeGVjICE9PSAvLi8uZXhlY1xufSwge1xuICBleGVjOiByZWdleHBFeGVjXG59KTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCJiY2FhXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjYjdjXCIpO1xudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImQzZjRcIik7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiYTViOFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQywgeCkge1xuICBhbk9iamVjdChDKTtcbiAgaWYgKGlzT2JqZWN0KHgpICYmIHguY29uc3RydWN0b3IgPT09IEMpIHJldHVybiB4O1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKEMpO1xuICB2YXIgcmVzb2x2ZSA9IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmU7XG4gIHJlc29sdmUoeCk7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCJiZTEzXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiYzM2NlwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI2ODIxXCIpO1xudmFyIHRvTGVuZ3RoID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjlkZWZcIik7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjc3ZjFcIik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCJjNWY2XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjc3MjZcIik7XG52YXIgaGFzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjY5YThcIik7XG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjJkOTVcIik7XG52YXIgaW5oZXJpdElmUmVxdWlyZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNWRiY1wiKTtcbnZhciB0b1ByaW1pdGl2ZSA9IF9fd2VicGFja19yZXF1aXJlX18oXCI2YTk5XCIpO1xudmFyIGZhaWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjc5ZTVcIik7XG52YXIgZ09QTiA9IF9fd2VicGFja19yZXF1aXJlX18oXCI5MDkzXCIpLmY7XG52YXIgZ09QRCA9IF9fd2VicGFja19yZXF1aXJlX18oXCIxMWU5XCIpLmY7XG52YXIgZFAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiODZjY1wiKS5mO1xudmFyICR0cmltID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImFhNzdcIikudHJpbTtcbnZhciBOVU1CRVIgPSAnTnVtYmVyJztcbnZhciAkTnVtYmVyID0gZ2xvYmFsW05VTUJFUl07XG52YXIgQmFzZSA9ICROdW1iZXI7XG52YXIgcHJvdG8gPSAkTnVtYmVyLnByb3RvdHlwZTtcbi8vIE9wZXJhIH4xMiBoYXMgYnJva2VuIE9iamVjdCN0b1N0cmluZ1xudmFyIEJST0tFTl9DT0YgPSBjb2YoX193ZWJwYWNrX3JlcXVpcmVfXyhcIjJhZWJcIikocHJvdG8pKSA9PSBOVU1CRVI7XG52YXIgVFJJTSA9ICd0cmltJyBpbiBTdHJpbmcucHJvdG90eXBlO1xuXG4vLyA3LjEuMyBUb051bWJlcihhcmd1bWVudClcbnZhciB0b051bWJlciA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgaXQgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgZmFsc2UpO1xuICBpZiAodHlwZW9mIGl0ID09ICdzdHJpbmcnICYmIGl0Lmxlbmd0aCA+IDIpIHtcbiAgICBpdCA9IFRSSU0gPyBpdC50cmltKCkgOiAkdHJpbShpdCwgMyk7XG4gICAgdmFyIGZpcnN0ID0gaXQuY2hhckNvZGVBdCgwKTtcbiAgICB2YXIgdGhpcmQsIHJhZGl4LCBtYXhDb2RlO1xuICAgIGlmIChmaXJzdCA9PT0gNDMgfHwgZmlyc3QgPT09IDQ1KSB7XG4gICAgICB0aGlyZCA9IGl0LmNoYXJDb2RlQXQoMik7XG4gICAgICBpZiAodGhpcmQgPT09IDg4IHx8IHRoaXJkID09PSAxMjApIHJldHVybiBOYU47IC8vIE51bWJlcignKzB4MScpIHNob3VsZCBiZSBOYU4sIG9sZCBWOCBmaXhcbiAgICB9IGVsc2UgaWYgKGZpcnN0ID09PSA0OCkge1xuICAgICAgc3dpdGNoIChpdC5jaGFyQ29kZUF0KDEpKSB7XG4gICAgICAgIGNhc2UgNjY6IGNhc2UgOTg6IHJhZGl4ID0gMjsgbWF4Q29kZSA9IDQ5OyBicmVhazsgLy8gZmFzdCBlcXVhbCAvXjBiWzAxXSskL2lcbiAgICAgICAgY2FzZSA3OTogY2FzZSAxMTE6IHJhZGl4ID0gODsgbWF4Q29kZSA9IDU1OyBicmVhazsgLy8gZmFzdCBlcXVhbCAvXjBvWzAtN10rJC9pXG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiAraXQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBkaWdpdHMgPSBpdC5zbGljZSgyKSwgaSA9IDAsIGwgPSBkaWdpdHMubGVuZ3RoLCBjb2RlOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBkaWdpdHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgLy8gcGFyc2VJbnQgcGFyc2VzIGEgc3RyaW5nIHRvIGEgZmlyc3QgdW5hdmFpbGFibGUgc3ltYm9sXG4gICAgICAgIC8vIGJ1dCBUb051bWJlciBzaG91bGQgcmV0dXJuIE5hTiBpZiBhIHN0cmluZyBjb250YWlucyB1bmF2YWlsYWJsZSBzeW1ib2xzXG4gICAgICAgIGlmIChjb2RlIDwgNDggfHwgY29kZSA+IG1heENvZGUpIHJldHVybiBOYU47XG4gICAgICB9IHJldHVybiBwYXJzZUludChkaWdpdHMsIHJhZGl4KTtcbiAgICB9XG4gIH0gcmV0dXJuICtpdDtcbn07XG5cbmlmICghJE51bWJlcignIDBvMScpIHx8ICEkTnVtYmVyKCcwYjEnKSB8fCAkTnVtYmVyKCcrMHgxJykpIHtcbiAgJE51bWJlciA9IGZ1bmN0aW9uIE51bWJlcih2YWx1ZSkge1xuICAgIHZhciBpdCA9IGFyZ3VtZW50cy5sZW5ndGggPCAxID8gMCA6IHZhbHVlO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICByZXR1cm4gdGhhdCBpbnN0YW5jZW9mICROdW1iZXJcbiAgICAgIC8vIGNoZWNrIG9uIDEuLmNvbnN0cnVjdG9yKGZvbykgY2FzZVxuICAgICAgJiYgKEJST0tFTl9DT0YgPyBmYWlscyhmdW5jdGlvbiAoKSB7IHByb3RvLnZhbHVlT2YuY2FsbCh0aGF0KTsgfSkgOiBjb2YodGhhdCkgIT0gTlVNQkVSKVxuICAgICAgICA/IGluaGVyaXRJZlJlcXVpcmVkKG5ldyBCYXNlKHRvTnVtYmVyKGl0KSksIHRoYXQsICROdW1iZXIpIDogdG9OdW1iZXIoaXQpO1xuICB9O1xuICBmb3IgKHZhciBrZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjllMWVcIikgPyBnT1BOKEJhc2UpIDogKFxuICAgIC8vIEVTMzpcbiAgICAnTUFYX1ZBTFVFLE1JTl9WQUxVRSxOYU4sTkVHQVRJVkVfSU5GSU5JVFksUE9TSVRJVkVfSU5GSU5JVFksJyArXG4gICAgLy8gRVM2IChpbiBjYXNlLCBpZiBtb2R1bGVzIHdpdGggRVM2IE51bWJlciBzdGF0aWNzIHJlcXVpcmVkIGJlZm9yZSk6XG4gICAgJ0VQU0lMT04saXNGaW5pdGUsaXNJbnRlZ2VyLGlzTmFOLGlzU2FmZUludGVnZXIsTUFYX1NBRkVfSU5URUdFUiwnICtcbiAgICAnTUlOX1NBRkVfSU5URUdFUixwYXJzZUZsb2F0LHBhcnNlSW50LGlzSW50ZWdlcidcbiAgKS5zcGxpdCgnLCcpLCBqID0gMCwga2V5OyBrZXlzLmxlbmd0aCA+IGo7IGorKykge1xuICAgIGlmIChoYXMoQmFzZSwga2V5ID0ga2V5c1tqXSkgJiYgIWhhcygkTnVtYmVyLCBrZXkpKSB7XG4gICAgICBkUCgkTnVtYmVyLCBrZXksIGdPUEQoQmFzZSwga2V5KSk7XG4gICAgfVxuICB9XG4gICROdW1iZXIucHJvdG90eXBlID0gcHJvdG87XG4gIHByb3RvLmNvbnN0cnVjdG9yID0gJE51bWJlcjtcbiAgX193ZWJwYWNrX3JlcXVpcmVfXyhcIjJhYmFcIikoZ2xvYmFsLCBOVU1CRVIsICROdW1iZXIpO1xufVxuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImM2OWFcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSAhX193ZWJwYWNrX3JlcXVpcmVfXyhcIjllMWVcIikgJiYgIV9fd2VicGFja19yZXF1aXJlX18oXCI3OWU1XCIpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMjMwZVwiKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiY2E1YVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCJjYWRmXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI5YzZjXCIpO1xudmFyIHN0ZXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDUzYlwiKTtcbnZhciBJdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiODRmMlwiKTtcbnZhciB0b0lPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNjgyMVwiKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMDFmOVwiKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImNiN2NcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImQzZjRcIik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImNkMWNcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IF9fd2VicGFja19yZXF1aXJlX18oXCJlODUzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbCwgbGVuZ3RoKSB7XG4gIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbCkpKGxlbmd0aCk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImNlMTBcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGhhcyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI2OWE4XCIpO1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI2ODIxXCIpO1xudmFyIGFycmF5SW5kZXhPZiA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjMzY2XCIpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI2MTNiXCIpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCJkMjVmXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI1Y2ExXCIpO1xudmFyICRmaWx0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMGE0OVwiKSgyKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhX193ZWJwYWNrX3JlcXVpcmVfXyhcIjJmMjFcIikoW10uZmlsdGVyLCB0cnVlKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuNyAvIDE1LjQuNC4yMCBBcnJheS5wcm90b3R5cGUuZmlsdGVyKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRmaWx0ZXIodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiZDJjOFwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBoZWxwZXIgZm9yIFN0cmluZyN7c3RhcnRzV2l0aCwgZW5kc1dpdGgsIGluY2x1ZGVzfVxudmFyIGlzUmVnRXhwID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImFhZTNcIik7XG52YXIgZGVmaW5lZCA9IF9fd2VicGFja19yZXF1aXJlX18oXCJiZTEzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGF0LCBzZWFyY2hTdHJpbmcsIE5BTUUpIHtcbiAgaWYgKGlzUmVnRXhwKHNlYXJjaFN0cmluZykpIHRocm93IFR5cGVFcnJvcignU3RyaW5nIycgKyBOQU1FICsgXCIgZG9lc24ndCBhY2NlcHQgcmVnZXghXCIpO1xuICByZXR1cm4gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCJkM2Y0XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImQ1M2JcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiZDhlOFwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiZGNiY1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgcmVkZWZpbmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmFiYVwiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSwgc2FmZSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImUxMWVcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiZTg1M1wiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiZDNmNFwiKTtcbnZhciBpc0FycmF5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjExNjlcIik7XG52YXIgU1BFQ0lFUyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyYjRjXCIpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbCkpIHtcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZiAodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKSBDID0gdW5kZWZpbmVkO1xuICAgIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQztcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiZWJkNlwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjYjdjXCIpO1xudmFyIGFGdW5jdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oXCJkOGU4XCIpO1xudmFyIFNQRUNJRVMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmI0Y1wiKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCJmNjA1XCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImZhNWJcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiNTUzN1wiKSgnbmF0aXZlLWZ1bmN0aW9uLXRvLXN0cmluZycsIEZ1bmN0aW9uLnRvU3RyaW5nKTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCJmYWIyXCI6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI3NzI2XCIpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiZmIxNVwiOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvQHZ1ZS9jbGktc2VydmljZS9saWIvY29tbWFuZHMvYnVpbGQvc2V0UHVibGljUGF0aC5qc1xuLy8gVGhpcyBmaWxlIGlzIGltcG9ydGVkIGludG8gbGliL3djIGNsaWVudCBidW5kbGVzLlxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgdmFyIHNldFB1YmxpY1BhdGhfaVxuICBpZiAoKHNldFB1YmxpY1BhdGhfaSA9IHdpbmRvdy5kb2N1bWVudC5jdXJyZW50U2NyaXB0KSAmJiAoc2V0UHVibGljUGF0aF9pID0gc2V0UHVibGljUGF0aF9pLnNyYy5tYXRjaCgvKC4rXFwvKVteL10rXFwuanMoXFw/LiopPyQvKSkpIHtcbiAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzZXRQdWJsaWNQYXRoX2lbMV0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG59XG5cbi8vIEluZGljYXRlIHRvIHdlYnBhY2sgdGhhdCB0aGlzIGZpbGUgY2FuIGJlIGNvbmNhdGVuYXRlZFxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgc2V0UHVibGljUGF0aCA9IChudWxsKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvQHZ1ZS9iYWJlbC1wcmVzZXQtYXBwL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2J1aWx0aW4vZXM2L2FycmF5V2l0aEhvbGVzLmpzXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9AdnVlL2JhYmVsLXByZXNldC1hcHAvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYnVpbHRpbi9lczYvaXRlcmFibGVUb0FycmF5TGltaXQuanNcbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvQHZ1ZS9iYWJlbC1wcmVzZXQtYXBwL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2J1aWx0aW4vZXM2L25vbkl0ZXJhYmxlUmVzdC5qc1xuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9AdnVlL2JhYmVsLXByZXNldC1hcHAvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYnVpbHRpbi9lczYvc2xpY2VkVG9BcnJheS5qc1xuXG5cblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7XG59XG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG52YXIgd2ViX2RvbV9pdGVyYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oXCJhYzZhXCIpO1xuXG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbnZhciBlczZfYXJyYXlfaXRlcmF0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiY2FkZlwiKTtcblxuLy8gRVhURVJOQUwgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzLmpzXG52YXIgZXM3X29iamVjdF9lbnRyaWVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImZmYzFcIik7XG5cbi8vIEVYVEVSTkFMIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5tYXAuanNcbnZhciBlczZfYXJyYXlfbWFwID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjZkNjdcIik7XG5cbi8vIEVYVEVSTkFMIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maWx0ZXIuanNcbnZhciBlczZfYXJyYXlfZmlsdGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcImQyNWZcIik7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL0B2dWUvYmFiZWwtcHJlc2V0LWFwcC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9idWlsdGluL2VzNi9kZWZpbmVQcm9wZXJ0eS5qc1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9AdnVlL2JhYmVsLXByZXNldC1hcHAvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYnVpbHRpbi9lczYvb2JqZWN0U3ByZWFkLmpzXG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkucmVkdWNlLmpzXG52YXIgZXM2X2FycmF5X3JlZHVjZSA9IF9fd2VicGFja19yZXF1aXJlX18oXCIwY2Q4XCIpO1xuXG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXMtYXJyYXkuanNcbnZhciBlczZfYXJyYXlfaXNfYXJyYXkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMmNhZlwiKTtcblxuLy8gRVhURVJOQUwgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5zcGxpdC5qc1xudmFyIGVzNl9yZWdleHBfc3BsaXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiMjhhNVwiKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvQHZ1ZS9iYWJlbC1wcmVzZXQtYXBwL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2J1aWx0aW4vZXM2L2FycmF5V2l0aG91dEhvbGVzLmpzXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvQHZ1ZS9iYWJlbC1wcmVzZXQtYXBwL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2J1aWx0aW4vZXM2L2l0ZXJhYmxlVG9BcnJheS5qc1xuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9AdnVlL2JhYmVsLXByZXNldC1hcHAvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYnVpbHRpbi9lczYvbm9uSXRlcmFibGVTcHJlYWQuanNcbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvQHZ1ZS9iYWJlbC1wcmVzZXQtYXBwL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2J1aWx0aW4vZXM2L3RvQ29uc3VtYWJsZUFycmF5LmpzXG5cblxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmNvbnN0cnVjdG9yLmpzXG52YXIgZXM2X251bWJlcl9jb25zdHJ1Y3RvciA9IF9fd2VicGFja19yZXF1aXJlX18oXCJjNWY2XCIpO1xuXG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xudmFyIGVzNl9wcm9taXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjU1MWNcIik7XG5cbi8vIEVYVEVSTkFMIE1PRFVMRTogZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInZ1ZVwiLFwiY29tbW9uanMyXCI6XCJ2dWVcIixcInJvb3RcIjpcIlZ1ZVwifVxudmFyIGV4dGVybmFsX2NvbW1vbmpzX3Z1ZV9jb21tb25qczJfdnVlX3Jvb3RfVnVlXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI4YmJmXCIpO1xudmFyIGV4dGVybmFsX2NvbW1vbmpzX3Z1ZV9jb21tb25qczJfdnVlX3Jvb3RfVnVlX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX193ZWJwYWNrX3JlcXVpcmVfXy5uKGV4dGVybmFsX2NvbW1vbmpzX3Z1ZV9jb21tb25qczJfdnVlX3Jvb3RfVnVlXyk7XG5cbi8vIEVYVEVSTkFMIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcy5qc1xudmFyIGVzN19hcnJheV9pbmNsdWRlcyA9IF9fd2VicGFja19yZXF1aXJlX18oXCI2NzYyXCIpO1xuXG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzLmpzXG52YXIgZXM2X3N0cmluZ19pbmNsdWRlcyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIyZmRiXCIpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy91dGlscy9nZXRUYXJnZXRUYWcudHNcblxuXG5cbmZ1bmN0aW9uIGdldFRhcmdldFRhZyh1c2VyQWdlbnQpIHtcbiAgaWYgKHVzZXJBZ2VudC5pbmNsdWRlcygnRWRnZScpKSB7XG4gICAgcmV0dXJuICdib2R5JztcbiAgfVxuXG4gIGlmICh1c2VyQWdlbnQuaW5jbHVkZXMoJ0ZpcmVmb3gvJykgJiYgK3VzZXJBZ2VudC5zcGxpdCgnRmlyZWZveC8nKVsxXSA+PSA2Mikge1xuICAgIHJldHVybiAnaHRtbCc7XG4gIH1cblxuICBpZiAodXNlckFnZW50LmluY2x1ZGVzKCdDaHJvbWUnKSAmJiAhdXNlckFnZW50LmluY2x1ZGVzKCdvcHInKSkge1xuICAgIHJldHVybiAnaHRtbCc7XG4gIH1cblxuICByZXR1cm4gJ2h0bWwnO1xufVxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29tcG9uZW50cy92dWUtZml4ZWQtaGVhZGVyLnRzeFxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciB2dWVfZml4ZWRfaGVhZGVyID0gKGV4dGVybmFsX2NvbW1vbmpzX3Z1ZV9jb21tb25qczJfdnVlX3Jvb3RfVnVlX2RlZmF1bHQuYS5leHRlbmQoe1xuICBwcm9wczoge1xuICAgIHRocmVzaG9sZDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgaGVhZGVyQ2xhc3M6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd2dWUtZml4ZWQtaGVhZGVyJ1xuICAgIH0sXG4gICAgZml4ZWRDbGFzczoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3Z1ZS1maXhlZC1oZWFkZXItLWlzRml4ZWQnXG4gICAgfSxcbiAgICBoaWRlU2Nyb2xsVXA6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXM6IG51bGwsXG4gICAgICBjaGVjazogbnVsbCxcbiAgICAgIHRhZzogbnVsbCxcbiAgICAgIGlzRml4ZWQ6IGZhbHNlLFxuICAgICAgbGFzdFNjcm9sbFRvcDogMFxuICAgIH07XG4gIH0sXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5tYWluKCk7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XG4gIH0sXG4gIGJlZm9yZURlc3Ryb3k6IGZ1bmN0aW9uIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudCgpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgbWFpbjogZnVuY3Rpb24gbWFpbigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMucXMgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMudGFnID0gZ2V0VGFyZ2V0VGFnKG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gICAgICB0aGlzLmNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGFnID0gX3RoaXMudGFnLFxuICAgICAgICAgICAgcXMgPSBfdGhpcy5xcyxcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IF90aGlzLnRocmVzaG9sZCxcbiAgICAgICAgICAgIGhpZGVTY3JvbGxVcCA9IF90aGlzLmhpZGVTY3JvbGxVcDtcbiAgICAgICAgdmFyIG9mZnNldEhlaWdodCA9IF90aGlzLiRlbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKCFoaWRlU2Nyb2xsVXApIHtcbiAgICAgICAgICBpZiAodGFnICYmIF90aGlzLmlzRml4ZWQgIT09IHFzKHRhZykuc2Nyb2xsVG9wID4gdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0ZpeGVkID0gcXModGFnKS5zY3JvbGxUb3AgPiB0aHJlc2hvbGQ7XG5cbiAgICAgICAgICAgIF90aGlzLiRlbWl0KCdjaGFuZ2UnLCBfdGhpcy5pc0ZpeGVkKTtcblxuICAgICAgICAgICAgX3RoaXMuJGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzRml4ZWQgPSBfdGhpcy5pc0ZpeGVkID8gcXModGFnKS5zY3JvbGxUb3AgPiB0aHJlc2hvbGQgOiB3aW5kb3cucGFnZVlPZmZzZXQgPiBfdGhpcy5sYXN0U2Nyb2xsVG9wICYmIHdpbmRvdy5wYWdlWU9mZnNldCA+IG9mZnNldEhlaWdodDtcblxuICAgICAgICAgIF90aGlzLiRlbWl0KCdjaGFuZ2UnLCBfdGhpcy5pc0ZpeGVkKTtcblxuICAgICAgICAgIF90aGlzLiRmb3JjZVVwZGF0ZSgpO1xuXG4gICAgICAgICAgX3RoaXMubGFzdFNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyRXZlbnQ6IGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnQoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5jaGVjayk7XG4gICAgfSxcbiAgICByZW1vdmVFdmVudDogZnVuY3Rpb24gcmVtb3ZlRXZlbnQoKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5jaGVjayk7XG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihoKSB7XG4gICAgdmFyIF9vYmplY3RTcHJlYWQzO1xuXG4gICAgdmFyIGNoaWxkcmVuID0gdGhpcy4kc2xvdHMuZGVmYXVsdDtcblxuICAgIGlmICghY2hpbGRyZW4gfHwgIV90b0NvbnN1bWFibGVBcnJheShjaGlsZHJlbilbMF0pIHtcbiAgICAgIHJldHVybiBoKCk7XG4gICAgfVxuXG4gICAgdmFyIF9jaGlsZCA9IF90b0NvbnN1bWFibGVBcnJheShjaGlsZHJlbilbMF07XG5cbiAgICB2YXIgY2hpbGQgPSBoKF9jaGlsZC50YWcsIF9jaGlsZC5kYXRhLCBfY2hpbGQuY2hpbGRyZW4gfHwgX2NoaWxkLnRleHQpO1xuICAgIGNoaWxkLmRhdGEgPSBjaGlsZC5kYXRhIHx8IHtcbiAgICAgIGNsYXNzOiAnJ1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIGNoaWxkLmRhdGEuY2xhc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjaGlsZC5kYXRhLmNsYXNzID0gY2hpbGQuZGF0YS5jbGFzcy5zcGxpdCgnICcpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmRhdGEuY2xhc3MpKSB7XG4gICAgICBjaGlsZC5kYXRhLmNsYXNzID0gX3RvQ29uc3VtYWJsZUFycmF5KGNoaWxkLmRhdGEuY2xhc3MpLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gX29iamVjdFNwcmVhZCh7fSwgYSwgX2RlZmluZVByb3BlcnR5KHt9LCBiLCB0cnVlKSk7XG4gICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgY2hpbGQuZGF0YS5jbGFzcyA9IF9vYmplY3RTcHJlYWQoe30sIGNoaWxkLmRhdGEuY2xhc3MsIChfb2JqZWN0U3ByZWFkMyA9IHt9LCBfZGVmaW5lUHJvcGVydHkoX29iamVjdFNwcmVhZDMsIHRoaXMuaGVhZGVyQ2xhc3MsIHRydWUpLCBfZGVmaW5lUHJvcGVydHkoX29iamVjdFNwcmVhZDMsIHRoaXMuZml4ZWRDbGFzcywgISF0aGlzLmlzRml4ZWQpLCBfb2JqZWN0U3ByZWFkMykpO1xuICAgIGNoaWxkLmRhdGEuY2xhc3MgPSBPYmplY3QuZW50cmllcyhjaGlsZC5kYXRhLmNsYXNzKS5tYXAoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgIHZhciBfcmVmMiA9IF9zbGljZWRUb0FycmF5KF9yZWYsIDIpLFxuICAgICAgICAgIGsgPSBfcmVmMlswXSxcbiAgICAgICAgICB2ID0gX3JlZjJbMV07XG5cbiAgICAgIHJldHVybiB2ID8gayA6IG51bGw7XG4gICAgfSkuZmlsdGVyKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9KS5qb2luKCcgJyk7XG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG59KSk7XG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9AdnVlL2NsaS1zZXJ2aWNlL2xpYi9jb21tYW5kcy9idWlsZC9lbnRyeS1saWIuanNcblxuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBlbnRyeV9saWIgPSBfX3dlYnBhY2tfZXhwb3J0c19fW1wiZGVmYXVsdFwiXSA9ICh2dWVfZml4ZWRfaGVhZGVyKTtcblxuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImZkZWZcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSAnXFx4MDlcXHgwQVxceDBCXFx4MENcXHgwRFxceDIwXFx4QTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDMnICtcbiAgJ1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkYnO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImZmYzFcIjpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LXZhbHVlcy1lbnRyaWVzXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oXCI1Y2ExXCIpO1xudmFyICRlbnRyaWVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIjUwNGNcIikodHJ1ZSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge1xuICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKGl0KSB7XG4gICAgcmV0dXJuICRlbnRyaWVzKGl0KTtcbiAgfVxufSk7XG5cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12dWUtZml4ZWQtaGVhZGVyLmNvbW1vbi5qcy5tYXAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAge30sXG4gICAgW1xuICAgICAgX2MoXCJhcHAtaGVhZGVyXCIsIHtcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICBsYWJlbHM6IF92bS5sYWJlbHMsXG4gICAgICAgICAgbGFuZ3VhZ2VzOiBfdm0ubGFuZ3VhZ2VzLFxuICAgICAgICAgIFwiY3VycmVudC1sYW5ndWFnZVwiOiBfdm0uY3VycmVudExhbmd1YWdlLFxuICAgICAgICAgIFwiaXMtZmlsdGVyLXRvZ2dsZWRcIjogX3ZtLmlzRmlsdGVyVG9nZ2xlZCxcbiAgICAgICAgICBcIm5vLXJlcGx5LW9ubHlcIjogX3ZtLm5vUmVwbHlPbmx5XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYXBwLW1haW5cIiwge1xuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIGxhYmVsczogX3ZtLmxhYmVscyxcbiAgICAgICAgICBcIm5vLXJlcGx5LW9ubHlcIjogX3ZtLm5vUmVwbHlPbmx5LFxuICAgICAgICAgIFwiaXMtZmV0Y2hpbmdcIjogX3ZtLmlzRmV0Y2hpbmcsXG4gICAgICAgICAgcmVzdWx0czogX3ZtLnJlc3VsdHMsXG4gICAgICAgICAgXCJzaG93LXZpZXctbW9yZVwiOiBfdm0uc2hvd1ZpZXdNb3JlXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5jdXJyZW50UmVzdWx0XG4gICAgICAgID8gX2MoXCJhcHAtbWFpbi1tb2RhbFwiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBsYWJlbHM6IF92bS5sYWJlbHMsXG4gICAgICAgICAgICAgIFwibm8tcmVwbHktb25seVwiOiBfdm0ubm9SZXBseU9ubHksXG4gICAgICAgICAgICAgIFwiY3VycmVudC1yZXN1bHRcIjogX3ZtLmN1cnJlbnRSZXN1bHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYXBwLWZvb3RlclwiKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImZvb3RlclwiLCB7IHN0YXRpY0NsYXNzOiBcImJnLXByaW1hcnkgdy1mdWxsIG10LThcIiB9LCBbX3ZtLl9tKDApXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgXCJjb250YWluZXIgbXgtYXV0byBmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC04XCJcbiAgICAgIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LWFtYmVyXCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgVW5vZmZpY2lhbCBzaXRlIGJ5IFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1zZWNvbmRhcnlcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhyZWY6IFwiaHR0cDovL2R1bmNhbi5tY2NsZWFuLmNvLnVrXCIsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRHVuY2FuIE1jQ2xlYW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVsOiBcIm5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcIkR1bmNhbiBNY0NsZWFuXCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgYW5kIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1zZWNvbmRhcnlcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhyZWY6XG4gICAgICAgICAgICAgICAgICAgICAgXCJodHRwczovL2dpdGh1Yi5jb20vZGFtY2NsZWFuL2hhY2t0b2JlcmZlc3QtZmluZGVyL2Jsb2IvbWFzdGVyL0NPTlRSSUJVVE9SUy5tZFwiLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImNvbnRyaWJ1dG9yc1wiLFxuICAgICAgICAgICAgICAgICAgICByZWw6IFwibm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwiY29udHJpYnV0b3JzXCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIuIENvbnRyaWJ1dGUgb24gXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LXNlY29uZGFyeVwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogXCJodHRwczovL2dpdGh1Yi5jb20vZGFtY2NsZWFuL2hhY2t0b2JlcmZlc3QtZmluZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiR2l0SHViIVwiLFxuICAgICAgICAgICAgICAgICAgICByZWw6IFwibm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwiR2l0SHViIVwiKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibXgtMiB3LTYgaC02XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly93d3cuZGlnaXRhbG9jZWFuLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRGlnaXRhbE9jZWFuXCIsXG4gICAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgICByZWw6IFwibm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidy02IGgtNlwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBcIi9pbWFnZXMvZGlnaXRhbC1vY2Vhbi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgYWx0OiBcIkRpZ2l0YWxPY2VhblwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJteC0yIHctNiBoLTZcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaHJlZjogXCJodHRwczovL2Rldi50b1wiLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiREVWXCIsXG4gICAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgICByZWw6IFwibm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidy02IGgtNlwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBcIi9pbWFnZXMvZGV2LnN2Z1wiLCBhbHQ6IFwiREVWXCIgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdXG4gICAgICAgIClcbiAgICAgIF1cbiAgICApXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImZpeGVkLWhlYWRlclwiLCBbXG4gICAgX2MoXG4gICAgICBcImhlYWRlclwiLFxuICAgICAge1xuICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICBcImNvbnRhaW5lciBteC1hdXRvIG15LTYgZmxleCBmbGV4LXJvdyBmbGV4LXdyYXAganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiXG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZmxleCBmbGV4LXJvdyBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGxvZ28td3JhcHBlclwiIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibG9nby1saW5rXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9oYWNrdG9iZXJmZXN0LmRpZ2l0YWxvY2Vhbi5jb21cIixcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkhhY2t0b2JlcmZlc3QgMjAxOVwiLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgICAgICAgICAgICAgICAgcmVsOiBcIm5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm14LWF1dG8gbWQ6dy02NCBzbTp3LWZ1bGwgbG9nb1wiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBcIi9pbWFnZXMvaGVhZGVyLnN2Z1wiLFxuICAgICAgICAgICAgICAgICAgICBhbHQ6IFwiSGFja3RvYmVyZmVzdCAyMDE5XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImgxXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgIFwidGV4dC01eGwgZm9udC1ib2xkIHRleHQtcHJpbWFyeSB1cHBlcmNhc2UgbXgtYXV0byBteS00IG1kOm15LTAgdGV4dC1jZW50ZXIgbG9nby10aXRsZVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgSXNzdWUgRmluZGVyXFxuICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgXCJ3LWZ1bGwgbWQ6dy1hdXRvIGZsZXggZmxleC1yb3cgZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWFyb3VuZCBteC1hdXRvIG15LTRcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1wcmltYXJ5IHRleHQtbGcgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgbXgtMlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgRmlsdGVyIEJ5OlxcbiAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2xpY2stb3V0c2lkZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtY2xpY2stb3V0c2lkZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmhpZGVGaWx0ZXIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiaGlkZUZpbHRlclwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgIFwiZmxleCBmbGV4LWNvbHVtbiBqdXN0aWZ5LWFyb3VuZCBpdGVtcy1jZW50ZXIgZmlsdGVyIHJlbGF0aXZlXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXByaW1hcnkgdGV4dC1sZyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSByZWxhdGl2ZSBmb2N1czpvdXRsaW5lLW5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogX3ZtLnRvZ2dsZUZpbHRlciB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICAgICAgTGFuZ3VhZ2VcXG4gICAgICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmlzRmlsdGVyVG9nZ2xlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiaXNGaWx0ZXJUb2dnbGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgIFwiZmlsdGVyLXZhbHVlcyBmbGV4IGZsZXgtY29sIGJnLXByaW1hcnkgYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBtdC0yIHctNDggc2hhZG93LXhsIHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIG92ZXJmbG93LXktYXV0byBib3JkZXItMiBib3JkZXItcHJpbWFyeSBib3JkZXItc29saWQgaC02NFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvbnQtYm9sZCB0ZXh0LW1kIHAtMiBsYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXdoaXRlIGJnLXNlY29uZGFyeSBob3ZlcjpiZy1zZWNvbmRhcnkgaG92ZXI6dGV4dC13aGl0ZVwiOiAhX3ZtLmN1cnJlbnRMYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXNlY29uZGFyeSBiZy1wcmltYXJ5IGhvdmVyOmJnLXNlY29uZGFyeSBob3Zlcjp0ZXh0LXdoaXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRMYW5ndWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmNob29zZUxhbmd1YWdlKFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJBbnlcIildXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0ubGFuZ3VhZ2VzLCBmdW5jdGlvbihsYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb250LXRoaW4gdGV4dC1zbSBwLTIgbGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC13aGl0ZSBiZy1zZWNvbmRhcnkgaG92ZXI6Ymctc2Vjb25kYXJ5IGhvdmVyOnRleHQtd2hpdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudExhbmd1YWdlID09PSBsYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXNlY29uZGFyeSBiZy1wcmltYXJ5IGhvdmVyOmJnLXNlY29uZGFyeSBob3Zlcjp0ZXh0LXdoaXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRMYW5ndWFnZSAhPT0gbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB0ZXh0Q29udGVudDogX3ZtLl9zKGxhbmd1YWdlKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uY2hvb3NlTGFuZ3VhZ2UobGFuZ3VhZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1wcmltYXJ5IHRleHQtbGcgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgbXgtMlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgL1xcbiAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgIFwidGV4dC1wcmltYXJ5IHRleHQtbGcgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgbXgtMiBweC0yIHB5LTEgcm91bmRlZCBib3JkZXItMVwiLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB7IFwiYmctcHJpbWFyeSB0ZXh0LXNlY29uZGFyeVwiOiBfdm0ubm9SZXBseU9ubHkgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IF92bS50b2dnbGVOb1JlcGx5RmlsdGVyIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICBObyBSZXBseVxcbiAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZmxleCBmbGV4LXJvdyBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibWQ6dy02NCBzbTp3LWZ1bGxcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXByaW1hcnlcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5hdXRvUmVmcmVzaCxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImF1dG9SZWZyZXNoXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1yLTIgbGVhZGluZy10aWdodFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJjaGVja2JveFwiIH0sXG4gICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBBcnJheS5pc0FycmF5KF92bS5hdXRvUmVmcmVzaClcbiAgICAgICAgICAgICAgICAgICAgICA/IF92bS5faShfdm0uYXV0b1JlZnJlc2gsIG51bGwpID4gLTFcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5hdXRvUmVmcmVzaFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyICQkYSA9IF92bS5hdXRvUmVmcmVzaCxcbiAgICAgICAgICAgICAgICAgICAgICAgICQkZWwgPSAkZXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgJCRjID0gJCRlbC5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoJCRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICQkdiA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICQkaSA9IF92bS5faSgkJGEsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkJGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJCRpIDwgMCAmJiAoX3ZtLmF1dG9SZWZyZXNoID0gJCRhLmNvbmNhdChbJCR2XSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAkJGkgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChfdm0uYXV0b1JlZnJlc2ggPSAkJGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCAkJGkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KCQkYS5zbGljZSgkJGkgKyAxKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hdXRvUmVmcmVzaCA9ICQkY1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14c1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBBdXRvIFJlZnJlc2hcXG4gICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1wcmltYXJ5IHRleHQteHMgZm9udC1zZW1pYm9sZCBteC0yIG15LTJcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBfdm0ucmVmcmVzaExhbmd1YWdlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgICAgIChyZWZyZXNoKVxcbiAgICAgICAgICAgICAgICBcIildXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF92bS5jdXJyZW50TGFuZ3VhZ2VcbiAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LXByaW1hcnkgdGV4dC14cyBmb250LXNlbWlib2xkIG14LTIgbXktMlwiLFxuICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdGV4dENvbnRlbnQ6IF92bS5fcyhfdm0uY3VycmVudExhbmd1YWdlICsgXCI6XCIpIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF92bS5fbChfdm0ubGFiZWxzLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1hbWJlciB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgbXgtMiBteS0yXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHRleHRDb250ZW50OiBfdm0uX3MoXCIjXCIgKyBuYW1lLnRvTG93ZXJDYXNlKCkpIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5yZW1vdmVMYWJlbChuYW1lKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSxcbiAgICAgICAgICAyXG4gICAgICAgIClcbiAgICAgIF1cbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcIm1haW5cIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXIgbXgtYXV0byBteS0xMlwiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImdyaWRcIiwgYXR0cnM6IHsgaWQ6IFwicmVzdWx0c1wiIH0gfSxcbiAgICAgIF92bS5fbChfdm0ucmVzdWx0cywgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICBcImJnLXdoaXRlIGhvdmVyOmJnLXBpbmtpc2ggcm91bmRlZC1sZyBwLTIgdGV4dC1ibGFjayBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gb3ZlcmZsb3cteS1hdXRvIHNoYWRvdy1sZyBncmlkLWl0ZW1cIixcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnRvZ2dsZUlzc3VlKHJlc3VsdClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgIFwiZmxleCBmbGV4LXdyYXAgZmxleC1yb3cgdy1mdWxsIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi0yXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgX3ZtLl9sKHJlc3VsdC5sYWJlbHMsIGZ1bmN0aW9uKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICBcInRleHQtY2VudGVyIHJvdW5kZWQtc20gdGV4dC14cyBweC0yIHB5LTEgbS0xIHNoYWRvdy1tZFwiLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250LWJvbGRcIjogX3ZtLmxhYmVscy5pbmNsdWRlcyhsYWJlbC5uYW1lLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiBcIiNcIiArIGxhYmVsLmNvbG9yIH0sXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB0ZXh0Q29udGVudDogX3ZtLl9zKGxhYmVsLm5hbWUudG9Mb3dlckNhc2UoKSkgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uYXBwZW5kTGFiZWwobGFiZWwubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaDJcIiwge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LWNlbnRlciB0ZXh0LXhsIG1iLTQgZm9udC1ib2xkXCIsXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHRleHRDb250ZW50OiBfdm0uX3MocmVzdWx0LnRpdGxlKSB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImgzXCIsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1jZW50ZXIgdGV4dC1ibHVlIHRleHQtc20gbWItNCBicmVhay13b3Jkc1wiLFxuICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBfdm0uX3MocmVzdWx0LnVzZXIubG9naW4gKyBcIi9cIiArIHJlc3VsdC5yZXBvVGl0bGUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWxlZnQgYm9yZGVyLWdyYXkgYm9yZGVyLXNvbGlkIGJvcmRlci1sLTQgcGwtMiB0ZXh0LXNtIG1iLTQgdHJ1bmNhdGUgbWF4LXcteHNcIixcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdGV4dENvbnRlbnQ6IF92bS5fcyhyZXN1bHQuYm9keSkgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgIV92bS5ub1JlcGx5T25seVxuICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQtY2VudGVyIHRleHQteHMgbWItNFwiLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgXCJ0ZXh0LWFtYmVyXCI6ICFyZXN1bHQuY29tbWVudHMgfSxcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNvbW1lbnRzID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIlJlcGxpZXM6IFwiICsgcmVzdWx0LmNvbW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiR2ltbWUgR2ltbWVcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQtbGVmdCB0ZXh0LXhzIG1iLTRcIixcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogX3ZtLl9zKFwiT3BlbmQgYnk6IFwiICsgcmVzdWx0LnVzZXIubG9naW4pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1jZW50ZXIgdGV4dC14cyBtYi00XCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcInRpbWVcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRhdGV0aW1lOiByZXN1bHQudW5mb3JtYXR0ZWREYXRlIH0sXG4gICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBfdm0uX3MoXCJMYXN0IHVwZGF0ZWQ6IFwiICsgcmVzdWx0LmZvcm1hdHRlZERhdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdXG4gICAgICAgIClcbiAgICAgIH0pLFxuICAgICAgMFxuICAgICksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfdm0uc2hvd1ZpZXdNb3JlIHx8IF92bS5pc0ZldGNoaW5nXG4gICAgICA/IF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtdC02XCIgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgIFwidXBwZXJjYXNlIGZvbnQtdGhpbiB0ZXh0LXByaW1hcnkgYm9yZGVyLTIgYm9yZGVyLXByaW1hcnkgdGV4dC0zeGwgYmctc2Vjb25kYXJ5IGhvdmVyOmJnLXByaW1hcnkgaG92ZXI6dGV4dC1zZWNvbmRhcnkgcHktMiBweC00IHJvdW5kZWRcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiwgZGlzYWJsZWQ6IF92bS5pc0ZldGNoaW5nIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IF92bS5fcyhcbiAgICAgICAgICAgICAgICAgIF92bS5pc0ZldGNoaW5nID8gXCJMb2FkaW5nIE1vcmUgSXNzdWVzLi4uXCIgOiBcIkxvYWQgTW9yZSBJc3N1ZXNcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb246IHsgY2xpY2s6IF92bS5sb2FkTW9yZUlzc3VlcyB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgKVxuICAgICAgOiBfdm0ucmVzdWx0cy5sZW5ndGggPT09IDBcbiAgICAgID8gX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG10LTZcIiB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICBcInVwcGVyY2FzZSBmb250LXRoaW4gdGV4dC1wcmltYXJ5IHRleHQtM3hsIGJnLXNlY29uZGFyeSBweS0yIHB4LTRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgTm8gaXNzdWVzIGZvdW5kXFxuICAgICAgICBcIildXG4gICAgICAgICAgICApXG4gICAgICAgICAgXVxuICAgICAgICApXG4gICAgICA6IF92bS5fZSgpXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInNlY3Rpb25cIixcbiAgICB7XG4gICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgXCJncmlkLWl0ZW0tY29udGFpbmVyIGZpeGVkIHRvcC0wIGJvdHRvbS0wIGxlZnQtMCByaWdodC0wIG1heC13LWZ1bGwgaC1mdWxsXCIsXG4gICAgICBvbjogeyBjbGljazogX3ZtLmNsb3NlTW9kYWwgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiYVwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICBcImJnLXdoaXRlIGhvdmVyOmJnLXBpbmtpc2ggcm91bmRlZC1sZyBwLTIgdGV4dC1ibGFjayBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gb3ZlcmZsb3cteS1hdXRvIHNoYWRvdy1sZyBncmlkLWl0ZW0gbWF4LXctbWQgbXgtYXV0b1wiLFxuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICBocmVmOiBfdm0uY3VycmVudFJlc3VsdC5odG1sX3VybCxcbiAgICAgICAgICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICAgICAgICAgIHRpdGxlOiBfdm0uY3VycmVudFJlc3VsdC50aXRsZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgIHJldHVybiBfdm0ub3BlbldpbmRvdygkZXZlbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICBcImZsZXggZmxleC13cmFwIGZsZXgtcm93IHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItMlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3ZtLl9sKF92bS5jdXJyZW50UmVzdWx0LmxhYmVscywgZnVuY3Rpb24obGFiZWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICBcInRleHQtY2VudGVyIHJvdW5kZWQtc20gdGV4dC14cyBweC0yIHB5LTEgbS0xIHNoYWRvdy1tZFwiLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICBcImZvbnQtYm9sZFwiOiBfdm0ubGFiZWxzLmluY2x1ZGVzKGxhYmVsLm5hbWUudG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogXCIjXCIgKyBsYWJlbC5jb2xvciB9LFxuICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHRleHRDb250ZW50OiBfdm0uX3MobGFiZWwubmFtZS50b0xvd2VyQ2FzZSgpKSB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJoMlwiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LWNlbnRlciB0ZXh0LXhsIG1iLTQgZm9udC1ib2xkXCIsXG4gICAgICAgICAgICBkb21Qcm9wczogeyB0ZXh0Q29udGVudDogX3ZtLl9zKF92bS5jdXJyZW50UmVzdWx0LnRpdGxlKSB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImgzXCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQtY2VudGVyIHRleHQtYmx1ZSB0ZXh0LXNtIG1iLTQgYnJlYWstd29yZHNcIixcbiAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgIHRleHRDb250ZW50OiBfdm0uX3MoXG4gICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRSZXN1bHQudXNlci5sb2dpbiArIFwiL1wiICsgX3ZtLmN1cnJlbnRSZXN1bHQucmVwb1RpdGxlXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICBcInRleHQtbGVmdCBib3JkZXItZ3JheSBib3JkZXItc29saWQgYm9yZGVyLWwtNCBwbC0yIHRleHQtc20gbWItNCBvdmVyZmxvdy1oaWRkZW4gb3ZlcmZsb3cteS1zY3JvbGwgbWF4LXctc20gd2hpdGVzcGFjZS1wcmUtd3JhcCBoLWZ1bGxcIixcbiAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IFwibWF4LWhlaWdodFwiOiBcIjE0cmVtXCIgfSxcbiAgICAgICAgICAgIGRvbVByb3BzOiB7IHRleHRDb250ZW50OiBfdm0uX3MoX3ZtLmN1cnJlbnRSZXN1bHQuYm9keSkgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgIV92bS5ub1JlcGx5T25seVxuICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1jZW50ZXIgdGV4dC14cyBtYi00XCIsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHsgXCJ0ZXh0LWFtYmVyXCI6ICFfdm0uY3VycmVudFJlc3VsdC5jb21tZW50cyB9LFxuICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudFJlc3VsdC5jb21tZW50cyA+IDBcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiUmVwbGllczogXCIgKyBfdm0uY3VycmVudFJlc3VsdC5jb21tZW50c1xuICAgICAgICAgICAgICAgICAgICAgIDogXCJHaW1tZSBHaW1tZVwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQtbGVmdCB0ZXh0LXhzIG1iLTRcIixcbiAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgIHRleHRDb250ZW50OiBfdm0uX3MoXCJPcGVuZCBieTogXCIgKyBfdm0uY3VycmVudFJlc3VsdC51c2VyLmxvZ2luKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LWNlbnRlciB0ZXh0LXhzIG1iLTRcIiB9LCBbXG4gICAgICAgICAgICBfYyhcInRpbWVcIiwge1xuICAgICAgICAgICAgICBhdHRyczogeyBkYXRldGltZTogX3ZtLmN1cnJlbnRSZXN1bHQudW5mb3JtYXR0ZWREYXRlIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IF92bS5fcyhcbiAgICAgICAgICAgICAgICAgIFwiTGFzdCB1cGRhdGVkOiBcIiArIF92bS5jdXJyZW50UmVzdWx0LmZvcm1hdHRlZERhdGVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXVxuICAgICAgKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyBJTVBPUlRBTlQ6IERvIE5PVCB1c2UgRVMyMDE1IGZlYXR1cmVzIGluIHRoaXMgZmlsZSAoZXhjZXB0IGZvciBtb2R1bGVzKS5cbi8vIFRoaXMgbW9kdWxlIGlzIGEgcnVudGltZSB1dGlsaXR5IGZvciBjbGVhbmVyIGNvbXBvbmVudCBtb2R1bGUgb3V0cHV0IGFuZCB3aWxsXG4vLyBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgd2VicGFjayB1c2VyIGJ1bmRsZS5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgc2NyaXB0RXhwb3J0cyxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZ1bmN0aW9uYWxUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyLCAvKiBzZXJ2ZXIgb25seSAqL1xuICBzaGFkb3dNb2RlIC8qIHZ1ZS1jbGkgb25seSAqL1xuKSB7XG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAocmVuZGVyKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSByZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IHN0YXRpY1JlbmRlckZuc1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZVxuICB9XG5cbiAgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuICBpZiAoZnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5mdW5jdGlvbmFsID0gdHJ1ZVxuICB9XG5cbiAgLy8gc2NvcGVkSWRcbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gJ2RhdGEtdi0nICsgc2NvcGVJZFxuICB9XG5cbiAgdmFyIGhvb2tcbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHsgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID1cbiAgICAgICAgY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgICAodGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCkgfHwgLy8gc3RhdGVmdWxcbiAgICAgICAgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCkgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fXG4gICAgICB9XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuICAgICAgaWYgKGluamVjdFN0eWxlcykge1xuICAgICAgICBpbmplY3RTdHlsZXMuY2FsbCh0aGlzLCBjb250ZXh0KVxuICAgICAgfVxuICAgICAgLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcnJlbmNlXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcilcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9va1xuICB9IGVsc2UgaWYgKGluamVjdFN0eWxlcykge1xuICAgIGhvb2sgPSBzaGFkb3dNb2RlXG4gICAgICA/IGZ1bmN0aW9uICgpIHsgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgdGhpcy4kcm9vdC4kb3B0aW9ucy5zaGFkb3dSb290KSB9XG4gICAgICA6IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICBpZiAob3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgICAvLyBmb3IgdGVtcGxhdGUtb25seSBob3QtcmVsb2FkIGJlY2F1c2UgaW4gdGhhdCBjYXNlIHRoZSByZW5kZXIgZm4gZG9lc24ndFxuICAgICAgLy8gZ28gdGhyb3VnaCB0aGUgbm9ybWFsaXplclxuICAgICAgb3B0aW9ucy5faW5qZWN0U3R5bGVzID0gaG9va1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9hbCBjb21wb25lbnQgaW4gdnVlIGZpbGVcbiAgICAgIHZhciBvcmlnaW5hbFJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUmVuZGVyKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZ1xuICAgICAgICA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaylcbiAgICAgICAgOiBbaG9va11cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8vIFJlcXVpcmUgZGVwZW5kZW5jaWVzXG53aW5kb3cuVnVlID0gcmVxdWlyZSgndnVlJyk7XG53aW5kb3cuQnVzID0gbmV3IFZ1ZTtcblxuLy8gQ29uZmlndXJlIFZ1ZVxuVnVlLmNvbmZpZy5wcm9kdWN0aW9uVGlwID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG5cbi8vIEB1cmwgaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1kZXZ0b29sc1xuVnVlLmNvbmZpZy5kZXZ0b29scyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuXG4vLyBDcmVhdGUgYSBWdWUgY29tcG9uZW50XG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50cy9BcHAnO1xuXG4vLyBDcmVhdGUgYSBWdWUgaW5zdGFuY2Vcbm5ldyBWdWUoe1xuICByZW5kZXI6IGggPT4gaChBcHApXG59KS4kbW91bnQoJyNhcHAnKTtcbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD05YzlkMjBmNiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVm9sdW1lcy9NYWNrdXAvR2l0SHViL2hhY2t0b2JlcmZlc3QtZmluZGVyL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzljOWQyMGY2JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzljOWQyMGY2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzljOWQyMGY2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTljOWQyMGY2JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzljOWQyMGY2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvY29tcG9uZW50cy9BcHAudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD05YzlkMjBmNiZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQXBwRm9vdGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02ZTJmOTYwMCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9BcHBGb290ZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9BcHBGb290ZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVm9sdW1lcy9NYWNrdXAvR2l0SHViL2hhY2t0b2JlcmZlc3QtZmluZGVyL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzZlMmY5NjAwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzZlMmY5NjAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzZlMmY5NjAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9BcHBGb290ZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZlMmY5NjAwJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzZlMmY5NjAwJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvY29tcG9uZW50cy9BcHBGb290ZXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHBGb290ZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcEZvb3Rlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwRm9vdGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02ZTJmOTYwMCZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQXBwSGVhZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lMTNjMGMxYyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9BcHBIZWFkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9BcHBIZWFkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVm9sdW1lcy9NYWNrdXAvR2l0SHViL2hhY2t0b2JlcmZlc3QtZmluZGVyL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJ2UxM2MwYzFjJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2UxM2MwYzFjJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2UxM2MwYzFjJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9BcHBIZWFkZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWUxM2MwYzFjJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2UxM2MwYzFjJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvY29tcG9uZW50cy9BcHBIZWFkZXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHBIZWFkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcEhlYWRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwSGVhZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lMTNjMGMxYyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQXBwTWFpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ODM5ZGQzNDQmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQXBwTWFpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0FwcE1haW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVm9sdW1lcy9NYWNrdXAvR2l0SHViL2hhY2t0b2JlcmZlc3QtZmluZGVyL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzgzOWRkMzQ0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzgzOWRkMzQ0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzgzOWRkMzQ0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9BcHBNYWluLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD04MzlkZDM0NCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc4MzlkZDM0NCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2pzL2NvbXBvbmVudHMvQXBwTWFpbi52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcE1haW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcE1haW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcE1haW4udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTgzOWRkMzQ0JlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9BcHBNYWluTW9kYWwudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNjODBiNjlmJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0FwcE1haW5Nb2RhbC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0FwcE1haW5Nb2RhbC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Wb2x1bWVzL01hY2t1cC9HaXRIdWIvaGFja3RvYmVyZmVzdC1maW5kZXIvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnM2M4MGI2OWYnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnM2M4MGI2OWYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnM2M4MGI2OWYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0FwcE1haW5Nb2RhbC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2M4MGI2OWYmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignM2M4MGI2OWYnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9qcy9jb21wb25lbnRzL0FwcE1haW5Nb2RhbC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcE1haW5Nb2RhbC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwTWFpbk1vZGFsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHBNYWluTW9kYWwudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNjODBiNjlmJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==