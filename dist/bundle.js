/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Location_1 = __webpack_require__(1);
	var Grid_1 = __webpack_require__(2);
	var Battlefield_1 = __webpack_require__(3);
	var grid = new Grid_1["default"](20, 15, 50);
	var canvas = document.getElementById("battlefield");
	var battlefield = new Battlefield_1["default"](canvas, grid);
	var ranger = new Location_1["default"](3, 3);
	var pet = new Location_1["default"](3, 4);
	var selected_entity = ranger;
	document.addEventListener("keydown", function (event) {
	    var updated = true;
	    if (event.key === '1') {
	        selected_entity = ranger;
	    }
	    else if (event.key === '2') {
	        selected_entity = pet;
	    }
	    else if (event.key === 'ArrowRight') {
	        event.preventDefault();
	        selected_entity.x += 1;
	        if (selected_entity.x > battlefield.grid.columns) {
	            selected_entity.x = battlefield.grid.columns;
	        }
	    }
	    else if (event.key === 'ArrowLeft') {
	        event.preventDefault();
	        selected_entity.x -= 1;
	        if (selected_entity.x < 1) {
	            selected_entity.x = 1;
	        }
	    }
	    else if (event.key === 'ArrowUp') {
	        event.preventDefault();
	        selected_entity.y -= 1;
	        if (selected_entity.y < 1) {
	            selected_entity.y = 1;
	        }
	    }
	    else if (event.key === 'ArrowDown') {
	        event.preventDefault();
	        selected_entity.y += 1;
	        if (selected_entity.y > battlefield.grid.rows) {
	            selected_entity.y = battlefield.grid.rows;
	        }
	    }
	    else {
	        updated = false;
	    }
	    if (updated) {
	        battlefield.draw(selected_entity);
	    }
	});
	battlefield.addEntity(ranger);
	battlefield.addEntity(pet);
	battlefield.draw(selected_entity);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var Location = (function () {
	    function Location(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    Location.prototype.draw = function (canvas) {
	        var context = canvas.getContext('2d');
	    };
	    return Location;
	}());
	exports.__esModule = true;
	exports["default"] = Location;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Grid = (function () {
	    function Grid(columns, rows, cell_size) {
	        this.columns = columns;
	        this.rows = rows;
	        this.cell_size = cell_size;
	    }
	    Grid.prototype.width = function () {
	        return this.columns * this.cell_size;
	    };
	    Grid.prototype.height = function () {
	        return this.rows * this.cell_size;
	    };
	    Grid.prototype.draw = function (context) {
	        for (var x = 0; x <= this.columns * this.cell_size; x += this.cell_size) {
	            context.moveTo(x, 0);
	            context.lineTo(x, this.rows * this.cell_size);
	        }
	        for (var y = 0; y <= this.rows * this.cell_size; y += this.cell_size) {
	            context.moveTo(0, y);
	            context.lineTo(this.columns * this.cell_size, y);
	        }
	        context.strokeStyle = "grey";
	        context.stroke();
	    };
	    return Grid;
	}());
	exports.__esModule = true;
	exports["default"] = Grid;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Battlefield = (function () {
	    function Battlefield(canvas, grid) {
	        this.canvas = canvas;
	        this.grid = grid;
	        this.canvas.width = this.grid.width();
	        this.canvas.height = this.grid.height();
	        this.entities = [];
	    }
	    Battlefield.prototype.addEntity = function (entity) {
	        this.entities.push(entity);
	    };
	    Battlefield.prototype.draw = function (selected_entity) {
	        var _this = this;
	        var context = this.canvas.getContext('2d');
	        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	        this.entities.forEach(function (entity) {
	            context.beginPath();
	            context.arc(entity.x * _this.grid.cell_size - _this.grid.cell_size / 2, entity.y * _this.grid.cell_size - _this.grid.cell_size / 2, _this.grid.cell_size / 2, 0, 2 * Math.PI, false);
	            context.closePath();
	            if (entity === selected_entity) {
	                context.fillStyle = 'green';
	            }
	            else {
	                context.fillStyle = 'red';
	            }
	            context.fill();
	        });
	        this.grid.draw(context);
	    };
	    return Battlefield;
	}());
	exports.__esModule = true;
	exports["default"] = Battlefield;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map