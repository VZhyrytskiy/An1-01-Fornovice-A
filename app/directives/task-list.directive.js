(function() {
    "use strict";

    angular.module("app")
        .directive("viTaskList", viTaskList);

    function viTaskList() {
        let directive = {
            restrict: "EA",
            templateUrl: "templates/table.html"
        };

        return directive;
    }
})();