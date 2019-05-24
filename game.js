
let myImg = $('<img />', {
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


    
    loopOverAdjacentTiles(veggies.calculatePosition());

    veggies.characterMovement(veggies.calculatePosition(), veggieSrc);

});

$(SQUARE).append(myImg);



//selecting random tiles

function createRandomNum() {

    return Math.floor(Math.random() * $('.mainTile').length);
};

function selectRandomTile() {
    return $('.mainTile:eq(' + createRandomNum() + ')');
}

function changeTilesMountains() {
    for (i = 0; i < 5; i++) {

        $(selectRandomTile()).attr('src', 'img/vakond2.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/fuszal.png').addClass("occupiedTile");

    }
};

function changeTilesWeapons() {
    for (i = 0; i < 1; i++) {

        $(selectRandomTile()).attr('src', 'img/madarijeszto.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/colop.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/szalma.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/traktor.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/szocske.png').addClass("occupiedTile");
        $(selectRandomTile()).attr('src', 'img/hernyo.png').addClass("occupiedTile");
    };

};

class Character {
    constructor(src, confidenceLevel) {
        this.src = src;
        this.cofidenceLevel = confidenceLevel;

    }

    calculatePosition() {
        if (this.src === fruitSrc) {
            return $('.fruit').index('.mainTile');
        } else {
            return $('.veggie').index('.mainTile');
        }
    };
    

    /* Function taking the moving character's calculatePosition() and img src as arguments */
    characterMovement(calculatedPosition, src) {
    $.each(getAdjacentTiles(calculatedPosition), function () {
        $(this).on('click', function () {
            $('.mainTile:eq(' + (calculatedPosition) + ')').attr('src', 'img/dirtMainTile.png');
            $('.mainTile:eq(' + (calculatedPosition) + ')').removeClass("character fruit veggie occupiedTile");
            $(this).attr('src', src);
            $(this).addClass("character occupiedTile");
            if (src == fruitSrc) {
            $(this).addClass("fruit");
            } else {
            $(this).addClass("veggie");
            };

            console.log(calculatedPosition);
        });

    });
}

};

// $.each(getAdjacentTiles(calculatedPosition), function () {
//     $(this).on('click', function () {
//         if ()

//     };
// }


      


// function characterMovement(characterPosition, characterImgSrc) {
//     $.each((getAdjacentTiles(characterPosition)), function () {
//         $(this).on('click', function () {
//             $('.mainTile:eq(' + (characterPosition) + ')').attr('src', 'img/dirtMainTile.png');
//             $('.mainTile:eq(' + (characterPosition) + ')').removeClass("character fruit veggie occupiedTile");
//             $(this).attr('src', characterImgSrc);
//             $(this).addClass("character fruit occupiedTile");
//             characterPosition = $('.fruit').index('.mainTile');

//             loopOverAdjacentTiles(characterPosition);

//             console.log(characterPosition);
//         });

//     });
// }



let fruits = new Character(fruitSrc, 100);


let veggies = new Character(veggieSrc, 100);

function addCharacters() {
    $(selectRandomTile()).attr('src', fruitSrc).addClass("occupiedTile character fruit");
    $(selectRandomTile()).attr('src', veggieSrc).addClass("occupiedTile character veggie");

};

let adjacentTiles = [];

function getAdjacentTiles(characterPosition) {


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
    });
};


// function endRound() {
//     getAdjacentTiles(veggiePosition);
//     loopOverAdjacentTiles(veggiePosition);
// }

// function togglePlayer(){

// }

