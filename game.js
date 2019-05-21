
let myImg = $('<img />', {
    class: 'mainTile',
    src: 'img/grass-no_edges.png',
});


const rows = 10;
const columns = 10;
const $row = $("<div />", {
    class: 'row'
});
const $square = $("<div />", {
    class: 'square'
});

$(document).ready(function () {
    //add columns to the the temp row object
    for (var i = 0; i < columns; i++) {
        $row.append($square.clone());
    }
    //clone the temp row object with the columns to the wrapper
    for (var i = 0; i < rows; i++) {
        $("#gameboard").append($row.clone());
    }
    changeTilesMountains();
    changeTilesWeapons();
    addCharacters();
  
   
    loopOverAdjacentTiles(character1Position);
    loopOverAdjacentTiles(character2Position);

});

$($square).append(myImg);



//selecting random tiles

function createRandomNum() {

    return Math.floor(Math.random() * $('.mainTile').length);
};

function selectRandomTile() {
    return $('.mainTile:eq(' + createRandomNum() + ')');
}

function changeTilesMountains() {
    for (i = 0; i < 9; i++) {

        $(selectRandomTile()).attr('src', 'img/mountains_grass_tile.png').addClass("occupiedTile");
        
    }
};

function changeTilesWeapons() {
    for (i = 0; i < 4; i++) {

        $(selectRandomTile()).attr('src', 'img/wizard_hut_grey_grass_tile.png').addClass("occupiedTile");
    }
};


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
    this.css("border", "1px solid blue");
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


// $(getAdjacentTiles(character1Position))[0].css("border", "1px solid red");