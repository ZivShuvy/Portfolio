'use strict'
var gProjs = [];
var gCurrProj;

function initPage() {
    createProjects();
    renderProjects();
}

function getBadgesHTML() {
    var strHTML = '';
    gCurrProj.labels.forEach(function (label) {
        strHTML += `<span class="badge bg-secondary m-1">${label}</span>`
    });
    return strHTML;
}

function renderProjModal() {
    var strHTML = `<h2>${gCurrProj.name}</h2>
    <p class="item-intro text-muted">${gCurrProj.title}</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${gCurrProj.id}.jpg" alt="">
    <p>${gCurrProj.desc}</p>
    <ul class="list-inline">
      <li>Date: ${getFormattedDate(gCurrProj.publishedAt)}</li>
      <li>${getBadgesHTML()}</li>
    </ul>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
      <i class="fa fa-times"></i>
      Close Project</button>`
    var elModalBody = document.querySelector('#portfolioModal .modal-body');
    elModalBody.innerHTML = strHTML;

}

function renderProjects() {
    var strHTMLs = '';
    gProjs.forEach(function (proj, idx) {
        strHTMLs += `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="openModal(${idx})">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>`
    });
    var elPortoflio = document.querySelector('#portfolio .projs');
    elPortoflio.innerHTML = strHTMLs;
}

function openModal(idx) {
    gCurrProj = gProjs[idx];
    renderProjModal(gCurrProj);
}

function createProjects() {
    gProjs.push(createProject('pacman',
        'Pacman',
        'Eat before getting eaten',
        'Pac-Man is an action maze chase video game; the player controls the eponymous character through an enclosed maze. The objective of the game is to eat all of the dots placed in the maze while avoiding four colored ghosts — Blinky (red), Pinky (pink), Inky (cyan), and Clyde (orange) — that pursue him.',
        'projs/pacman',
        new Date(2021, 6, 19).getTime(),
        ['Matrixes', 'Keyboard events']));

    gProjs.push(createProject('minesweeper',
        'Mine Sweeper',
        'Expose the hidden mines',
        'In Minesweeper, mines are scattered throughout a board, which is divided into cells. Cells have three states: uncovered, covered and flagged. A covered cell is blank and clickable, while an uncovered cell is exposed. Flagged cells are those marked by the player to indicate a potential mine location.',
        'projs/minesweeper',
        new Date(2021, 6, 19).getTime(),
        ['Matrixes', 'Mouse events']));
}

function createProject(id, name, title, desc, url, publishedAt, labels) {
    return {
        id,
        name,
        title,
        desc,
        url,
        publishedAt,
        labels,
    }
}

function getFormattedDate(timestamp) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date(timestamp);
    console.log(date);
    var formattedDate = monthNames[date.getMonth()] + ' ' + date.getFullYear();
    return formattedDate;
}

