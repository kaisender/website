"use strict";

const videogamesValidator = {
    videogameForm : function(formData) {
        let errors = [];
        let name = formData.get("title");


        if (name.length < 3) {
            errors.push("El nombre del videojuego debe ser al menos de 3 caracteres");
        }

        return errors;

    }
}

export {videogamesValidator}