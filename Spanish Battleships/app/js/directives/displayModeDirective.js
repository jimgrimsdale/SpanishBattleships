angular.module('battleshipsApp')
  .directive('dnDisplayMode', ['dictionaryService', 'boardService', function(dictionaryService, boardService) {
    //_dictionaryService = dictionaryService;
    return {
      restrict: 'A',
      scope: {
        dnDisplayMode: '=',
        dnResetBoard: '='
      },
      template: '<span class="mobile"></span><span class="other"></span>',
      link: function(scope, elem, attrs) {
        var markers = elem.find('span');

        function isVisible(element) {
          return element
            && element.style.display != 'none'
            && element.offsetWidth
            && element.offsetHeight;
        }

        function update() {
          angular.forEach(markers, function (element) {
            if (isVisible(element)) {
              scope.dnDisplayMode = element.className;
              switch(scope.dnDisplayMode) {
                case "mobile" :
                  scope.dnResetBoard(6);
                  break;
                default:
                  scope.dnResetBoard(12);
                  break;
              }
              return false;
            }
          });
        }

        // var t;
        // angular.element($window).bind('resize', function() {
        //     clearTimeout(t);
        //     t = setTimeout(function() {
        //         update();
        //         scope.$apply();
        //     }, 300);
        // });

        update();
      }
    }
  }]);