(function() {
    "use strict";

    angular.module("app")
        .filter("checkedItems", checkedItems)

    function checkedItems() {
        return function(items, showComplete) {
            let resArr = [];

            if (angular.isArray(items)) {
                angular.forEach(items, (item) => {
                    if (!item.done || showComplete) {
                        resArr.push(item);
                    }
                });
                return resArr;
            }
            else {
                return items;
            }
        };
    }

})();