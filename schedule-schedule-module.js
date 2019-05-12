(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["schedule-schedule-module"],{

/***/ "./src/app/components/schedule/day/day.page.html":
/*!*******************************************************!*\
  !*** ./src/app/components/schedule/day/day.page.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-toolbar>\n\n  </ion-toolbar>\n</ion-header>\n\n<ion-header>\n  <ion-toolbar color=\"tertiary\">\n  <ion-buttons slot=\"start\">\n      <ion-back-button text=\"\" icon=\"arrow-back\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>\n      {{ (day$ | async)?.title | appTranslate }} {{ (day$ | async)?.description | appTranslate }}\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-header>\n  <ion-segment scrollable (ionChange)=\"setFilter($event)\">\n      <ion-segment-button [value]=\"EventCategory.Children\">\n      <ion-icon name=\"ice-cream\"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button [value]=\"EventCategory.Championship\">\n      <ion-icon name=\"trophy\"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button [value]=\"EventCategory.Restaurant\">\n      <ion-icon name=\"restaurant\"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button [value]=\"EventCategory.Music\">\n      <ion-icon name=\"musical-notes\"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button [value]=\"EventCategory.Show\">\n      <ion-icon name=\"eye\"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button [value]=\"EventCategory.People\">\n      <ion-icon name=\"md-contacts\"></ion-icon>\n      </ion-segment-button>\n  </ion-segment>\n</ion-header>\n\n<ion-content class=\"schedule-details\">\n  <ion-list>\n      <ion-item-divider *ngIf=\"category\" light>{{ category | translate }}</ion-item-divider>\n      <ion-item *ngFor=\"let event of (day$ | async)?.schedule\">\n        <ion-label text-wrap>\n          <div>{{ event.time }} <ion-icon name=\"{{ event.category | appEventCategory }}\" left></ion-icon></div>\n          <p>{{ event.description | appTranslate }}</p>\n        </ion-label>\n        <div slot=\"end\">\n          <ion-icon color=\"danger\" size=\"large\" [appFavourite]=\"event\" ></ion-icon>\n        </div>\n      </ion-item>\n      <ion-item  *ngIf=\"(day$ | async)?.schedule.length === 0\">\n        <p>{{ 'NO_RESULTS' | translate }}</p>\n      </ion-item>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/components/schedule/day/day.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/components/schedule/day/day.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvZGF5L2RheS5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/components/schedule/day/day.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/schedule/day/day.page.ts ***!
  \*****************************************************/
/*! exports provided: DayPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayPage", function() { return DayPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain */ "./src/app/domain/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _day_presenter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./day.presenter */ "./src/app/components/schedule/day/day.presenter.ts");






var DayPage = /** @class */ (function () {
    function DayPage(route, state) {
        var _this = this;
        this.route = route;
        this.EventCategory = _domain__WEBPACK_IMPORTED_MODULE_2__["EventCategory"];
        this.dayIndex = 0;
        this.categoryNames = new Map([
            [_domain__WEBPACK_IMPORTED_MODULE_2__["EventCategory"].Children, 'CATEGORY_KIDS'],
            [_domain__WEBPACK_IMPORTED_MODULE_2__["EventCategory"].Championship, 'CATEGORY_CHAMPIONSHIP'],
            [_domain__WEBPACK_IMPORTED_MODULE_2__["EventCategory"].People, 'CATEGORY_PARTICIPATE'],
            [_domain__WEBPACK_IMPORTED_MODULE_2__["EventCategory"].Restaurant, 'CATEGORY_GASTRONOMIC'],
            [_domain__WEBPACK_IMPORTED_MODULE_2__["EventCategory"].Music, 'CATEGORY_MUSIC'],
            [_domain__WEBPACK_IMPORTED_MODULE_2__["EventCategory"].Show, 'CATEGORY_SHOW'],
        ]);
        this.presenter = new _day_presenter__WEBPACK_IMPORTED_MODULE_5__["DayPresenter"](state);
        this.day$ = this.route.paramMap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (params) {
            _this.dayIndex = parseInt(params.get('id') + '', 10);
            return _this.presenter.setDay(_this.dayIndex, undefined);
        }));
    }
    Object.defineProperty(DayPage.prototype, "category", {
        get: function () {
            return this.presenter.filter ? this.categoryNames.get(this.presenter.filter) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    DayPage.prototype.setFilter = function ($event) {
        this.day$ = this.presenter.setDay(this.dayIndex, $event.detail.value);
    };
    DayPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-day',
            template: __webpack_require__(/*! ./day.page.html */ "./src/app/components/schedule/day/day.page.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./day.page.scss */ "./src/app/components/schedule/day/day.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _domain__WEBPACK_IMPORTED_MODULE_2__["IState"]])
    ], DayPage);
    return DayPage;
}());



/***/ }),

/***/ "./src/app/components/schedule/day/day.presenter.ts":
/*!**********************************************************!*\
  !*** ./src/app/components/schedule/day/day.presenter.ts ***!
  \**********************************************************/
/*! exports provided: DayPresenter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayPresenter", function() { return DayPresenter; });
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain */ "./src/app/domain/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");


var DayPresenter = /** @class */ (function () {
    function DayPresenter(state) {
        this.state = state;
        this.schedule$ = this.state.schedule$;
    }
    DayPresenter.prototype.setDay = function (dayIndex, filter) {
        var _this = this;
        return this.schedule$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (days) {
            var day = days[dayIndex];
            _this.filterCategory = filter;
            if (_this.filterCategory) {
                return new _domain__WEBPACK_IMPORTED_MODULE_0__["EventDay"](day.title, day.description, day.schedule.filter(function (d) { return d.category === _this.filterCategory; }));
            }
            return day;
        }));
    };
    Object.defineProperty(DayPresenter.prototype, "filter", {
        get: function () {
            return this.filterCategory;
        },
        enumerable: true,
        configurable: true
    });
    return DayPresenter;
}());



/***/ }),

/***/ "./src/app/components/schedule/schedule.module.ts":
/*!********************************************************!*\
  !*** ./src/app/components/schedule/schedule.module.ts ***!
  \********************************************************/
/*! exports provided: ScheduleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScheduleModule", function() { return ScheduleModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _schedule_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./schedule.page */ "./src/app/components/schedule/schedule.page.ts");
/* harmony import */ var _day_day_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./day/day.page */ "./src/app/components/schedule/day/day.page.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/components/shared/shared.module.ts");










var ScheduleModule = /** @class */ (function () {
    function ScheduleModule() {
    }
    ScheduleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    { path: '', component: _schedule_page__WEBPACK_IMPORTED_MODULE_6__["SchedulePage"] },
                    { path: 'day/:id', component: _day_day_page__WEBPACK_IMPORTED_MODULE_7__["DayPage"] }
                ]),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"]
            ],
            declarations: [_schedule_page__WEBPACK_IMPORTED_MODULE_6__["SchedulePage"], _day_day_page__WEBPACK_IMPORTED_MODULE_7__["DayPage"]]
        })
    ], ScheduleModule);
    return ScheduleModule;
}());



/***/ }),

/***/ "./src/app/components/schedule/schedule.page.html":
/*!********************************************************!*\
  !*** ./src/app/components/schedule/schedule.page.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-toolbar>\n\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor=\"let day of (schedule$ | async); let i = index\" [routerLink]=\"['day', i]\" detail>\n      <ion-label>\n        <h2 class=\"subtitle\">{{ day.description | appTranslate }}</h2>\n        <div class=\"subsubtitle\">{{ day.title | appTranslate }}</div>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/components/schedule/schedule.page.scss":
/*!********************************************************!*\
  !*** ./src/app/components/schedule/schedule.page.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".subtitle {\n  font-size: 20px; }\n\n.subsubtitle {\n  opacity: 0.7; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FsYmVydG8vcHJvamVjdHMvZ3VydXR6ZXRhcHAvc3JjL2FwcC9jb21wb25lbnRzL3NjaGVkdWxlL3NjaGVkdWxlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQWUsRUFBQTs7QUFHakI7RUFDRSxZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NjaGVkdWxlL3NjaGVkdWxlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLnN1YnN1YnRpdGxlIHtcbiAgb3BhY2l0eTogMC43O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/components/schedule/schedule.page.ts":
/*!******************************************************!*\
  !*** ./src/app/components/schedule/schedule.page.ts ***!
  \******************************************************/
/*! exports provided: SchedulePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulePage", function() { return SchedulePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../domain */ "./src/app/domain/index.ts");
/* harmony import */ var _schedule_presenter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schedule.presenter */ "./src/app/components/schedule/schedule.presenter.ts");




var SchedulePage = /** @class */ (function () {
    function SchedulePage(state) {
        var presenter = new _schedule_presenter__WEBPACK_IMPORTED_MODULE_3__["SchedulePresenter"](state);
        this.schedule$ = presenter.schedule$;
    }
    SchedulePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-schedule',
            template: __webpack_require__(/*! ./schedule.page.html */ "./src/app/components/schedule/schedule.page.html"),
            styles: [__webpack_require__(/*! ./schedule.page.scss */ "./src/app/components/schedule/schedule.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_domain__WEBPACK_IMPORTED_MODULE_2__["IState"]])
    ], SchedulePage);
    return SchedulePage;
}());



/***/ }),

/***/ "./src/app/components/schedule/schedule.presenter.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/schedule/schedule.presenter.ts ***!
  \***********************************************************/
/*! exports provided: SchedulePresenter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulePresenter", function() { return SchedulePresenter; });
var SchedulePresenter = /** @class */ (function () {
    function SchedulePresenter(state) {
        this.state = state;
        this.schedule$ = this.state.schedule$;
    }
    return SchedulePresenter;
}());



/***/ })

}]);
//# sourceMappingURL=schedule-schedule-module.js.map