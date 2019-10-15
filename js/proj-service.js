'use strict'

var gProjs = createProjs();



console.log(gProjs);




function createProjs() {
    var projs = [
        createProj('Mine Sweeper', 'Classic Game', 'A classic game developed by me!', '../img/portfolio/mine-sweeper.jpeg', 'September 2019'),
        createProj('Touch Nums', 'Adictive Game', 'A classic game developed by me!', '../img/portfolio/touch-nums.jpeg', 'September 2019')
    ];
    return projs;
}

function createProj(name, title, desc, imgUrl, date) {
    return {
        "id": name.toLowerCase(),
        "name": name,
        "title": title,
        "desc": desc,
        "url": "projs/sokoban",
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