(function() {
    "use strict";

    angular.module("app")
        .run(runApp);

    // manual bootstraping app, w/o ng-app directive
    angular.element(document).ready(() => {
        angular.bootstrap(document, ["app"]);
    });

    runApp.$inject = ['todoService', 'model'];

    function runApp(todoService, model) {
        todoService.getItems()
            .then(res => model.items = res)
            .catch(err => console.log(err));
    }


})();