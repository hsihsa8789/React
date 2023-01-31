import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios'   // axios(is just like a fetch and cherio) npm library it help to endpoint par request marne me help krta hai
// import API_KEY from "./secrets";

export default class List extends Component {
  constructor(){
    super();
    this.state = {
      hover: "",
      parr:[1],
      currPage:1,
      movies:[],
    }
  }

  handleEnter = (id) => {
    this.setState({
      hover:id
    })
  };

  handleLeave = () => {
    this.setState({
      hover: "",
    })
  }

  handlePageNum = (pageNum) =>{

  }

  changeMovies = async () => {
      // console.log("componentDidMount is called");
      // console.log(API_KEY);
      let ans = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=c900eedb12db3475789baf86e1a105a7&language=en-US&page=${this.state.currPage}`
      );
      console.log(ans.data);
      this.setState({
        movies: [...ans.data.results], //[{},{},{}] //agar ye locatation bhi check krta hai to to fir yha dikkat hai is liye ...operater lagaya kyu ki har baar ye location bhi change kr deta hai
      });

  }

  handleNext = () =>{
    let tempArr = [];
    for(let i=1; i<=this.state.parr.length+1; i++){
      tempArr.push(i);
    }
    this.setState({   // 1)setState function is a asyncronous function hota hai 
                      //2)aur se previous page and current page as well as location ke data ko compair krta hai agr same huaa to render nhi krta hai
      parr: [...tempArr],
      currPage : this.state.currPage + 1
    },this.changeMovies)
    console.log(this.state.currPage);
    
  }

  handlePrevious = () =>{
    if(this.state.currPage!=1){
      this.setState({
        currPage : this.state.currPage - 1
      },this.changeMovies)
    }
  }

  handlePageNum = (pageNum) =>{
    this.setState({
      currPage : pageNum
    },this.changeMovies)
  }

  async componentDidMount() {
    // console.log("componentDidMount is called");
    // console.log(API_KEY);
    let ans = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=c900eedb12db3475789baf86e1a105a7&language=en-US&page=${this.state.currPage}`
    );
    console.log(ans.data);
    this.setState({
      movies: [...ans.data.results], //[{},{},{}]
    });
  }
  

  render() {
    // console.log("render is callled");
    // let movie = movies.results;
    return (
     <>
      {this.state.movies.length === 0 ? (
        <div className='spinner-grow text-success' role="status">
        <span className='visually-hidden'>Loading...</span>
      </div>
      ):(
      <div>
        <h3 className='text-center'>
            <strong>Trending</strong>
        </h3>
        <div className='movies-list'>
            {this.state.movies.map((movieObj) => (    // ye bracket is liye dala kyu ki html likh rhehai agr kuchh return krna hota to curly breses daal dete
               <div className="card movies-card">
                <div className='card movie-card'
                onMouseEnter={() => this.handleEnter(movieObj.id)}
                onMouseLeave={this.handleLeave}>

               <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                className="card-img-top movies-img" alt="..." style={{height:"40vh",width:"20vw"}}/>
                
                  {/* <div class="card-body"> */}
                
                <h5 class="card-title movies-title">{movieObj.original_title}</h5>
                 
                 {/* <p class="card-text banner-text">{movieObj.overview}</p> */}
                <div className='button-wrapper'>
                  {this.state.hover === movieObj.id &&
                    <a href="#" class="btn btn-primary movies-button">Go somewhere</a>}
                </div>
                  {/*  </div> */}
               </div>
              </div>    
            )
            )}
        </div>
        
       <div className="pagination">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" onClick={this.handlePrevious}>
                    Previous
                </a>
              </li>
              {
              this.state.parr.map((pageNum) => (
              <li class = "page-item">
              <a class="page-link" onClick ={() => {this.handlePageNum(pageNum) }}>{pageNum}</a>
              </li>
               ))
              }
              <li class="page-item">
              <a class="page-link" onClick={this.handleNext}>Next</a>
              </li>
            </ul>
          </nav>
       </div> 
      </div>
      )} 
    </>
    )
  }
}
