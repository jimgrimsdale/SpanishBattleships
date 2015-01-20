(function () {
  'use strict';

  battleshipsApp.controller('BattleshipsController',
    function BattleshipsController($scope, $interval, boardService, dictionaryService) {
      var verbsTried = [],
        locationsTried = [],
        blown,
        interval;

      interval = $interval(function() {
        $('.inputWord').focus();
      }, 100);

      $scope.$on('$destroy', function() {
        $interval.cancel(interval);
        interval = undefined;
      });

      function isUpperCase (char) {
        return !!/[A-Z]/.exec(char[0]);
      }

      $scope.selectedTense = "present";
      $scope.showBoard = true; 

      $scope.fiveLongSunk = false;
      $scope.fourLongASunk = false;
      $scope.fourLongBSunk = false;
      $scope.threeLongSunk = false;
      $scope.twoLongSunk = false;

      $scope.inputText = "";
      $scope.filteredInputText = "";
      $scope.showFilteredInputText = false;
      $scope.divText = '';
      $scope.divTextColor = 'red';

      $scope.tocadoColour = 'black';  

      $scope.switchTense = function (tense) {
        $scope.selectedTense = tense;
        $scope.boardVerbs = dictionaryService.getSwitchedVerbs($scope.selectedTense, $scope.numberOfVerbs);
      };

      $scope.resetBoard = function (numberOfVerbs) {
        if (numberOfVerbs !== undefined) {
          $scope.numberOfVerbs = numberOfVerbs;
        }
        $scope.boardVerbs = dictionaryService.getVerbs($scope.selectedTense, $scope.numberOfVerbs);
        $scope.boardLayout = boardService.layout($scope.numberOfVerbs);
        $scope.ships = boardService.ships();
        verbsTried = [],
        locationsTried = [];
        $scope.fiveLongSunk = false;
        $scope.fourLongASunk = false;
        $scope.fourLongBSunk = false;
        $scope.threeLongSunk = false;
        $scope.twoLongSunk = false;
      };

      $scope.keydown = function (e) {
        if (e.keyCode === 8) {
          $scope.showFilteredInputText = false;
        }
      };

      $scope.keyup = function (e) {
        var allVerbs = dictionaryService.getProvidedVerbs(),
          enteredChar = $scope.inputText.slice(-1);

        if (enteredChar === "A" || enteredChar === "E" || enteredChar === "I" || enteredChar === "O" || enteredChar === "U") {
          $scope.inputText = $scope.inputText.slice(0, -1);
          switch (enteredChar) {
            case "A" : $scope.inputText = $scope.inputText + "á";
              break;
            case "E" : $scope.inputText = $scope.inputText + "é";
              break;
            case "I" : $scope.inputText = $scope.inputText + "í";
              break;
            case "O" : $scope.inputText = $scope.inputText + "ó";
              break;
            case "U" : $scope.inputText = $scope.inputText + "ú";
              break;
          }
        }

        $scope.inputText = $scope.inputText.toLowerCase();
        $scope.filteredInputText = $scope.inputText;

        if (allVerbs.indexOf($scope.filteredInputText) !== -1) {
          $scope.divTextColor = "green";
        } else {
          $scope.divTextColor = "red";
        }

        $scope.showFilteredInputText = true;
      };

      $scope.onShotAttempt = function () {
        var inputText = $scope.inputText,
          that = this,
          location;
        $scope.inputText = "";
        $scope.validationMessage = "";

        if(inputText === "") {
          $scope.validationMessage = "You haven't entered a word!";
          return;
        }

        var coord = null;
        angular.forEach($scope.boardVerbs, function (boardVerb, boardVerbIndex) {
          var verbs = boardVerb.verbs;
          angular.forEach(verbs, function (verb, verbIndex) {
            if (inputText === verb) {
              coord = {
                x: boardVerbIndex,
                y: verbIndex
              };
            }
          });
        });

        if (coord === null) {
          $scope.validationMessage = "verb " + inputText + " not found!";
          return;
        }

        if (verbsTried.indexOf(inputText) !== -1) {
          $scope.validationMessage = "You have already tried that verb!";
          return;
        }
        verbsTried.push(inputText);

        location = "x" + coord.x + "y" + coord.y;
        if (locationsTried.indexOf(location) !== -1) {
          $scope.validationMessage = "You have already tried there!";
          return;
        }
        locationsTried.push(location);

        angular.forEach($scope.ships, function(ship) {
          if(ship.sunk === false) {
            var i = ship.coords.length,
              shipCoord;
            while (i--) {
              shipCoord = ship.coords[i];
              if(shipCoord.x === coord.x && shipCoord.y === coord.y) {
                $scope.boardLayout.rows[coord.y][coord.x].colour = 'red';
                blown = true;
                ship.coords.splice(i, 1);
                if(ship.coords.length === 0) {
                  ship.sunk = true;
                  switch (ship.shipId) {
                    case "fiveLong": $scope.fiveLongSunk = true;
                      break;
                    case "fourLongA": $scope.fourLongASunk = true;
                      break;
                    case "fourLongB": $scope.fourLongBSunk = true;
                      break;
                    case "threeLong": $scope.threeLongSunk = true;
                      break;
                    case "twoLong": $scope.twoLongSunk = true;
                      break;
                  }
                  tocadoInterval(50, 20);
                }
              }
            }
          }
        });
        if(!blown) {
          $scope.boardLayout.rows[coord.y][coord.x].colour = 'yellow';
        }
        blown = false;

        function tocadoInterval(delay, count) {
          $scope.showBoard = false;
          $interval(function () {
            if($scope.tocadoColour === 'red') {
              $scope.tocadoColour = 'black';
            } else {
              $scope.tocadoColour = 'red';
            }
          }, delay, count).then(function () {$scope.showBoard = true;});
        }
      };
    }  
  );
}());