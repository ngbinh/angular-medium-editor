'use strict';
angular.module('angular-medium-editor', []).directive('mediumEditor', function () {
  return {
    require: 'ngModel',
    restrict: 'AE',
    scope: { bindOptions: '=' },
    link: function (scope, iElement, iAttrs, ctrl) {
      angular.element(iElement).addClass('angular-medium-editor');
      // Parse options
      var opts = {}, placeholder = '';
      var prepOpts = function () {
        if (iAttrs.options) {
          opts = scope.$eval(iAttrs.options);
        }
        var bindOpts = {};
        if (scope.bindOptions !== undefined) {
          bindOpts = scope.bindOptions;
        }
        opts = angular.extend(opts, bindOpts);
      };
      prepOpts();
      placeholder = opts.placeholder;
      // model -> view
      ctrl.$render = function () {
        if (!this.editor) {
          // Hide placeholder when the model is not empty
          if (!ctrl.$isEmpty(ctrl.$viewValue)) {
            opts.placeholder = '';
          }
          this.editor = new MediumEditor(iElement, opts);
        }
        iElement.html(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
      };
    }
  };
});
