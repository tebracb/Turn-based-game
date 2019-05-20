
let myImg = $('<img />', {
    class: 'mainTile',
    src: 'img/grass-no_edges.png',
});


const rows = 8;
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
    addCharacters()
});

$($square).append(myImg);



//selecting random tiles

function createRandomNum() {

    return Math.floor(Math.random() * $('.mainTile').length);
};

function changeTilesMountains() {
    for (i = 0; i < 9; i++) {

        $('.mainTile:eq(' + createRandomNum() + ')').attr('src', 'img/mountains_grass_tile.png').addClass("occupiedTile");
        
    }
};

function changeTilesWeapons() {
    for (i = 0; i < 4; i++) {

        $('.mainTile:eq(' + createRandomNum() + ')').attr('src', 'img/wizard_hut_grey_grass_tile.png').addClass("occupiedTile");
    }
};


function addCharacters() {
    $('.mainTile:eq(' + createRandomNum() + ')').attr('src', 'img/char1.png').addClass("occupiedTile");
    $('.mainTile:eq(' + createRandomNum() + ')').attr('src', 'img/char2.png').addClass("occupiedTile");
};


