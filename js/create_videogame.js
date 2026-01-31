"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { videogamesAPI_auto } from "./api/_videogames.js";
import { sessionManager } from "./utils/session.js";
import { videogamesValidator } from "./validators/videogameValidator.js";

const URLParams = new URLSearchParams(window.location.search);
const videogameId = URLParams.get("gameId");

async function main() {

    if(!sessionManager.isLogged()){
         
         document.getElementById("videogameForm").style.display = "none";
         messageRenderer.showErrorMessage("Debes estar registrado para crear una foto");
         return;

    }

    if (videogameId) {
        loadVideogame();
        
    }
    let form = document.getElementById("videogameForm");
    form.onsubmit = handleVideogameSubmit;
}

async function loadVideogame() {
    try {
        let videogame = await videogamesAPI_auto.getById(videogameId);

        let imageInput = document.getElementById("input-url");
        let titleInput = document.getElementById("input-title");
        let platformInput = document.getElementById("input-platform");
        let releaseYearInput = document.getElementById("input-releaseYear");
        let descriptionInput = document.getElementById("input-description");
        

        imageInput.value = videogame.imageUrl;
        titleInput.value = videogame.title;
        platformInput.value = videogame.platform;
        releaseYearInput.value = videogame.releaseYear;
        descriptionInput.value = videogame.description;
        let activeCheckbox = document.getElementById("input-checkbox");
    activeCheckbox.checked = videogame.active == 1;

        let title = document.getElementById("title");
        title.innerHTML = "Update VideoGame";
        let button = document.getElementById("submit-button");
        button.innerHTML = "Update";

       let buttonDelete = document.getElementById("delete-button");
    buttonDelete.style.display = "inline-block";
    buttonDelete.addEventListener("click", handleDelete);


    } catch(error) {
        let divError = document.getElementById("errors");
        divError.innerHTML = "";
        messageRenderer.showErrorMessage(error);
    }
    
}

async function handleVideogameSubmit(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let errors = videogamesValidator.videogameForm(formData);
    if (errors.length > 0) {
        let divError = document.getElementById("errors");
        divError.innerHTML = "";
        for(let e of errors) {
            messageRenderer.showErrorMessage(e);
        }
        return;
    }

    const isActive = form.active.checked ? 1 : 0;
    formData.append("active", isActive);

    formData.append("userId", sessionManager.getLoggedId());
    try {
        if(videogameId) {
            await videogamesAPI_auto.update(formData, videogameId);
            alert("Se ha actualizado el videojuego con exito");
        } else {

            await videogamesAPI_auto.create(formData);
            alert("Se ha creado el videojuego con exito");
        }
        window.location.href = "index.html";
    } catch(error) {
        messageRenderer.showErrorMessage(error);
    }

}

async function handleDelete() {
    if (confirm("¿Estás seguro de que deseas eliminar esta bebida?")) {
        try {
            await videogamesAPI_auto.delete(videogameId);
            alert("Bebida eliminada con éxito");
            window.location.href = "index.html";
        } catch (error) {
            messageRenderer.showErrorMessage(error);
        }
    }
}


document.addEventListener("DOMContentLoaded", main);