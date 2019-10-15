'use strict'

var gProjs = createProjs();



console.log(gProjs);




function createProjs() {
    var projs = [
        createProj('Mine Sweeper', 'Classic Game', 'A classic game developed by me!', './projs/mine-sweeper/index.html', './img/portfolio/mine-sweeper.jpeg', 'September 2019'),
        createProj('Touch Nums', 'Adictive Game', 'A classic game developed by me!', './projs/touch-nums/index.html', './img/portfolio/touch-nums.jpeg', 'September 2019'),
        createProj('Blogin', 'Blog', 'A responsive blog program!', './projs/Blogin/index.html', './img/portfolio/Blogin.jpeg', 'September 2019'),
        createProj('Guess Me', 'Guessing Game', 'A learning guessing program', './projs/guessMe/index.html', './img/portfolio/guessMe.jpeg', 'September 2019'),
        createProj('Ball Board', 'Intence Game', 'A classic game developed by me!', './projs/ball-board/index.html', './img/portfolio/ball-board.jpeg', 'September 2019')
    ];
    return projs;
}

function createProj(name, title, desc, url, imgUrl, date) {
    return {
        "id": name.toLowerCase(),
        "name": name,
        "title": title,
        "desc": desc,
        "url": url,
        "img": imgUrl,
        "createdAt": date,
        "publishedAt": + new Date(),
        "labels": ["Matrixes", "keyboard events"]
    }

}

function getgProjs() {
    return gProjs;
}

function getProjById (id) {
    var proj =gProjs.find(function (proj) {
        return id === proj.id
    })
    return proj;
}