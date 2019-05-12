(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["favourites-favourites-module"],{

/***/ "./src/app/components/favourites/favourites.module.ts":
/*!************************************************************!*\
  !*** ./src/app/components/favourites/favourites.module.ts ***!
  \************************************************************/
/*! exports provided: FavouritesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavouritesPageModule", function() { return FavouritesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _favourites_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./favourites.page */ "./src/app/components/favourites/favourites.page.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/components/shared/shared.module.ts");









var FavouritesPageModule = /** @class */ (function () {
    function FavouritesPageModule() {
    }
    FavouritesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _favourites_page__WEBPACK_IMPORTED_MODULE_6__["FavouritesPage"] }]),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]
            ],
            declarations: [_favourites_page__WEBPACK_IMPORTED_MODULE_6__["FavouritesPage"]]
        })
    ], FavouritesPageModule);
    return FavouritesPageModule;
}());



/***/ }),

/***/ "./src/app/components/favourites/favourites.page.html":
/*!************************************************************!*\
  !*** ./src/app/components/favourites/favourites.page.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-toolbar>\n\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngIf=\"!((favourites$ | async)?.length)\">\n      <ion-label text-wrap>\n        {{ 'NO_FAVOURITES_YET' | translate }}\n      </ion-label>\n    </ion-item>\n\n    <ion-item-group *ngFor=\"let day of ((favourites$ | async))\">\n      <ion-item-divider>\n        <ion-label>{{ day.title | appTranslate }} - {{ day.description | appTranslate }}</ion-label>\n      </ion-item-divider>\n      <ion-item *ngFor=\"let event of day.schedule\">\n        <ion-label text-wrap>\n          <div>{{ event.time }} <ion-icon name=\"{{ event.category | appEventCategory }}\" left></ion-icon></div>\n          <p>{{ event.description | appTranslate }}</p>\n        </ion-label>\n        <div slot=\"end\">\n          <ion-icon color=\"danger\" size=\"large\" [appFavourite]=\"event\" ></ion-icon>\n        </div>\n      </ion-item>\n    </ion-item-group>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/components/favourites/favourites.page.scss":
/*!************************************************************!*\
  !*** ./src/app/components/favourites/favourites.page.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZmF2b3VyaXRlcy9mYXZvdXJpdGVzLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/components/favourites/favourites.page.ts":
/*!**********************************************************!*\
  !*** ./src/app/components/favourites/favourites.page.ts ***!
  \**********************************************************/
/*! exports provided: FavouritesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavouritesPage", function() { return FavouritesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../domain */ "./src/app/domain/index.ts");
/* harmony import */ var _favourites_presenter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./favourites.presenter */ "./src/app/components/favourites/favourites.presenter.ts");




var FavouritesPage = /** @class */ (function () {
    function FavouritesPage(state) {
        var presenter = new _favourites_presenter__WEBPACK_IMPORTED_MODULE_3__["FavouritesPresenter"](state);
        this.favourites$ = presenter.favourites$;
    }
    FavouritesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-favourites',
            template: __webpack_require__(/*! ./favourites.page.html */ "./src/app/components/favourites/favourites.page.html"),
            styles: [__webpack_require__(/*! ./favourites.page.scss */ "./src/app/components/favourites/favourites.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_domain__WEBPACK_IMPORTED_MODULE_2__["IState"]])
    ], FavouritesPage);
    return FavouritesPage;
}());



/***/ }),

/***/ "./src/app/components/favourites/favourites.presenter.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/favourites/favourites.presenter.ts ***!
  \***************************************************************/
/*! exports provided: FavouritesPresenter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavouritesPresenter", function() { return FavouritesPresenter; });
var FavouritesPresenter = /** @class */ (function () {
    function FavouritesPresenter(state) {
        this.state = state;
        this.favourites$ = this.state.favourites$;
    }
    return FavouritesPresenter;
}());



/***/ })

}]);
//# sourceMappingURL=favourites-favourites-module.js.map