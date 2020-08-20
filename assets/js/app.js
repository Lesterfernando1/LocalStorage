// variables
const listaTweets = document.getElementById('lista-tweets');



//event Listeneres

eventListeners();

function eventListeners() {
    //cuando se envia el formulario
    document.getElementById('formulario').addEventListener('submit',agregarTweet); //se seleeciona el id formulario y cuando haga un submit se hara la funcion agregar tweet

    //borrar tweets
    listaTweets.addEventListener('click',borrarTweet);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//funciones

//Añadir tweet de formulario
function agregarTweet(e) { 
    e.preventDefault();
    //leer el valor del textarea
    const tweet=document.getElementById('tweet').value;

    //creae boton de eliminar
    const botonBorrar= document.createElement('a'); //para crear el elemento
    botonBorrar.classList= 'borrar-tweet';
    botonBorrar.innerText='X';
    

    //crear elemento y añadir
    const li=document.createElement('li');
    li.innerText = tweet;
    //añade el boton de borrar tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista 
    listaTweets.appendChild(li); // se inserta en el padre. (listaTweets)


    // AÑADIR A LOCAL STORAGE
    agregarTweetLocalStorage(tweet);
}

//Borrar tweets del DOM

function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){ //si hiciste click en el boton con la clase borrar tweet
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);

    }
}

//Añadir tweet al local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets= obtenerTweetsLocalStorage();
    //añadir un nuevo tweet
    tweets.push(tweet);
    //convertir de string a arreglo de local storage
    localStorage.setItem('tweets', JSON.stringify(tweets)); //stringify convierte un json a string
}

//comprobar si hay elementos en el local storage, retonrna un arreglo.
function obtenerTweetsLocalStorage(){
    let tweets;
    
    //revisar los valores del local S
    if(localStorage.getItem('tweets') ===  null){
        tweets=[];
    }
    else{
        tweets= JSON.parse(localStorage.getItem('tweets') ); // el parse se lee el string y lo convierte array.
    }

    return tweets;
}

//mostrar datos de local storage en la lista

function localStorageListo(){
    let tweets;

    tweets= obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        //creae boton de eliminar
        const botonBorrar= document.createElement('a'); //para crear el elemento
        botonBorrar.classList= 'borrar-tweet';
        botonBorrar.innerText='X';
    
        //crear elemento y añadir
        const li=document.createElement('li');
        li.innerText = tweet;
        //añade el boton de borrar tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista 
        listaTweets.appendChild(li); // se inserta en el padre. (listaTweets)
    });

}

//eliminar tweet del local storage
function borrarTweetLocalStorage(tweet){

    let tweets,tweetBorrar;
    // elimina la X del tweet
    tweetBorrar= tweet.substring(0,tweet.length -1);

    tweets=obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet,index) { //con el index te dice donde estas en el arreglo.
        if(tweetBorrar=== tweet){
            tweets.splice(index,1);
        }
    });

    localStorage.setItem('tweets',JSON.stringify(tweets));
}

