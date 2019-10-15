'use strict'

renderProjs();

function renderProjs() {
    var projs = getgProjs();
    var elProjContainer = document.querySelector('.proj-container');
    var projHTML = projs.map(function (proj) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href=".modal" onClick="renderModal('${proj.id}')">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="portfolio-img img-fluid" src="${proj.img}" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.title}</h4>
          <p class="text-muted">Illustration</p>
        </div>
      </div>`
    })
    elProjContainer.innerHTML = projHTML.join('');
}

function renderModal(projId) {
    var proj = getProjById(projId);
    var elModal = document.querySelector('.modal-body');
    var modalHTML = `
    <h2>${proj.name}</h2>
                <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                <img class="img-fluid d-block mx-auto" src="${proj.img}" alt="">
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${proj.createdAt}</li>
                  <li>Client: Threads</li>
                  <li>Category: Illustration</li>
                </ul>
                <a href="${proj.url}" target="_blank" class="btn btn-primary" >Check The Project</a>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>`
    elModal.innerHTML = modalHTML;
}