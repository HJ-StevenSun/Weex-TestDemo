/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/7731ee0d1017fad0adf656990885c808", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(18);
	__webpack_require__(19);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      NUMBER_750: 750,
	      NUMBER_200: 200,
	      NUMBER_373: 373,
	      NUMBER_224:224,
	      NUMBER_4:4
	    }}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "container",
	  "shown": function () {return !this.ds.isHide},
	  "children": [
	    {
	      "type": "container",
	      "classList": [
	        "big-banner-container"
	      ],
	      "children": [
	        {
	          "type": "banner",
	          "attr": {
	            "width": function () {return this.NUMBER_750},
	            "height": function () {return this.NUMBER_200},
	            "src": function () {return this.ds.bigBannerImg},
	            "href": function () {return this.ds.bigBannerUrl}
	          }
	        }
	      ]
	    },
	    {
	      "type": "banners",
	      "attr": {
	        "ds": function () {return this.ds.smallBannerItems},
	        "width": function () {return this.NUMBER_373},
	        "height": function () {return this.NUMBER_224},
	        "direction": "row",
	        "space": function () {return this.NUMBER_4}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "big-banner-container": {
	    "marginBottom": 4
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/7731ee0d1017fad0adf656990885c808", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },

/***/ 18:
/***/ function(module, exports) {

	;__weex_define__("@weex-component/banner", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	        quality: 'normal',
	        width: 0,
	        height: 0,
	        src: '',
	        href: '',
	        spmc:0,
	        spmd:0
	    }},
	    methods: {
	      ready: function () {
	      },
	      _clickHandler: function () {
	        this.$call('modal', 'toast', {
	          message: 'click',
	          duration: 1
	        });
	      }
	    }
	  };

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "image",
	  "style": {
	    "width": function () {return this.width},
	    "height": function () {return this.height}
	  },
	  "attr": {
	    "src": function () {return this.src},
	    "imageQuality": function () {return this.quality}
	  },
	  "events": {
	    "click": "_clickHandler"
	  }
	})
	})

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/banners", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(18);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      space: 0,
	      width: 0,
	      height: 0,
	      spmc:0,
	      spmdprefix:'',
	      ds: []
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        var ds = self.ds;
	        var length = ds.length;
	        for (var i = 0; i < length; i++) {
	          var item = ds[i];
	          item.index = i;
	          item.space = (i % length === 0) ? 0 : self.space;
	        }
	      }
	    }
	  };

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "container",
	  "children": [
	    {
	      "type": "container",
	      "shown": function () {return this.direction==='row'},
	      "style": {
	        "flexDirection": "row"
	      },
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.ds},
	          "style": {
	            "width": function () {return this.width},
	            "height": function () {return this.height},
	            "marginLeft": function () {return this.space}
	          },
	          "children": [
	            {
	              "type": "banner",
	              "attr": {
	                "width": function () {return this.width},
	                "height": function () {return this.height},
	                "src": function () {return this.img},
	                "href": function () {return this.url}
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "container",
	      "shown": function () {return this.direction==='column'},
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.ds},
	          "style": {
	            "width": function () {return this.width},
	            "height": function () {return this.height},
	            "marginTop": function () {return this.space}
	          },
	          "children": [
	            {
	              "type": "banner",
	              "attr": {
	                "width": function () {return this.width},
	                "height": function () {return this.height},
	                "src": function () {return this.img},
	                "href": function () {return this.url}
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	})
	})

/***/ }

/******/ });