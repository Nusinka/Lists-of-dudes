angular.module('listsControllers', [])
    .controller('listsCtrl', function ($scope, newDudes, oldDudes, people) {
        $scope.newDudes = newDudes;
        $scope.oldDudes = oldDudes;
        $scope.people = people;

    })
    .directive('list', ['dataService', function (dataService) {

         return {
             restrict: 'E',
             scope: {
                 people: '=',
                 title: '@',
                 users: '='
             },
             templateUrl: 'app/tpl/list.html',
             link: function (scope, element) {
                 $(element).find('ul').sortable({
                     connectWith: ".connectedSortable"
                 }).disableSelection();
                 $(element).on("sortreceive", function(event, ui) {
                     var id = ui.item.data('id');
                     var value;
                     for (var i = 0; i < scope.people.length; i++) {
                         if (scope.people[i].id == id) {
                             scope.people[i].isNew === 0 ?
                                 value = 1 : value = 0;
                             dataService.changeDude(i, value);

                         }

                     }
                 });
            }
         };




    }]);
