import React, { Component } from 'react'
import axios from 'axios';
export default class Favourites extends Component {

    constructor() {
        super();
        this.state = {
            movies : [],
            genre : [],
            currGener : "All Genre",
            currText : "",
            limit: 5,
            currPage : 1,
        }
    } 

    async componentDidMount() {
        // console.log("componentDidMount is called");
        // console.log(API_KEY);
        // let ans = await axios.get(
        //   `https://api.themoviedb.org/3/movie/popular?api_key=c900eedb12db3475789baf86e1a105a7&language=en-US&page=1`
        // );
        let results = JSON.parse(localStorage.getItem("movies"));

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
        results.map((movieObj) => {
            if(!genreArr.includes(genreId[movieObj.genre_ids[0]])){
               genreArr.push(genreId[movieObj.genre_ids[0]])
            }
        });
        // console.log(ans.data);
        genreArr.unshift("All Genre")
        this.setState({
          movies: [...results], //[{},{},{}]
          genre : [...genreArr]
        });

    }
    handleCurrGenre = (genre) => {
        this.setState({
            currGener: genre,
        })
    }

    handleText = (e) =>{
      this.setState({
        currText : e.target.value,
      });
    }

    sortPopularityAsc = () => {
      let allMovies = this.state.movies;
      allMovies.sort((objA,objB) => {
        return objA.popularity - objB.popularity;
      })
      this.setState({
        movies : [...allMovies],
      })
    }
    sortPopularityDesc = () => {
      let allMovies = this.state.movies;
      allMovies.sort((objA,objB) => {
        return objB.popularity - objA.popularity;
      })
      this.setState({
        movies : [...allMovies],
      })
    }
    sortRstingAsc = () => {
      let allMovies = this.state.movies;
      allMovies.sort((objA,objB) => {
        return objB.vote_average - objA.vote_average;
      })
      this.setState({
        movies : [...allMovies],
      })
    }
    sortRstingDesc = () => {
      let allMovies = this.state.movies;
      allMovies.sort((objA,objB) => {
        return objA.vote_average - objB.vote_average;
      })
      this.setState({
        movies : [...allMovies],
      })
    }

    handelePageNum = (page) =>{
      this.setState({
        currPage: page,
      })
    }

    handleDelete = (id) => {
      let newMovies = this.state.movies.filter((movieObj) => {
        return movieObj.id != id;
      })
      this.setState({
        movies:[...newMovies]
      })
      localStorage.setItem("movies",JSON.stringify(newMovies));
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
    let filteredMovies = this.state.movies;

    if(this.state.currText === ""){
      filteredMovies = this.state.movies;
    }else{
      filteredMovies = filteredMovies.filter((movieObj) =>{
        let movieName = movieObj.original_title.toLowerCase();
        return movieName.includes(this.state.currText);
      })
    }

   
    if(this.state.currGener != "All Genre"){
      filteredMovies = this.state.movies.filter((movieObj) => genreId[movieObj.genre_ids[0]] == this.state.currGener);
    }

    let numOfPages = Math.ceil(filteredMovies.length/this.state.limit);
    let pageArr = [];

    for(let i=1;i<=numOfPages;i++){
      pageArr.push(i);
    }

    let si = (this.state.currPage-1)*this.state.limit;
    let ei = si + this.state.limit - 1;
    filteredMovies = filteredMovies.slice(si,ei+1);


    return (
    <div class="row">
        <div class="col-3">
          <ul class="list-group">
            {this.state.genre.map((genre) => 
               this.state.currGener == genre ? (
               <li class="list-group-item active" aria-current="true">
                {genre}</li>
                ):(
                <li class="list-group-item" aria-current="true"
                 onClick={() => this.handleCurrGenre(genre)}>
                  {genre}</li>
             )
             )}
           
          </ul>
        </div>
          <div class="col">
            <div class="row">
                <input type="text" className="col" placeholder="Search" value={this.state.currText} onChange={this.handleText}></input>
                <input type="number" className="col-4" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
            </div>
            <div class="row">
         <table class="table">
               <thead>
                 <tr>
                   <th scope="col">Title</th>
                   <th scope="col">Genere</th>
                   
                   <th scope="col">
                    <i class="fa-solid fa-caret-up" onClick={this.sortPopularityAsc}/>
                    Popularity
                   <i class="fa-solid fa-caret-down"onClick={this.sortPopularityDesc}/></th>

                   <th scope="col"><i class="fa-solid fa-caret-up"onClick={this.sortRstingAsc}/>
                    Rating
                   <i class="fa-solid fa-caret-down"onClick={this.sortRstingDesc}/></th>

                   <th scope="col"></th>
                 </tr>
               </thead>
             <tbody>
            {filteredMovies.map((movieObj) => (
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
          <nav aria-label='Page navigation example'>
            <ul class="pagination">
              {pageArr.map((page)=>(
                <li class="page-item">
                  <a class="page-link" onClick={() => this.handelePageNum(page)}>
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

        </div>
    )
  }
}


