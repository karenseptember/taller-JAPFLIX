document.addEventListener("DOMContentLoaded",function(){
    let JAPFLIX = "https://japceibal.github.io/japflix_api/movies-data.json";
    let btnBuscar = document.getElementById("btnBuscar");
    let inputBuscar = document.getElementById("inputBuscar");

    //Creacion de fetch trae de la endpoint los datos de las peliculas
    fetch(JAPFLIX)
    .then(response=>response.json())
    .then(data => {
        peliculas = data
        
        btnBuscar.addEventListener("click", function(){
            mostrarPelicula = [];
            if(inputBuscar.value){
                mostrarPelicula = peliculas.filter(pelicula => {
            return pelicula.title.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
                    pelicula.tagline.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
                    pelicula.overview.toLowerCase().includes(inputBuscar.value.toLowerCase())


                });
            }
            showPeliculas(mostrarPelicula); //Ejecuta la funcion declarada mostrando las peliculas filtradas
        })
    }) 
})

//CREACION DE FUNCION PARA MOSTRAR AL REALIZAR EL EVENTO CLICK

let peliculas = []; 
let mostrarPelicula = [];
let lista = document.getElementById("lista");


function showPeliculas(array){
lista.innerHTML = ""; //SI HUBIESE UNA BUSQUEDA ANTERIOR LIMPIAMOS LA LISTA DE ESTA MANERA
for (let pelicula of array){
    let estrellas = ""; // Creamos la variable que almacene las estrellas
    for(let i=0; i<parseInt(pelicula.vote_average/2); i++){
        estrellas+= `<span class="fa fa-star checked"></span>` //Aumenta y se marca la estrella
    }
    for(let i=0; i<(5 - parseInt(pelicula.vote_average/2)); i++){
        estrellas+= `<span class="fa fa-star"></span>` //Sin el agregado checked obtenemos la estrella vacia 
    }
let genres = "";
for(let genero of pelicula.genres){
    genres += genero.name + " - "
}
genres= genres.slice(0, genres.length - 3)// Al contar con 3 generos en cada pelicula eliminamos al ultimo -

//INSERTARMOS EN EL HTML EL CONTENIDO DE CADA PELICULA EN LA LISTA DE BUSQUEDA
lista.innerHTML+=
` <li class="list-group-item bg-dark text-white">
                <!-- Button con mas detalles de la pelicula buscada -->
                <div type="button" data-bs-toggle="offcanvas" data-bs-target="#oc${pelicula.id}" aria-controls="offcanvasTop">
                    <div class="fw-bold">${pelicula.title} <span class="float-end">${estrellas}</span></div> 
                    <div class="text-muted fst-italic">${pelicula.tagline}</div> 
                </div>

             
                <div class="offcanvas offcanvas-top text-dark" tabindex="-1" id="oc${pelicula.id}" aria-labelledby="offcanvasTopLabel">
                    <div class="offcanvas-header">
                        <h3 class="offcanvas-title" id="offcanvasTopLabel">${pelicula.title}</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> 
                    </div>

                    <div class="offcanvas-body">
                        <p>${pelicula.overview}</p> 
                        <hr>
                        <span class="text-muted">
                            ${genres} 
                            <!-- BOTON DE MAS INFORMACION -->
                            <button class="float-end btn btn-secondary dropdown-toggle" type="button" id="dd${pelicula.id}" data-bs-toggle="dropdown" aria-expanded="false">Mas info</button>
                            <ul class="dropdown-menu" aria-labelledby="dd${pelicula.id}">
                                <li><span class="dropdown-item">Año: <span class="float-end ps-1"> ${pelicula.release_date.slice(0,4)}</span></span></li>
                                <li><span class="dropdown-item">Duración: <span class="float-end ps-1"> ${pelicula.runtime} mins</span></span></li> 
                                <li><span class="dropdown-item">Presupuesto: <span class="float-end ps-1"> $${pelicula.budget}</span></span></li> 
                                <li><span class="dropdown-item">Ingresos: <span class="float-end ps-1"> $${pelicula.revenue}</span></span></li> 
                            </ul>
                        </span>
                    </div>
                </div>
            </li>`
}
}