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

let fruitSrc = "img/fruits2.png";
let veggieSrc = "img/veggies.png";
let weapons = [];

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

    prepareForTurn(veggies);

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
    constructor(src, cssClass, bigImgID, weaponName, weaponPoint, borderStyle, moveImgSrc) {
        this.src = src;
        this.cssClass = cssClass;
        this.bigImgID = bigImgID;
        this.weaponName = weaponName;
        this.weaponPoint = weaponPoint;
        this.cofidenceLevel = 100;
        this.currentWeapon = "";
        this.oldWeapon = "";
        this.borderStyle = borderStyle;
        this.moveImgSrc = moveImgSrc;

    }

    calculatePosition() {
        return ($("." + this.cssClass).index('.mainTile'));
    };
};

let fruits = new Character(fruitSrc, "fruits", '#bigFruitPic', "#fruitWeaponName", "#fruitWeaponPoint", "2px solid rgba(212, 128, 28, 0.9)", "img/fruits_move.png");

let veggies = new Character(veggieSrc, "veggies", '#bigVeggiePic', "#veggieWeaponName", "#veggieWeaponPoint", "2px solid rgba(19, 82, 19, 0.59)", "img/veggies_move.png");

let activePlayer = veggies;

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

let scarecrow = new Weapon("Scarecrow", "img/scarecrow.png", 30, "scarecrow", "img/veggie_scarecrow.png", "img/fruit_scarecrow.png")
let tractor = new Weapon("Tractor", "img/tractor.png", 35, "tractor", "img/veggie_tractor.png", "img/fruit_tractor.png")
let grasshopper = new Weapon("Grasshopper", "img/grasshopper.png", 40, "grasshopper", "img/veggie_grasshopper.png", "img/fruit_grasshopper.png")
let caterpillar = new Weapon("Caterpillar", "img/caterpillar.png", 25, "caterpillar", "img/veggie_caterpillar.png", "img/fruit_caterpillar.png")


function addCharacters() {
    $(selectRandomTile()).attr('src', fruitSrc).addClass("occupiedTile character fruits");
    $(selectRandomTile()).attr('src', veggieSrc).addClass("occupiedTile character veggies");

};

// $(availableTilesRight).each(function(i, obj) {
// 	if ($(obj[i]).hasClass('weapon')){
// 	$(obj[i]).css("border", "2px solid blue");
// }})

// function weaponRight (){
// $(availableTilesRight).filter(function() {
//     return $(this).hasClass("weapon");

//     });
// };

/*-------------------------------------------------------------------------------
            SELECTED TILES
---------------------------------------------------------------------------------*/

/*function taking calculatePosition() (character's index position) as argument, 
loops through 3 tiles in all 4 directions,
pushes the tiles which are not occupied or not after the edge of the map to availableTiles array*/

function getAvailableTiles(characterPosition) {


    availableTiles = [];


    let i = 1;
    while (!((characterPosition + i) % COLUMNS === 0) && !($('.mainTile:eq(' + (characterPosition + i) + ')').hasClass("occupiedTile")) && i <= 3) {
        availableTiles.push($('.mainTile:eq(' + (characterPosition + i) + ')'));
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


function selectAvailableTiles(player) {

    $.each((getAvailableTiles(player.calculatePosition())), function () {

        $(this).css("box-sizing", "border-box");
        $(this).css("border", player.borderStyle);

        $(this).mouseenter(function () {
            $(this).attr("src", player.moveImgSrc);
        });

        $(this).mouseleave(function () {
            if ($(this).hasClass("weapon")) {
                that = $(this);
                $.each(weapons, function (index, w) {
                    if (that.hasClass(w.cssClass)) {
                        that.attr("src", w.src)
                    };
                })
            } else {
                $(this).attr("src", 'img/dirtMainTile.png')
            }
        });

        $(this).on('click', function () {
            $(this).attr("src", player.src);

            // $(this).fadeIn(5000);
        });
    });
}

function deselectAvailableTiles(characterPosition) {
    $.each((getAvailableTiles(characterPosition)), function () {
        $(this).off('click');
        $(this).css("border", "none");
        $(this).off("mouseenter");
        $(this).off("mouseleave");

        let newPositionVeggie = $('.mainTile:eq(' + $('.veggies').index('.mainTile') + ')');
        let newPositionFruit = $('.mainTile:eq(' + $('.fruits').index('.mainTile') + ')');
        newPositionVeggie.css("border", "none");
        newPositionFruit.css("border", "none");
    });
};


/*-------------------------------------------------------------------------------
            WEAPON FUNCTIONALITY
---------------------------------------------------------------------------------*/

function checkForWeapons(player, position, i) {


    $.each(weapons, function (index, w) {

        //new code - i added

        if ($('.mainTile:eq(' + (position + i) + ')').hasClass(w.cssClass)) {
            $('.mainTile:eq(' + (position + i) + ')').removeClass(w.cssClass).removeClass("weapon");

            player.oldWeapon = player.currentWeapon;

            if (player.oldWeapon !== "") {
                $('.mainTile:eq(' + (position + i) + ')').addClass(player.oldWeapon.cssClass).addClass("weapon");
                $('.mainTile:eq(' + (position + i) + ')').attr("src", player.oldWeapon.src);
                player.oldWeapon = "";
            }
            //  else {
            //     $('.mainTile:eq(' + (position + i) + ')').attr('src', 'img/dirtMainTile.png');
            // }
            
          

            $(player.weaponName).text(w.name);
            $(player.weaponPoint).text(w.scarePoint);
            
          

            
            if (player === veggies) {
                $(veggies.bigImgID).attr("src", w.veggieWithWeaponSrc);
                veggies.currentWeapon = w;

            } else {
                $(fruits.bigImgID).attr("src", w.fruitWithWeaponSrc);
                fruits.currentWeapon = w;
            }
           return false;

          
        }
    
    });
};

// function changeWeaponOnTile() {

// }
/*-------------------------------------------------------------------------------
            MOVEMENT
---------------------------------------------------------------------------------*/


/* Function taking the moving character's calculatePosition() and img src as arguments, moving the character
 to the new tile and changing img src-s and css classes accordingly
 Does not recalculate character's position  */

function addClickHandlerToAvailableTiles(player) {

    $.each(getAvailableTiles(player.calculatePosition()), function () {



        $(this).on('click', function () {

            //new code
            oldPosition = player.calculatePosition();
            //

            //REMOVE EVENT LISTENERS

            deselectAvailableTiles(player.calculatePosition());

            //delete and add CSS classes based on the new position

            // if (player.oldWeapon !== "") {
            //     $('.mainTile:eq(' + (player.calculatePosition()) + ')').addClass(player.oldWeapon.cssClass).addClass("weapon");
            //     $('.mainTile:eq(' + (player.calculatePosition()) + ')').attr("src", player.oldWeapon.src);
            //     player.oldWeapon = "";
            // } else {
            //     $('.mainTile:eq(' + (player.calculatePosition()) + ')').attr('src', 'img/dirtMainTile.png');
            // }

            $('.mainTile:eq(' + (oldPosition) + ')').removeClass("character fruits veggies occupiedTile");
            
            $('.mainTile:eq(' + (oldPosition) + ')').attr("src", 'img/dirtMainTile.png');

            $(this).attr('src', player.src);
            $(this).addClass("character occupiedTile");
            $(this).addClass(player.cssClass);

            //new code
            newPosition = ($(this).index('.mainTile'));
            //RIGHT
            if ((newPosition - oldPosition) < 4 && (newPosition - oldPosition) > 0) {
                for (i = 1; i <= (newPosition - oldPosition); i++) {
                    checkForWeapons(player, oldPosition, i);
                }

            //LEFT
            } else if ((newPosition - oldPosition) < 0 && (newPosition - oldPosition) > -4) {
                for (i = -1; i >= (newPosition - oldPosition); i--) {
                    checkForWeapons(player, oldPosition, i)
                }
            
            //DOWN
            } else if ((newPosition - oldPosition) >= COLUMNS) {
                for (i = COLUMNS; i <= (newPosition - oldPosition); i+=COLUMNS) {
                    checkForWeapons(player, oldPosition, i)
            }

            //UP
            } else {
                for (i = -COLUMNS; i >= (newPosition - oldPosition); i-=COLUMNS) {
                checkForWeapons(player, oldPosition, i)
            }
        }

            // checkForWeapons(player);
            endPlayerTurn();
            prepareForTurn(activePlayer);
        });
    });
};


function prepareForTurn(player) {

    selectAvailableTiles(player);
    addClickHandlerToAvailableTiles(player);
};

function endPlayerTurn() {
    if (activePlayer === veggies) {
        activePlayer = fruits;
    } else {
        activePlayer = veggies;
    }
}