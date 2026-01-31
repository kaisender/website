

"use strict";
import { parseHTML } from "../utils/parseHTML.js";

const videogameRenderer = {
    asRow : function(videogame) {
        let html = 
        `
    <tr>
    
      <td scope="row">
  <div class="d-flex justify-content-center">
    <img src="${videogame.imageUrl}" class="img-fluid" style="max-height: 30rem;">
  </div>
</td>

      <td>
      <div class="d-flex justify-content-center">
      
      <h3>${videogame.title}</h3></td>
      </div>
      <td>${videogame.description}</td>
      <td>${videogame.releaseYear}</td>
      <td>${videogame.platform}</td>
      <td>
        <div class="d-flex flex-column align-items-center">
        <img src="${videogame.avatarUrl}" class="img-fluid rounded-circle" style="max-height: 4rem;">
        <div class="d-flex justify-content-center">
        <small class="username"> <i>${videogame.username}</i></small>
        </div>
        <button type="editButton" class="btn btn-primary" style="max-height: 2rem;" id="editButton" onclick="location.href='create_videogame.html?gameId=${videogame.gameId}'" >Edit</button>
        </div>
        </td>
        
    </tr>
    
        `

        let videogameCard = parseHTML(html);
        return videogameCard;
    },

    tableHeader: function() {
    let html = `
    <thead>
    <div class="d-flex justify-content-center">
      <tr>
      
        <th>Image</th>
        <th>Title</th>
        <th>Description</th>
        <th>Release Year</th>
        <th>Platform</th>
        <th>Creator</th>
    
      </tr>
      </div>
    </thead>
    `;
    return parseHTML(html);
},


    asCardGallery: function(videogames) {
    const table = parseHTML('<table class="table table-striped table-bordered"></table>');
    let container = parseHTML('<div class= "videogame-gallery"></div>');
    
    container.appendChild(table);
    
    
    let th = videogameRenderer.tableHeader();
    let counter = 0;
    let tbody =  document.createElement('tbody'); 
    table.appendChild(th);
    table.appendChild(tbody);

    for (let videogame of videogames) {
        let row = videogameRenderer.asRow(videogame);
        tbody.appendChild(row);
        counter++;

        if (counter % 4 === 0) {
            table.appendChild(videogameRenderer.tableHeader());
            tbody =  document.createElement('tbody');  // Añadir títulos
            table.appendChild(tbody);
        }
    }

    return container;
}

}

export{videogameRenderer};

