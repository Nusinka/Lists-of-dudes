angular.module('myApp.Services', []);

angular.module('myApp.Services')
    .factory('dataService', function($http, $window) {

        var localStorage = $window.localStorage;

        function getPeople() {
            if (localStorage.dudeList) {
                return JSON.parse(localStorage.dudeList);
            }

            return $http.get('app/list/people.json')
                .then(function (result) {
                    localStorage.dudeList = JSON.stringify(result.data);
                    return result.data;
                });
        }

        function changeDude(idx, value) {
            var dudeList = JSON.parse(localStorage.dudeList);
            dudeList[idx].isNew = value;
            localStorage.dudeList = JSON.stringify(dudeList);
            return;
        }

        return {
            getPeople: getPeople,
            changeDude: changeDude
        }
    });
