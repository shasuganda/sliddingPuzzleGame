$(document).ready(function() {
  $("ul").append('<li class="Tile Tile9" style="visibility: hidden">9</li>');
  var globalVariable = {};
  globalVariable.initialValues = [
    { row: 0, column: 0, value: 1, hidden: false },
    { row: 0, column: 1, value: 2, hidden: false },
    { row: 0, column: 2, value: 3, hidden: false },
    { row: 1, column: 0, value: 4, hidden: false },
    { row: 1, column: 1, value: 5, hidden: false },
    { row: 1, column: 2, value: 6, hidden: false },
    { row: 2, column: 0, value: 7, hidden: false },
    { row: 2, column: 1, value: 8, hidden: false },
    { row: 2, column: 2, value: 9, hidden: true }
  ];
  globalVariable.isEmptyTilePresentNear = false;
  globalVariable.clickIndex = [];
  globalVariable.emptyTilePositionIndex = [];
  globalVariable.clickedValue = 0;

  //initialize
  initialze();

  //update Json
  function updateInitialValuesObject() {
    //chanage to 9
    var index = _.findIndex(globalVariable.initialValues, {
      row: parseInt(globalVariable.clickIndex[0]),
      column: parseInt(globalVariable.clickIndex[1])
    });
    globalVariable.initialValues[index] = {
      row: parseInt(globalVariable.clickIndex[0]),
      column: parseInt(globalVariable.clickIndex[1]),
      value: 9,
      hidden: true
    };

    //chanage to 9
    var index = _.findIndex(globalVariable.initialValues, {
      row: parseInt(globalVariable.emptyTilePositionIndex[0]),
      column: parseInt(globalVariable.emptyTilePositionIndex[1])
    });
    globalVariable.initialValues[index] = {
      row: parseInt(globalVariable.emptyTilePositionIndex[0]),
      column: parseInt(globalVariable.emptyTilePositionIndex[1]),
      value: parseInt(globalVariable.clickedValue),
      hidden: false
    };

    console.log(JSON.stringify(globalVariable.initialValues));
  }

  function initialze() {
    $(".SlidingPuzzle li.Tile").bind("click", function() {
      globalVariable.clickedValue = parseInt($(this).text());
      clickedArray = _.find(globalVariable.initialValues, {
        value: parseInt($(this).text())
      });
      globalVariable.clickIndex = [clickedArray.row, clickedArray.column];

      globalVariable.emptyTilePositionIndex = [];
      globalVariable.emptyTilePositionIndex = findEmptyTilePosition();
      returnedValueEmptyTile = CheckIfEmptyTilePresentNear();
      if (returnedValueEmptyTile == true) {
        updateInitialValuesObject();
        swapTiles();
      }
    });
  }

  function findEmptyTilePosition() {
    var emptyTilePos = _.find(globalVariable.initialValues, { value: 9 });
    return [emptyTilePos.row, emptyTilePos.column];
  }

  function CheckIfEmptyTilePresentNear() {
    console.log(globalVariable.clickIndex);
    //reinitialse before checking tile position
    globalVariable.isEmptyTilePresentNear = false;

    //logic to check top and bottom
    //check top according to row number
    if (
      globalVariable.clickIndex[0] === 1 ||
      globalVariable.clickIndex[0] === 2
    ) {
      returnedValue = checkTop();
      if (returnedValue == true) {
        return true;
      }
    }
    //check bottom according to row number
    if (
      globalVariable.clickIndex[0] === 0 ||
      globalVariable.clickIndex[0] === 1
    ) {
      returnedValue = checkBottom();
      if (returnedValue == true) {
        return true;
      }
    }

    //logic to check left and right
    //check left according to row number
    if (
      globalVariable.clickIndex[1] === 1 ||
      globalVariable.clickIndex[1] === 2
    ) {
      returnedValue = checkLeft();
      if (returnedValue == true) {
        return true;
      }
    }
    //check right according to row number
    if (
      globalVariable.clickIndex[1] === 0 ||
      globalVariable.clickIndex[1] === 1
    ) {
      returnedValue = checkRight();
      if (returnedValue == true) {
        return true;
      }
    }

    return false;
  }

  function checkTop() {
    if (
      globalVariable.clickIndex[0] - 1 ===
        globalVariable.emptyTilePositionIndex[0] &&
      globalVariable.clickIndex[1] === globalVariable.emptyTilePositionIndex[1]
    ) {
      globalVariable.isEmptyTilePresentNear = true;
      return true;
    } else return false;
  }

  function checkBottom() {
    if (
      globalVariable.clickIndex[0] + 1 ===
        globalVariable.emptyTilePositionIndex[0] &&
      globalVariable.clickIndex[1] === globalVariable.emptyTilePositionIndex[1]
    ) {
      globalVariable.isEmptyTilePresentNear = true;
      return true;
    } else return false;
  }

  function checkLeft() {
    if (
      globalVariable.clickIndex[1] - 1 ===
        globalVariable.emptyTilePositionIndex[1] &&
      globalVariable.clickIndex[0] === globalVariable.emptyTilePositionIndex[0]
    ) {
      globalVariable.isEmptyTilePresentNear = true;
      return true;
    } else return false;
  }

  function checkRight() {
    if (
      globalVariable.clickIndex[1] + 1 ===
        globalVariable.emptyTilePositionIndex[1] &&
      globalVariable.clickIndex[0] === globalVariable.emptyTilePositionIndex[0]
    ) {
      globalVariable.isEmptyTilePresentNear = true;
      return true;
    } else return false;
  }

  function swapTiles() {
    var filledTileIndex = _.findIndex(globalVariable.initialValues, {
      row: parseInt(globalVariable.clickIndex[0]),
      column: parseInt(globalVariable.clickIndex[1])
    });
    var emptyTileIndex = _.findIndex(globalVariable.initialValues, {
      row: parseInt(globalVariable.emptyTilePositionIndex[0]),
      column: parseInt(globalVariable.emptyTilePositionIndex[1])
    });

    var number = filledTileIndex + 1;
    var emptyNumber = emptyTileIndex + 1;
    console.log(
      "emptyTileIndex" +
        emptyTileIndex +
        ":" +
        "filledTileIndex" +
        filledTileIndex
    );
    $("ul li:eq(" + emptyTileIndex + ")").replaceWith(
      '<li class="Tile Tile' + number + '">' + number + "</li>"
    );
    $("ul li:eq(" + filledTileIndex + ")").replaceWith(
      '<li class="Tile Tile9" style="visibility: hidden">9</li>'
    );

    $(".SlidingPuzzle li.Tile").unbind();
    initialze();
  }
});
