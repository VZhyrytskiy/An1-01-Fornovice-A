(function() {
    "use strict";

    angular.module("app")
        .controller("TodoController", TodoController);

    TodoController.$inject = ['model', 'todoService'];

    function TodoController(model, todoService) {
        let $ctrl = this;
        // API
        $ctrl.todo = model;
        // Дополнительные свойства
        $ctrl.orderBy = 'action';
        $ctrl.orderDesc = false;

        // Methods from Service
        $ctrl.addNewItem = todoService.addNewItem;
        $ctrl.incompleteCount = todoService.incompleteCount;
        $ctrl.warningLevel = todoService.warningLevel;
        // or
        // Object.assign($scope, todoService);

        /*
            Test for directives:
            ng-bind, ng-bind-html, ng-bind-template, ng-non-bindable
        */
        $ctrl.firstName = "Anna";
        $ctrl.lastName = "Vasileva";
        $ctrl.myHTML = "<span>Text</span>"
    }

})();