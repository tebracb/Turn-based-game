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

function startGame() {
    veggies.currentWeapon = "";
    veggies.cofidenceLevel = 100;
    $(veggies.confidenceLevelDisplay).text(" " + veggies.cofidenceLevel);
    $(veggies.weaponName).text("Bare Hands");
    $(veggies.weaponPoint).text(10);

    fruits.currentWeapon = "";
    fruits.cofidenceLevel = 100;
    $(fruits.confidenceLevelDisplay).text(" " + fruits.cofidenceLevel);
    $(fruits.weaponName).text("Bare Hands");
    $(fruits.weaponPoint).text(10);

    // (re)draw the map

    $(".mainTile").attr("class", "mainTile").attr("src", 'img/dirtMainTile.png');
    changeTilesObstacles();
    changeTilesWeapons();
    addCharacters();

    activePlayer = veggies;
    prepareForTurn(activePlayer);

}

$().ready(function () {
    $(SQUARE).append(landTile);

    //add columns to the the temp row object
    for (var i = 0; i < COLUMNS; i++) {
        ROW.append(SQUARE.clone());
    }
    //clone the temp row object with the columns to the wrapper
    for (var i = 0; i < ROWS; i++) {
        $("#gameboard").append(ROW.clone());
    }
    startGame();

    // if ($(".fruits").length) {
    //     // reload if fruit exists.
    //     document.location.reload(true);
    //     } else {
    //     console.log("ERROR = Fruit class not found by jquery selector");
    //     }

    console.log($( ".mainTile" ).filter(".occupiedTile"));
});

/*-------------------------------------------------------------------------------
                MAP POPULATED WITH RANDOMLY PLACED ELEMENTS
---------------------------------------------------------------------------------*/


//selecting random tiles

function createRandomNum() {
    let randomNum = Math.floor(Math.random() * $('.mainTile').length);
    return randomNum;
};


// function selecting random tile, loop running until it finds a tile which is not already occupied, 
// making sure that all objects will be placed on the map
function selectRandomTile() {

    let randomTile = $('.mainTile:eq(' + createRandomNum() + ')');
    while ($(randomTile).hasClass("occupiedTile") || $(randomTile).hasClass("weapon") || $(randomTile).hasClass("blackhole") || randomTile === -1) {
        randomTile = $('.mainTile:eq(' + createRandomNum() + ')');
    }
        return randomTile;
};


function changeTilesObstacles() {
    for (i = 0; i < 3; i++) {

        $(selectRandomTile()).attr('src', 'img/mole.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/grass.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/pole.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/hay.png').addClass("occupiedTile");
    }
};

function changeTilesWeapons() {


    $(selectRandomTile()).attr('src', scarecrow.src).addClass("weapon").addClass(scarecrow.cssClass).removeClass("occupiedTile");
    $(selectRandomTile()).attr('src', tractor.src).addClass("weapon").addClass(tractor.cssClass).removeClass("occupiedTile");
    $(selectRandomTile()).attr('src', grasshopper.src).addClass("weapon").addClass(grasshopper.cssClass).removeClass("occupiedTile");
    $(selectRandomTile()).attr('src', caterpillar.src).addClass("weapon").addClass(caterpillar.cssClass).removeClass("occupiedTile");

    $(selectRandomTile()).attr('src', 'img/black_hole.png').addClass("blackhole").removeClass("occupiedTile");
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


    let veggieStartPosition = selectRandomTile();
    let conflict;

    $.each((getAvailableTiles(fruits.calculatePosition())), function () {
        while ($(this) === veggieStartPosition) {
            console.log('upsie');
            veggieStartPosition = selectRandomTile();
            conflict = true;
        } 
    });

        if (!conflict) {
        $(veggieStartPosition).attr('src', veggieSrc).addClass("occupiedTile character veggies");
        }
    }

        // $.each((getAvailableTiles(fruits.calculatePosition())), function () {
        //     if ($(this) === veggieStartPosition) {
        //         console.log('upsie');
        //         veggieStartPosition = selectRandomTile();
        //         conflict=
        //     } 
        // });
        //     $(veggieStartPosition).attr('src', veggieSrc).addClass("occupiedTile character veggies");

// );


/*-------------------------------------------------------------------------------
            SELECTED TILES
---------------------------------------------------------------------------------*/

/*function taking character's index position as argument, 
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

// ADDING HOVER (MOUSEENTER, MOUSELEAVE) FUNCTIONALITY TO AVAILABLE TILES 

function selectAvailableTiles(player) {

    $.each((getAvailableTiles(player.calculatePosition())), function () {

        $(this).css("box-sizing", "border-box");
        $(this).css("border", player.borderStyle);

        //adding hover effect (running character img); mirroring img if hover is in the other direction than where the character is facing

        $(this).mouseenter(function () {
            if (player === fruits) {

                if (($(this).index('.mainTile') - player.calculatePosition() < 4) && ($(this).index('.mainTile') - player.calculatePosition() > 0)) {
                    $(this).attr("src", player.moveImgSrc).css('transform', 'scaleX(-1)');
                } else {
                    $(this).attr("src", player.moveImgSrc).css('transform', 'none');
                }
            } else {
                if ((player.calculatePosition() - $(this).index('.mainTile') < 4) && (player.calculatePosition() - $(this).index('.mainTile') > 0)) {
                    $(this).attr("src", player.moveImgSrc).css('transform', 'scaleX(-1)');

                } else {
                    $(this).attr("src", player.moveImgSrc).css('transform', 'none');
                }
            }
        });

        //on mouseleave set back tile's img src to weapon (if there's weapon on the tile), black hole, or empty tile

        $(this).mouseleave(function () {
            $(this).css('transform', 'none');
            if ($(this).hasClass("weapon")) {
                that = $(this);
                $.each(weapons, function (index, w) {
                    if (that.hasClass(w.cssClass)) {
                        that.attr("src", w.src)
                    };
                });

            } else if ($(this).hasClass("blackhole")) {
                $(this).attr("src", "img/black_hole.png");

            } else {
                $(this).attr("src", 'img/dirtMainTile.png')
            }
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

                $('.mainTile:eq(' + (oldPosition) + ')').attr("src", 'img/dirtMainTile.png');
            }



            //RIGHT
            if ((newPosition - oldPosition) < 4 && (newPosition - oldPosition) > 0) {
                for (i = 1; i <= (newPosition - oldPosition); i++) {
                    checkForWeapons(player, oldPosition, i); //TODO - pass in oldPosition + i to the function
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

            // 'move character' to new tile by changing the tile's img src to the player's img, removing mirror

            $(this).attr('src', player.src).css('transform', 'none');
            $(this).addClass("character occupiedTile").addClass(player.cssClass);


            if ($('.mainTile:eq(' + (newPosition) + ')').hasClass('blackhole')) {

                ($('.mainTile:eq(' + (newPosition) + ')').removeClass('character fruits veggies occupiedTile'));
                ($('.mainTile:eq(' + (newPosition) + ')').attr('src', 'img/black_hole.png'));
                $(selectRandomTile()).attr('src', player.src).addClass("occupiedTile character").addClass(player.cssClass);
            }


            // start Battle Mode if the players get next to each other vertically or horizontally

            if ((newPosition - passivePlayer.calculatePosition()) === 10 || (newPosition - passivePlayer.calculatePosition()) === -10 ||
                ((newPosition - passivePlayer.calculatePosition()) === 1 && (Math.floor(newPosition / COLUMNS) === Math.floor(passivePlayer.calculatePosition() / COLUMNS))) ||
                ((newPosition - passivePlayer.calculatePosition()) === -1 && (Math.floor(newPosition / COLUMNS) === Math.floor(passivePlayer.calculatePosition() / COLUMNS)))) {
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

/*-------------------------------------------------------------------------------
            BATTLE MODE
---------------------------------------------------------------------------------*/
function changeUI() {
    $('#gameboard').fadeOut(1000);
    $('#player1').append('<div id=veggieBtnDiv><button class = btn id=veggieAttackBtn></button><button class = btn id=veggieDefendBtn></button></div>');
    $('#player2').append('<div id=fruitBtnDiv><button class = btn id=fruitAttackBtn></button><button class = btn id=fruitDefendBtn></button></div>');


    $(veggies.bigImgID).css('float', 'right').css('margin-top', '15px');
    $(fruits.bigImgID).css('float', 'left').css('margin-top', '15px');

    endPlayerTurn();
    fight(activePlayer);

};
/*The player can choose to attack or defend against the next shot
If the player chooses to defend themselves, they sustain 50% less damage than normal */

function fight(player) {

    showActivePlayer(player);


    $(player.attackButton).on('click', function () {

        $(player.bigImgID).removeClass('shake');
        player.isDefending = false;


        if (player.currentWeapon === "") {
            if (passivePlayer.isDefending === true) {
                passivePlayer.cofidenceLevel -= (10 / 2);
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
            $(passivePlayer.attackButton).attr("disabled", true);
            $('#player1').fadeOut(1000);
            $('#player2').fadeOut(1000, function () {
                $('#main').css('display', 'block');
                $(player.cssClass).css('text-transform', 'capitalize');
                $('<div id=winnerImgDiv><img src =' + player.winImgSrc + ' width=400px></div>').hide().appendTo('#main').fadeIn(1500);

                $('#main').append('<h1 id=winnerMessage>Congratulations, the winner is Team ' + player.cssClass + '!</h1>');
                $('#main').append('<div id =playAgainDiv><button class=btn id=playAgainBtn></button></div>');
                addEventListenerToPlayAgain();
            });

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

function showActivePlayer(player) {
    $(player.bigImgID).addClass('grow');
    $(passivePlayer.bigImgID).removeClass('grow');

    $(passivePlayer.attackButton).hide();
    $(passivePlayer.defendButton).hide();

    $(player.attackButton).show();
    $(player.defendButton).show();
};

/*-------------------------------------------------------------------------------
            PLAY AGAIN
---------------------------------------------------------------------------------*/

function addEventListenerToPlayAgain() {
    $('#playAgainBtn').on('click', function () {

        // delete button divs and winner illustrations from UI, set back interface to map mode

        $('#playAgainDiv').remove();
        $('#veggieBtnDiv').remove();
        $('#fruitBtnDiv').remove();
        $('#winnerImgDiv').remove();
        $('#winnerMessage').remove();
        $('#gameboard').css('display', 'block');

        $('#main').css('display', 'flex');

        // change back big character images and img classes to default

        $(fruits.bigImgID).attr('src', "img/fruit_big.PNG");
        $(veggies.bigImgID).attr('src', "img/veggie_big.PNG");
        $('#player1').fadeIn(1000);
        $('#player2').fadeIn(1000);
        $(fruits.bigImgID).css('float', 'none').css('margin-top', '0px').removeClass('shake grow');
        $(veggies.bigImgID).css('float', 'none').css('margin-top', '0px').removeClass('shake grow');


        startGame();

    })
};

/*-------------------------------------------------------------------------------
            MODAL
---------------------------------------------------------------------------------*/
$('#modalOpenBtn').on('click', function () {
    $('.modalDiv').css('display', 'block');
    closeModalOnOutsideClick();

});

$('#modalCloseBtn').on('click', function () {
    $('.modalDiv').css('display', 'none');
});

function closeModalOnOutsideClick() {

    $('.modalDiv').on('click', function () {
        $('.modalDiv').css('display', 'none');
    });
};

// block closeModalOnOutsideClick() when the click is inside the modalContent div

$(".modalContent").click(function (e) {
    e.stopPropagation();
});