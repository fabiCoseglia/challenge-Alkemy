import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Login } from "./components/Login"
import { List } from "./components/List"
import { Detail } from "./components/Detail"
import { Results } from "./components/Results"
/* import { Footer } from "./components/Footer" */
import './css/list.css'
import { Favorite } from "./components/Favorite"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Footer } from "./components/Footer"

function App() {
  const [favorites,setFavorites] = useState([]);
  useEffect(()=>{
      const favsInLocalStorage = localStorage.getItem('favs');
      
      if(favsInLocalStorage != null){
          const favsArray = JSON.parse(favsInLocalStorage);
          setFavorites(favsArray)
      }

  },[setFavorites])
  //seteo de Favoritos//
  const addOrRemoveFav= (e) =>{
    const favMovies = localStorage.getItem('favs');
    let tempMoviesInFavs;
    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }
    const favIcon = e.currentTarget;
    const card = favIcon.parentElement;
    const imgURL = card.querySelector('img').getAttribute('src')
    const movieData={
      title:card.querySelector('img').dataset.movietitle,
      imgURL,
      id: card.querySelector('a').dataset.movieid
    }
    //Filter para no repetir peliculas.
    let movieIsInArray = tempMoviesInFavs.find((movie) => movie.id === movieData.id);

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
      
      //Mensaje de agregar a Favoritos
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Agregado a Favoritos"
      });
      //Mensaje de agregar a Favoritos
      
    } else {
      let moviesLeft = tempMoviesInFavs.filter((movie) => movie.id !== movieData.id);
      tempMoviesInFavs = moviesLeft; // Actualizar tempMoviesInFavs
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
            //Mensaje de Eliminar de Favoritos
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "error",
              title: "Eliminado de Favoritos"
            });
            //Mensaje de Eliminar de Favoritos
    }


  }
  return (
    <>
    <div className="d-flex flex-column">
      <Header favorites={favorites} />
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/list" Component={(props)=> <List addOrRemoveFav={addOrRemoveFav} {...props} />} />
          <Route path="/detail" Component={Detail} />
          <Route path="/results" Component={(props)=> <Results favorites={favorites} addOrRemoveFav={addOrRemoveFav} {...props} />} />
          <Route path="/favorites" Component={(props)=> <Favorite favorites={favorites} addOrRemoveFav={addOrRemoveFav} {...props} />} />
          <Route path="/*" Component={Login} />
        </Routes>
      <Footer /> 
    </div>
    </>
  )
}

export default App
