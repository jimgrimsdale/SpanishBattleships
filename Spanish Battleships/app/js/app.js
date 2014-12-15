// (function () {
  'use strict';

  var battleshipsApp = angular.module('battleshipsApp', []);
// }());

// battleshipsApp.directive('cellClick', function () {
//   return {
//     restrict: 'A',
//     replace: true,
//     template: '<div></div>',
//     link: function(scope, elem, attrs) {
//       elem.bind('click', function() {
//         var cellId = elem[0].id,
//           blown = false;
//         angular.forEach(scope.boardLayout, function(ship) {
//           angular.forEach(ship, function(position) {
//             if(position === cellId) {
//               elem.css('background-color', 'red');
//               blown = true;
//             }
//           })
//         });   
//         if(!blown) {
//           elem.css('background-color', 'yellow');
//         }
        
//         scope.$apply(function() {
//           scope.selected.push("a1");
//         });
//       });
//       elem.bind('mouseover', function() {
//         elem.css('cursor', 'pointer')
//       });
//     }
//   };
// });

