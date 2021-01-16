"use strict";
const URL = "https://rickandmortyapi.com/api/character";
let characters = [];

//Obtengo url
const fetchCharacter = async (url = URL) => {
  try {
    const response = await fetch(url, { method: "GET" });
    const { results: characters } = await response.json();
    return characters;
  } catch (err) {
    console.error(err);
  }
};

//Muestra mensaje y deshabilita el input
const showMessage = () => {
  document.getElementById("message").innerHTML =
    "No hay elementos para mostrar";
  document.getElementById("input").disabled = true;
};

//Funcion que borra el objeto del DOM y del array
const del = (id) => {
  document.getElementById(id).remove();
  characters = characters.filter((character) => character.id != id);
  characters.length === 0 ? showMessage() : null;
};

//const iconAlive = `<span class="status"><i class="bi bi-record"></i></span>${status} - ${specie}</span>`
 // const iconDeadUnknow = 
 // const alive = ``
 // const deadUnknow =  

//Plasma en el la pagina las tarjetas de los personajes
const createNodo = ({ id, image, name, status, gender, specie }) => {
  
  const nodo = `
    <div class="col-md-3 col-6" id="${id}">
        <div class="card text-white bg-dark mt-5 ml-3">
          <img class="card-img-top" src="${image}"> 

          <div class="card-body rounded mr-2"> 
            <h5 class="card-title">Nombre: ${name}</h5>
            <p class="card-text">Gender: ${gender}</p>
            <span class="status"><span></span>${status} - ${specie}</span>
            <p><button onClick="del(${id})" class="btn btn-block btn-danger">borrar</button></p>
          </div>  

        </div>
      </div>
    `;
  document.getElementById("apiR").insertAdjacentHTML("beforeend", nodo);
};

//Itero con map el objeto characters y por cada iteracion de personaje ejecuto la funcion createNodo
const iterarCharacter = (characters) => {
  characters.map((character) => {
    createNodo(character);
  });
};

//Funcion para limpiar el input y la tarjeta mostrada
const clean = () => {
  document.getElementById("input").value = "";
  document.getElementById("apiFound").value = null;
};

const createFoundCharacter = (foundCharacter) => {
  //document.getElementById("apiR").remove();
  const find = `
<div class="container justify-content-center">
  <div class="col-md-3 col-6" id="${foundCharacter.id}">
    <div class="card card text-white bg-dark ">
      <img class="card-img-left" src="${foundCharacter.image}"> 

      <div class="card-body rounded mr-2"> 
        <h5 class="card-title">Nombre: ${foundCharacter.name}</h5>
         <p class="card-text">Gender: ${foundCharacter.gender}</p>
        <p class="card-text">Status: ${foundCharacter.status}</p>
        <p><button onClick="del(${foundCharacter.id})" class="btn btn-block btn-danger">borrar</button></p>
      </div>
  </div>
</div>`;
  document.getElementById("apiFound").insertAdjacentHTML("beforeend", find);
};

//Funcion que busca el personaje ingresado en el input, y almacena el resultado dentro del objeto foundCharacter
const searchCharacter = () => {
  const { value: name } = document.getElementById("input");
  const foundcharacter = characters.find(
    (character) =>
      character.name.toLowerCase() === name.toLowerCase() ||
      character.name === name
  );
  createFoundCharacter(foundcharacter);
};

//Carga DOM
const start = async () => {
  document.getElementById("search").addEventListener("click", searchCharacter);
  document.getElementById("clean").addEventListener("click", clean);
  characters = await fetchCharacter();
  iterarCharacter(characters);
};

window.onload = start();
