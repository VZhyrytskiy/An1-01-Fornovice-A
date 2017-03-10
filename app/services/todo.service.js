/**
 * Logger Factory
 * @namespace Factories
 */
(function () {
    "use strict";

    angular.module("app")
        .factory("todoService", todoService);

    /**
  * @namespace todoService
  * @desc Todo Service
  * @memberOf Factories
  */
    todoService.$inject = ['$http', '$q'];
    function todoService($http, $q) {
        let service = {
            addNewItem,
            getItems,
            incompleteCount,
            warningLevel,


            // дополнительные функции
            deleteItem,
            deleteCompleted,
            editTask,
            sortByField,
            sortClass,
            completedTasksExist,
            generateId
        };

        return service;

        function completedTasksExist(items) {
            if (angular.isArray(items)) {
                return items.length - incompleteCount(items) > 0;
            }

            return false;
        }

        /**
       * @name addNewItem
       * @desc add new item to array of items
       * @param {array} items Array to add items
       * @param {object} newiItem Object to add
       * @returns {undefined}
       * @memberOf Factories.todoService
       */
        function addNewItem(items, newItem) {
            if (newItem && newItem.action) {
                items.push({
                    action: newItem.action,
                    done: false
                });

                newItem.action = "";

                //Или если свойств много
                //for (var property in newItem) {
                //    newItem[property] = '';
                //}
            }
        }

        function editTask(id, data) {
            for (const todo of model.items) {
                if (todo.id === id) {
                    console.log('---', data);
                    Object.assign(todo, data);
                }
            }
        }

        function incompleteCount(items) {
            let count = 0;

            angular.forEach(items, (item) => {
                if (!item.done) count++;
            });

            return count;
        }

        function getItems() {
            return $http
                .get("data/todo.json")
                .then((response) => response.data)
                .catch(() => $q.reject("Error"));
        }

        function warningLevel(items) {
            return incompleteCount(items) < 3
                ? "label-success"
                : "label-warning";
        }

        // дополнительный метод
        function deleteItem(items, item) {
            var itemIndex = items.indexOf(item);
            if (itemIndex != -1) {
                items.splice(itemIndex, 1);
            }
        }

        function deleteCompleted(items) {
            // Since filter doesn't mutate an array:
            items.forEach(
                item => {
                    if (item.done) {
                        deleteItem(items, item);
                    }
                }
            );
        }

        function sortByField(fieldName) {
            if (fieldName === this.orderBy) {
                this.orderDesc = !this.orderDesc;
            } else {
                this.orderBy = fieldName;
            }
        }

        function sortClass(fieldname) {
            if (this.orderBy === fieldname) {
                return this.orderDesc
                    ? "glyphicon glyphicon-triangle-top"
                    : "glyphicon glyphicon-triangle-bottom";

            }
            return '';
        }

        // функция возвращает класс для фона записи на основе просроченности дедлайна
        function taskState(item) {
            var nowDate = new Date().setHours(0, 0, 0, 0),
                deadlineDate = new Date(item.deadline).setHours(0, 0, 0, 0);
            if (item.done) {
                return "bg-success"
            } else {
                if (deadlineDate < nowDate) {
                    return "bg-danger";
                }
                else {
                    return deadlineDate === nowDate
                        ? "bg-warning"
                        : "bg-info"
                }
            }
        }

        function generateId() {
            return Math.random().toString(36).substr(2, 9);
        }
    }

})();