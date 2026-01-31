"use strict";

import { videogameswithusersAPI_auto} from "./api/_videogameswithusers.js";
import { messageRenderer } from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";
import { videogameRenderer} from "./renderers/videogamesRenderer.js";

async function main() {
    

     await loadVideogame();
    
    if (!sessionManager.isLogged()) {
        hideEditButton();
    }
}

async function loadVideogame() {
    try {
    let container = document.getElementById("content");
    let videogame = await videogameswithusersAPI_auto.getAll();
    let gallery = videogameRenderer.asCardGallery(videogame);
    container.appendChild(gallery)
    } catch(error) {
        messageRenderer.showErrorMessage(error);
    }
}

function hideEditButton() {
    let buttons = document.getElementsByClassName("btn");
    for (let btn of buttons) {
        btn.style.display = "none"
    }
}

document.addEventListener("DOMContentLoaded", main);