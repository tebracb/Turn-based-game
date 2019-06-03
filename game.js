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

        $(selectRandomTile()).attr('src', 'img/scarecrow.png').addClass("weapon scarescrow").removeClass("occupiedTile");   
        $(selectRandomTile()).attr('src', 'img/tractor.png').addClass("weapon tractor").removeClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/grasshopper.png').addClass("weapon grasshopper").removeClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/caterpillar.png').addClass("weapon caterpillar").removeClass("occupiedTile");
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



};

let fruits = new Character(fruitSrc, 100, false);

let veggies = new Character(veggieSrc, 100, true);


class Weapon {
    constructor(name, src, scarePoint) {
        this.name = name;
        this.src = src;
        this.scarePoint = scarePoint;

    }
};

let scarecrow = new Weapon("Scarecrow", "img/scarecrow.png", 30)
let tractor = new Weapon("Tractor","img/tractor.png", 35)
let grasshopper = new Weapon("Grasshopper","img/grasshopper.png", 40)
let caterpillar = new Weapon("Caterpillar","img/caterpillar.png", 25)


function addCharacters() {
    $(selectRandomTile()).attr('src', fruitSrc).addClass("occupiedTile character fruit");
    $(selectRandomTile()).attr('src', veggieSrc).addClass("occupiedTile character veggie");

};

// function checkForWeapons(calculatePosition, characterWeaponPoint, characterWeaponName){
//     if ($('.mainTile:eq(' + (calculatePosition) + ')').hasClass("scarescrow")) {
//         $('.mainTile:eq(' + (calculatePosition) + ')').removeClass("scarescrow");
//         $(characterWeaponPoint).text(scarecrow.scarePoint);
//         $(characterWeaponName).text(scarecrow.name);
//         if(calculatePosition === veggies.calculatePosition()){
//             $('#bigVeggiePic').attr("src", "img/veggie_scarecrow.png")
//         } else{
//             $('#bigFruitPic').attr("src", "img/fruit_scarecrow.png")
//         }
//     }

//     if ($('.mainTile:eq(' + (calculatePosition) + ')').hasClass("tractor")) {
//         $(characterWeaponPoint).text(tractor.scarePoint);
//         $(characterWeaponName).text(tractor.name);
//         if(calculatePosition === veggies.calculatePosition()){
//             $('#bigVeggiePic').attr("src", "img/veggie_tractor.png")
//         } else{
//             $('#bigFruitPic').attr("src", "img/fruit_tractor.png")
//         }
//     }

//     if ($('.mainTile:eq(' + (calculatePosition) + ')').hasClass("grasshopper")) {
//         $(characterWeaponPoint).text(grasshopper.scarePoint);
//         $(characterWeaponName).text(grasshopper.name);
//         if(calculatePosition === veggies.calculatePosition()){
//             $('#bigVeggiePic').attr("src", "img/veggie_grasshopper.png")
//         } else{
//             $('#bigFruitPic').attr("src", "img/fruit_grasshopper.png")
//         }
//     }

//     if ($('.mainTile:eq(' + (calculatePosition) + ')').hasClass("caterpillar")) {
//         $(characterWeaponPoint).text(caterpillar.scarePoint);
//         $(characterWeaponName).text(caterpillar.name);
//         if(calculatePosition === veggies.calculatePosition()){
//             $('#bigVeggiePic').attr("src", "img/veggie_caterpillar.png")
//         } else{
//             $('#bigFruitPic').attr("src", "img/fruit_caterpillar.png")
//         }
//     }
  
// }
/*-------------------------------------------------------------------------------
            ADJACENT TILES
---------------------------------------------------------------------------------*/

/*function taking calculatePosition() (character's index position) as argument , 
pushes the tiles which are not occupied or not after the edge of the map to adjacentTiles array*/

function getAdjacentTiles(characterPosition) {


    adjacentTiles = [];

    let i = 1;
    while (!((characterPosition + i) % COLUMNS === 0) && !($('.mainTile:eq(' + (characterPosition + i) + ')').hasClass("occupiedTile")) && i<=3) {
        adjacentTiles.push($('.mainTile:eq(' + (characterPosition + i) + ')'));
        i++;
    }

    i=1;
    while (!((characterPosition - i + 1) % COLUMNS === 0) && !($('.mainTile:eq(' + (characterPosition - i) + ')').hasClass("occupiedTile")) && i<=3) {
        adjacentTiles.push($('.mainTile:eq(' + (characterPosition - i) + ')'));
        i++;
    }

    i=1;
    while (((characterPosition - COLUMNS*i) >= 0) && !($('.mainTile:eq(' + (characterPosition - COLUMNS*i) + ')').hasClass("occupiedTile")) && i<=3) {
        adjacentTiles.push($('.mainTile:eq(' + (characterPosition - COLUMNS*i) + ')'));
        i++;
    }

    i=1;
    while ((characterPosition + COLUMNS*i) < (COLUMNS * ROWS) && !($('.mainTile:eq(' + (characterPosition + COLUMNS*i) + ')').hasClass("occupiedTile")) && i<=3) {
        adjacentTiles.push($('.mainTile:eq(' + (characterPosition + COLUMNS*i) + ')'));
        i++;
    }

//  let adjacentTiles = Tiles.concat(adjacentTilesRight);

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

    $.each(getAdjacentTiles(calculatedPosition), function () {

            
        $(this).on('click', function () {
           
            
            $.each(getAdjacentTiles(calculatedPosition), function () {
                $(this).off('click');
            });
            $(this).off('click');
            deselectAdjacentTiles(calculatedPosition);
           
            $('.mainTile:eq(' + (calculatedPosition) + ')').attr('src', 'img/dirtMainTile.png');
            $('.mainTile:eq(' + (calculatedPosition) + ')').removeClass("character fruit veggie occupiedTile");
            $(this).attr('src', src);
            $(this).addClass("character occupiedTile");

            if (src === fruitSrc) {
                $(this).addClass("fruit");
            } else {
                $(this).addClass("veggie");

            }


            //REMOVE EVENT LISTENERS


            // $('.mainTile:eq(' + $('.veggie').index('.mainTile') + ')').off('click');
            // $(this).off("click");

         

            playerTurns();
        });
    });
};

x = true;

function playerTurns() {

    if (x) {
    //     checkForWeapons (fruits.calculatePosition(),'#fruitWeaponPoint', '#fruitWeaponName');
        loopOverAdjacentTiles(veggies.calculatePosition());
        characterMovement(veggies.calculatePosition(), veggieSrc);
        
        

        x = false;

    } else {

        // checkForWeapons (veggies.calculatePosition(), '#veggieWeaponPoint', '#veggieWeaponName');
        loopOverAdjacentTiles(fruits.calculatePosition());
        characterMovement(fruits.calculatePosition(), fruitSrc);

        x = true;
    }
};
