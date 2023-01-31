import React, { Component } from 'react'
import axios from 'axios';
export default class Favourites extends Component {

    constructor() {
        super();
        this.state = {
            movies : [],
            genre : [],
            currGener : "All Genre"
        }
    } 

    async componentDidMount() {
        // console.log("componentDidMount is called");
        // console.log(API_KEY);
        let ans = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=c900eedb12db3475789baf86e1a105a7&language=en-US&page=1`
        );

        let genreId = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
          };
        
        let genreArr = [];  // help to collect the uniques gener in this array
        ans.data.results.map((movieObj) => {
            if(!genreArr.includes(genreId[movieObj.genre_ids[0]])){
               genreArr.push(genreId[movieObj.genre_ids[0]])
            }
        });
        console.log(ans.data);
        genreArr.unshift("All Genre")
        this.setState({
          movies: [...ans.data.results], //[{},{},{}]
          genre : [...genreArr]
        });

    }
    handleCurrGenre = (genre) => {
        this.setState({
            currGener: genre,
        })
    }

      
  render() {
    let genreId = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
      };
    return (
    <div class="row">
        <div class="col-3">
          <ul class="list-group">
            {this.state.genre.map((genre) => (
               this.state.currGener == genre ?  
               <li class="list-group-item active" aria-current="true">{genre}</li>:
               <li class="list-group-item" aria-current="true" onClick={() => this.handleCurrGenre(genre)}>{genre}</li>
           ))}
           
          </ul>
        </div>
          <div class="col">
            <div class="row">
                <input type="text" className="col" placeholder="Search"></input>
                <input type="number" className="col" placeholder="5"></input>
            </div>
            <div class="row">
         <table class="table">
               <thead>
                 <tr>
                   <th scope="col">Title</th>
                   <th scope="col">Genere</th>
                   <th scope="col">Popularity</th>
                   <th scope="col">Rating</th>
                   <th scope="col"></th>
                 </tr>
               </thead>
             <tbody>
            {this.state.movies.map((movieObj) => (
              <tr>
                <td scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'6rem'}}/>{movieObj.original_title}</td>
                <td>{genreId[movieObj.genre_ids[0]]}</td>
                <td>{movieObj.popularity}</td>
                <td>{movieObj.vote_average}</td>
                <td><button class="btn btn-outline-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>
              </tr>
               ))}
             </tbody>
            </table>
            </div>  
          </div>


        </div>
    )
  }
}


