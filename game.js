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
    changeTilesObstacles();
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

function changeTilesObstacles() {
    for (i = 0; i < 3; i++) {

        $(selectRandomTile()).attr('src', 'img/mole.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/grass.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/pole.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/hay.png').addClass("occupiedTile");
    }
};

function changeTilesWeapons() {
    for (i = 0; i < 1; i++) {

        $(selectRandomTile()).attr('src', 'img/scarecrow.png').addClass("weapon scarecrow").removeClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/tractor.png').addClass("weapon tractor").removeClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/grasshopper.png').addClass("weapon grasshopper").removeClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/caterpillar.png').addClass("weapon caterpillar").removeClass("occupiedTile");
    };

};

/*-------------------------------------------------------------------------------
                CLASSES
---------------------------------------------------------------------------------*/

class Character {
    constructor(src, bigImgID, confidenceLevel, activePlayer) {
        this.src = src;
        this.bigImgID = bigImgID;
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



};

let fruits = new Character(fruitSrc, '#bigFruitPic', 100, false);

let veggies = new Character(veggieSrc, '#bigVeggiePic', 100, true);

let weapons = [];

class Weapon {
    constructor(name, src, scarePoint, cssClass, veggieWithWeaponSrc, fruitWithWeaponSrc) {
        this.name = name;
        this.src = src;
        this.scarePoint = scarePoint;
        this.cssClass = cssClass;
        this.veggieWithWeaponSrc = veggieWithWeaponSrc;
        this.fruitWithWeaponSrc = fruitWithWeaponSrc;
        weapons.push(this);

    }
};

let scarecrow = new Weapon("Scarecrow", "img/scarecrow.png", 30, "scarecrow", "img/veggie_scarecrow.png","img/fruit_scarecrow.png")
let tractor = new Weapon("Tractor", "img/tractor.png", 35, "tractor", "img/veggie_tractor.png", "img/fruit_tractor.png")
let grasshopper = new Weapon("Grasshopper", "img/grasshopper.png", 40, "grasshopper","img/veggie_grasshopper.png", "img/fruit_grasshopper.png")
let caterpillar = new Weapon("Caterpillar", "img/caterpillar.png", 25, "caterpillar", "img/veggie_caterpillar.png", "img/fruit_caterpillar.png")


function addCharacters() {
    $(selectRandomTile()).attr('src', fruitSrc).addClass("occupiedTile character fruit");
    $(selectRandomTile()).attr('src', veggieSrc).addClass("occupiedTile character veggie");

};

// $(availableTilesRight).each(function() {
//     if($(this).hasClass("tractor")){
//     console.log("tractor");
//     }
//     })

// $(availableTilesRight).each(function(i, obj) {
// 	if ($(obj[i]).hasClass('weapon')){
// 	$(obj[i]).css("border", "2px solid blue");
// }})

// function weaponRight (){
// $(availableTilesRight).filter(function() {
//     return $(this).hasClass("weapon");

//     });
// };



function checkForWeapons(calculatePosition, characterWeaponPoint, characterWeaponName) {

    $.each(weapons, function (index, w) {
        if ($('.mainTile:eq(' + (calculatePosition) + ')').hasClass(w.cssClass)) {
            $('.mainTile:eq(' + (calculatePosition) + ')').removeClass(w.cssClass).removeClass("weapon");
            $(characterWeaponPoint).text(w.scarePoint);
            $(characterWeaponName).text(w.name);
            if (calculatePosition === veggies.calculatePosition()) {
                $(veggies.bigImgID).attr("src", w.veggieWithWeaponSrc);
            } else {
                $(fruits.bigImgID).attr("src", w.fruitWithWeaponSrc);
            }
        }

    });
};

/*-------------------------------------------------------------------------------
            SELECTED TILES
---------------------------------------------------------------------------------*/

/*function taking calculatePosition() (character's index position) as argument, 
loops through 3 tiles in all 4 directions,
pushes the tiles which are not occupied or not after the edge of the map to availableTiles array*/

function getAvailableTiles(characterPosition) {


    availableTiles = [];
    availableTilesRight = [];

    let i = 1;
    while (!((characterPosition + i) % COLUMNS === 0) && !($('.mainTile:eq(' + (characterPosition + i) + ')').hasClass("occupiedTile")) && i <= 3) {
        availableTiles.push($('.mainTile:eq(' + (characterPosition + i) + ')'));
        availableTilesRight.push($('.mainTile:eq(' + (characterPosition + i) + ')'));
        i++;
    }

    i = 1;
    while (!((characterPosition - i + 1) % COLUMNS === 0) && !($('.mainTile:eq(' + (characterPosition - i) + ')').hasClass("occupiedTile")) && i <= 3) {
        availableTiles.push($('.mainTile:eq(' + (characterPosition - i) + ')'));
        i++;
    }

    i = 1;
    while (((characterPosition - COLUMNS * i) >= 0) && !($('.mainTile:eq(' + (characterPosition - COLUMNS * i) + ')').hasClass("occupiedTile")) && i <= 3) {
        availableTiles.push($('.mainTile:eq(' + (characterPosition - COLUMNS * i) + ')'));
        i++;
    }

    i = 1;
    while ((characterPosition + COLUMNS * i) < (COLUMNS * ROWS) && !($('.mainTile:eq(' + (characterPosition + COLUMNS * i) + ')').hasClass("occupiedTile")) && i <= 3) {
        availableTiles.push($('.mainTile:eq(' + (characterPosition + COLUMNS * i) + ')'));
        i++;
    }

    return availableTiles;
};


function loopOverAvailableTiles(characterPosition) {
    $.each((getAvailableTiles(characterPosition)), function () {
        this.css("border", "1px solid #ed2f30");
        this.css("box-sizing", "border-box");
    });
};

function deselectAvailableTiles(characterPosition) {
    $.each((getAvailableTiles(characterPosition)), function () {
        $(this).css("border", "none");

        let newPositionVeggie = $('.mainTile:eq(' + $('.veggie').index('.mainTile') + ')');
        let newPositionFruit = $('.mainTile:eq(' + $('.fruit').index('.mainTile') + ')');
        newPositionVeggie.css("border", "none");
        newPositionFruit.css("border", "none");


    });
};


/*-------------------------------------------------------------------------------
            MOVEMENT
---------------------------------------------------------------------------------*/


/* Function taking the moving character's calculatePosition() and img src as arguments, moving the character
 to the new tile and changing img src-s and css classes accordingly
 Does not recalculate character's position  */

function characterMovement(calculatedPosition, src) {

    $.each(getAvailableTiles(calculatedPosition), function () {


        $(this).on('click', function () {

            //REMOVE EVENT LISTENERS

            $.each(getAvailableTiles(calculatedPosition), function () {
                $(this).off('click');
            });
            deselectAvailableTiles(calculatedPosition);

            //delete and add CSS classes based on the new position

            $('.mainTile:eq(' + (calculatedPosition) + ')').attr('src', 'img/dirtMainTile.png');
            $('.mainTile:eq(' + (calculatedPosition) + ')').removeClass("character fruit veggie occupiedTile");
            $(this).attr('src', src);
            $(this).addClass("character occupiedTile");

            if (src === fruitSrc) {
                $(this).addClass("fruit");
            } else {
                $(this).addClass("veggie");

            }

            playerTurns();
        });
    });
};

x = true;

function playerTurns() {

    if (x) {
        checkForWeapons(fruits.calculatePosition(), '#fruitWeaponPoint', '#fruitWeaponName');
        loopOverAvailableTiles(veggies.calculatePosition());
        characterMovement(veggies.calculatePosition(), veggieSrc);



        x = false;

    } else {

        checkForWeapons(veggies.calculatePosition(), '#veggieWeaponPoint', '#veggieWeaponName');
        loopOverAvailableTiles(fruits.calculatePosition());
        characterMovement(fruits.calculatePosition(), fruitSrc);

        x = true;
    }
};
