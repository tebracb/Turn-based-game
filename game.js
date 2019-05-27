/*-------------------------------------------------------------------------------
                DEFINE VARIABLES
---------------------------------------------------------------------------------*/



let landTile = $('<img />', {
    class: 'mainTile',
    src: 'img/dirtMainTile.png',
});


const ROWS = 10;
const COLUMNS = 10;
const ROW = $("<div />", {
    class: 'row'
});
const SQUARE = $("<div />", {
    class: 'square'
});

let fruitSrc = "img/fruits.png";
let veggieSrc = "img/veggies.png";

/*-------------------------------------------------------------------------------
                DOCUMENT READY - called when the document is loaded
---------------------------------------------------------------------------------*/

$(document).ready(function () {
    //add columns to the the temp row object
    for (var i = 0; i < COLUMNS; i++) {
        ROW.append(SQUARE.clone());
    }
    //clone the temp row object with the columns to the wrapper
    for (var i = 0; i < ROWS; i++) {
        $("#gameboard").append(ROW.clone());
    }
    changeTilesMountains();
    changeTilesWeapons();
    addCharacters();

    playerTurns();

});



/*-------------------------------------------------------------------------------
                MAP POPULATED WITH RANDOMLY PLACED ELEMENTS
---------------------------------------------------------------------------------*/
$(SQUARE).append(landTile);

//selecting random tiles

function createRandomNum() {

    return Math.floor(Math.random() * $('.mainTile').length);
};

function selectRandomTile() {
    return $('.mainTile:eq(' + createRandomNum() + ')');
}

function changeTilesMountains() {
    for (i = 0; i < 5; i++) {

        $(selectRandomTile()).attr('src', 'img/mole.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/grass.png').addClass("occupiedTile");

    }
};

function changeTilesWeapons() {
    for (i = 0; i < 1; i++) {

        $(selectRandomTile()).attr('src', 'img/scarecrow.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/pole.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/hay.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/tractor.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/grasshopper.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/caterpillar.png').addClass("occupiedTile");
    };

};

/*-------------------------------------------------------------------------------
                CLASSES
---------------------------------------------------------------------------------*/

class Character {
    constructor(src, confidenceLevel, activePlayer) {
        this.src = src;
        this.cofidenceLevel = confidenceLevel;
        this.activePlayer = activePlayer;

    }

    calculatePosition() {
        if (this.src === fruitSrc) {
            return ($('.fruit').index('.mainTile'));
        } else {
            return ($('.veggie').index('.mainTile'));
        }
    };


    /* Function taking the moving character's calculatePosition() and img src as arguments, moving the character
     to the new tile and changing img src-s and css classes accordingly
     Does not recalculate character's position  */


};

let fruits = new Character(fruitSrc, 100, false);

let veggies = new Character(veggieSrc, 100, true);

function addCharacters() {
    $(selectRandomTile()).attr('src', fruitSrc).addClass("occupiedTile character fruit");
    $(selectRandomTile()).attr('src', veggieSrc).addClass("occupiedTile character veggie");

};

/*-------------------------------------------------------------------------------
            ADJACENT AVAILABLE TILES
---------------------------------------------------------------------------------*/

/*function taking calculatePosition() (character's index position) as argument , 
pushes the tiles which are not occupied or not after the edge of the map to adjacentTiles array*/

function getAdjacentTiles(characterPosition) {

    adjacentTiles = [];

    if (!((characterPosition + 1) % 10 === 0) && !($('.mainTile:eq(' + (characterPosition + 1) + ')').hasClass("occupiedTile"))) {
        adjacentTiles.push($('.mainTile:eq(' + (characterPosition + 1) + ')'));
    }

    if (!(characterPosition % 10 === 0) && !($('.mainTile:eq(' + (characterPosition - 1) + ')').hasClass("occupiedTile"))) {
        adjacentTiles.push($('.mainTile:eq(' + (characterPosition - 1) + ')'));
    }

    if (characterPosition > 9 && !($('.mainTile:eq(' + (characterPosition - 10) + ')').hasClass("occupiedTile"))) {
        adjacentTiles.push($('.mainTile:eq(' + (characterPosition - 10) + ')'));
    }

    if (characterPosition < 90 && !($('.mainTile:eq(' + (characterPosition + 10) + ')').hasClass("occupiedTile"))) {
        adjacentTiles.push($('.mainTile:eq(' + (characterPosition + 10) + ')'));
    }


    return adjacentTiles;
};


function loopOverAdjacentTiles(characterPosition) {
    $.each((getAdjacentTiles(characterPosition)), function () {
        this.css("border", "1px solid #ed2f30");
        this.css("box-sizing", "border-box");
    });
};

function deselectAdjacentTiles(characterPosition) {
    $.each((getAdjacentTiles(characterPosition)), function () {
        this.css("border", "none");
        $('.mainTile:eq(' + (characterPosition) + ')').css("border", "none");
    });
};


function handler(e) {
    e.stopPropagation();
    e.preventDefault();
}

/*-------------------------------------------------------------------------------
            MOVEMENT
---------------------------------------------------------------------------------*/

function characterMovement(calculatedPosition, src) {

    document.removeEventListener("click", handler, true);
    loopOverAdjacentTiles(calculatedPosition);

    $.each(getAdjacentTiles(calculatedPosition), function () {
        $(this).on('click', function () {


            $('.mainTile:eq(' + (calculatedPosition) + ')').attr('src', 'img/dirtMainTile.png');
            $('.mainTile:eq(' + (calculatedPosition) + ')').removeClass("character fruit veggie occupiedTile");
            $(this).attr('src', src);
            $(this).addClass("character occupiedTile");

            if (src === fruitSrc) {
                $(this).addClass("fruit");

            } else {
                $(this).addClass("veggie");
            }

            document.addEventListener("click", handler, true);

            deselectAdjacentTiles(calculatedPosition);


        });
    });
};




x = true;

function playerTurns() {

    if (x) {
      
                
                characterMovement(veggies.calculatePosition(), veggieSrc);
                x = false;



        }else {
            
                    
                    characterMovement(fruits.calculatePosition(), fruitSrc);
                    x = true;
        }
    };
