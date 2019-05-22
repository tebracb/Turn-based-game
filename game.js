
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





let veggies = {
    src: "img/char2.png"
}

let veggieSrc = veggies.src;

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
  
   
    loopOverAdjacentTiles(character1Position);
    loopOverAdjacentTiles(character2Position);

    characterMovement(character1Position, fruitSrc);

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
        constructor (src) {
            this.src = src;
           
        }
    };
    let fruitSrc = "img/char1.png";
    let fruits = new Character (fruitSrc);


function getAdjacentTiles(indexPosition) {


    // $('.mainTile:eq(' + (character1Position+10)  + ')').hide(2000);


    let adjacentTiles = [];

        if(!((indexPosition+1) % 10 === 0) && !($('.mainTile:eq(' + (indexPosition+1) + ')').hasClass("occupiedTile"))) {
            adjacentTiles.push($('.mainTile:eq(' + (indexPosition+1) + ')'));
        }

        if(!(indexPosition % 10 === 0) && !($('.mainTile:eq(' + (indexPosition-1) + ')').hasClass("occupiedTile"))) {
            adjacentTiles.push($('.mainTile:eq(' + (indexPosition-1) + ')'));
        }

        if(indexPosition > 9 && !($('.mainTile:eq(' + (indexPosition-10) + ')').hasClass("occupiedTile")))  {
            adjacentTiles.push($('.mainTile:eq(' + (indexPosition-10) + ')'));
        }
        
        if(indexPosition < 90 && !($('.mainTile:eq(' + (indexPosition+10) + ')').hasClass("occupiedTile")))  {
            adjacentTiles.push($('.mainTile:eq(' + (indexPosition+10) + ')'));
        }
        
    
    return adjacentTiles;
};


function loopOverAdjacentTiles(characterPosition) {
$.each((getAdjacentTiles(characterPosition)), function() {
    this.css("border", "1px solid #ed2f30");
    this.css("box-sizing", "border-box");
    });
};




let character1Position;
let character2Position;

function addCharacters() {
    $(selectRandomTile()).attr('src', 'img/char1.png').addClass("occupiedTile character character1");
    $(selectRandomTile()).attr('src', 'img/char2.png').addClass("occupiedTile character character2");

    character1Position = $('.character1').index('.mainTile');
    character2Position = $('.character2').index('.mainTile');
   
};

// function endRound() {
//     getAdjacentTiles(character2Position);
//     loopOverAdjacentTiles(character2Position);
// }

// function togglePlayer(){
    
// }

function characterMovement(characterPosition, characterImgSrc) {
    $.each((getAdjacentTiles(characterPosition)), function() {
        $(this).on('click', function () {
            $('.mainTile:eq(' + (characterPosition) + ')').attr('src', 'img/dirtMainTile.png');
            $('.mainTile:eq(' + (characterPosition) + ')').removeClass("character character1 character2 occupiedTile");
            $(this).attr('src', characterImgSrc);
            $(this).addClass("character character1 occupiedTile");
            characterPosition = $('.character1').index('.mainTile');

            loopOverAdjacentTiles(characterPosition);
            
           console.log(characterPosition);
        });
        
        });
        

}