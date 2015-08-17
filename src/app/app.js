angular.module('lists', [
    'ui.router',
    'listsControllers',
    'myApp.Services'
]);

angular.module('lists')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: './app/tpl/main.html',
                controller: 'listsCtrl',
                resolve: {
                    people: ['dataService', function (dataService) {
                        return dataService.getPeople();
                    }],
                    newDudes: ['people', function (people) {
                        return people.filter(function (dude) {
                            return dude.isNew == 1;
                        })
                    }],
                    oldDudes: ['people', function (people) {
                        return people.filter(function (dude) {
                            return dude.isNew !== 1;
                        })
                    }]
                }
            });

        $urlRouterProvider.otherwise("/main");
    });

angular.module('lists')
    .run(function($rootScope) {
        $rootScope.$on('$stateChangeError', function() {
            console.error(arguments);
        });
    });
