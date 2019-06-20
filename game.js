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

let fruitSrc = "img/fruits2.PNG";
let veggieSrc = "img/veggies.PNG";
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
    constructor(src, cssClass, bigImgID, weaponName, weaponPoint, confidenceLevelDisplay, borderStyle, 
        moveImgSrc, winImgSrc, attackButton, defendButton, isDefending) {
        this.src = src;
        this.cssClass = cssClass;
        this.bigImgID = bigImgID;
        this.weaponName = weaponName;
        this.weaponPoint = weaponPoint;
        this.cofidenceLevel = 100;
        this.confidenceLevelDisplay = confidenceLevelDisplay;
        this.currentWeapon = "";
        this.oldWeapon = "";
        this.borderStyle = borderStyle;
        this.moveImgSrc = moveImgSrc;
        this.winImgSrc = winImgSrc;
        this.attackButton = attackButton;
        this.defendButton = defendButton;
        this.isDefending = isDefending;

    }

    calculatePosition() {
        return ($("." + this.cssClass).index('.mainTile'));
    };

};

let fruits = new Character(fruitSrc, "fruits", '#bigFruitPic', "#fruitWeaponName", "#fruitWeaponPoint", "#fruitsConfidenceLevel",
    "2px solid rgba(212, 128, 28, 0.9)", "img/fruits_move.png", "img/fruits_win.PNG", '#fruitAttackBtn', '#fruitDefendBtn', false);

let veggies = new Character(veggieSrc, "veggies", '#bigVeggiePic', "#veggieWeaponName", "#veggieWeaponPoint", "#veggieConfidenceLevel",
    "2px solid rgba(19, 82, 19, 0.59)", "img/veggies_move.png", "img/veggies_win.PNG", '#veggieAttackBtn', '#veggieDefendBtn', false);

//???
// $('#fruitsConfidenceLevel').text(" " +fruits.cofidenceLevel);


let activePlayer = veggies;
let passivePlayer = fruits;

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


//REMOVE EVENT LISTENERS

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
                // player.oldWeapon = "";
            } else {
                $('.mainTile:eq(' + (position + i) + ')').attr('src', 'img/dirtMainTile.png');
            }


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


            oldPosition = player.calculatePosition();
            newPosition = ($(this).index('.mainTile'));

            deselectAvailableTiles(oldPosition);

            //delete and add CSS classes based on the new position


            $('.mainTile:eq(' + (oldPosition) + ')').removeClass("character fruits veggies occupiedTile");

            if ($('.mainTile:eq(' + (oldPosition) + ')').hasClass('weapon') && (player.oldWeapon !== "")) {
                $('.mainTile:eq(' + (oldPosition) + ')').attr("src", player.oldWeapon.src);
            } else {

                $('.mainTile:eq(' + (oldPosition) + ')').attr("src", 'img/dirtMainTile.png'); // check if it's a weapon and set it to the weapon if it is
            }

            //

            //RIGHT
            if ((newPosition - oldPosition) < 4 && (newPosition - oldPosition) > 0) {
                for (i = 1; i <= (newPosition - oldPosition); i++) {
                    checkForWeapons(player, oldPosition, i); //pass in oldPosition + i to the function
                }

                //LEFT
            } else if ((newPosition - oldPosition) < 0 && (newPosition - oldPosition) > -4) {
                for (i = -1; i >= (newPosition - oldPosition); i--) {
                    checkForWeapons(player, oldPosition, i)
                }

                //DOWN
            } else if ((newPosition - oldPosition) >= COLUMNS) {
                for (i = COLUMNS; i <= (newPosition - oldPosition); i += COLUMNS) {
                    checkForWeapons(player, oldPosition, i)
                }

                //UP
            } else {
                for (i = -COLUMNS; i >= (newPosition - oldPosition); i -= COLUMNS) {
                    checkForWeapons(player, oldPosition, i)
                }
            }


            $(this).attr('src', player.src);
            $(this).addClass("character occupiedTile");
            $(this).addClass(player.cssClass);


            if ((newPosition - passivePlayer.calculatePosition()) === 10 || (newPosition - passivePlayer.calculatePosition()) === -10 ||
                (newPosition - passivePlayer.calculatePosition()) === 1 || (newPosition - passivePlayer.calculatePosition()) === -1) {
                changeUI();
                return;
            }

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
        passivePlayer = veggies;
    } else {
        activePlayer = veggies;
        passivePlayer = fruits;
    }
}

function changeUI() {
    $('#gameboard').fadeOut(1000);
    $('#player1').append('<button id=veggieAttackBtn>Scare</button>');
    $('#player1').append('<button id=veggieDefendBtn>Hide</button>');

    $('#player2').append('<button id=fruitAttackBtn>Scare</button>');
    $('#player2').append('<button id=fruitDefendBtn>Hide</button>');

    $(veggies.bigImgID).css('float', 'right');
    $(fruits.bigImgID).css('float', 'left');
    
    endPlayerTurn();
    fight(activePlayer);

}

// function toggleSelection(player) {

//     $(player.bigImgID).animate({height: '+=20px', width:'+=20px'},500);

//     $(passivePlayer.bigImgID).animate({height: '-=20px', width:'-=20px'},500);

// }

function fight(player) {

    $(player.bigImgID).addClass('grow');
    $(passivePlayer.bigImgID).removeClass('grow');

    $(player.attackButton).on('click', function () {

        $(player.bigImgID).removeClass('shake');


        if (player.currentWeapon === "") {
            if (passivePlayer.isDefending === true) {
            passivePlayer.cofidenceLevel -= (10/2);
            passivePlayer.isDefending = false;
            } else {
            passivePlayer.cofidenceLevel -= 10;
            }
        } else {
            if (passivePlayer.isDefending === true) {
                passivePlayer.cofidenceLevel -= (player.currentWeapon.scarePoint / 2);
                passivePlayer.isDefending = false;
            } else {
            passivePlayer.cofidenceLevel -= player.currentWeapon.scarePoint
            }
        }

        $(passivePlayer.confidenceLevelDisplay).text(" " + passivePlayer.cofidenceLevel);

        $(passivePlayer.bigImgID).addClass('shake');

        if (passivePlayer.cofidenceLevel <= 0) {
            $('#player1').fadeOut(1000);
            $('#player2').fadeOut(1000);
            alert("Game over, the winner is " + activePlayer.cssClass);
            $(activePlayer.winImgSrc).fadeIn(1000);
        }
        $(player.attackButton).off('click');
        $(player.defendButton).off('click');

        endPlayerTurn();
        fight(activePlayer);
    });

    $(player.defendButton).on('click', function () {
        $(player.bigImgID).removeClass('shake');
        player.isDefending = true;
        $(player.defendButton).off('click');
        $(player.attackButton).off('click');
        endPlayerTurn();
        fight(activePlayer);
       
    });

};

/*The player can choose to attack or defend against the next shot
If the player chooses to defend themselves, they sustain 50% less damage than normal */