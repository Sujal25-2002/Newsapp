import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import "./custom.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";





export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

 capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // for constructor you have to call the super class function in youre super class
  constructor(props) {
    super(props);
    document.title = `${this.capitalizeFirstLetter(this.props.category)}<-Newsmonkey`
    this.state = {
      // articles : this.articles, now as i have removed articles from my sample.json so i've to pass articles or we can say an state a empty array so that when we are changing our setstate so we have to passed or overwrite this empty array
      articles: [],
      loading: false,
      page: 1,
     
    }
  }

  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);

  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
  this.setState({page:this.state.page+1})
  this.updateNews();
   
  };

  handlePrevClick = async () => {
    
    this.setState({page:this.state.page-1})
    this.updateNews();
  };

  render() {
    return (
    
        <div className="contianer my-3">
          <h2 className="heading1 my-5" style={{padding:"20px"}}>Newsmonkey -- Top Headlines From {this.capitalizeFirstLetter(this.props.category)} </h2>
          {/* next line means previous state of loading is false so of loading state was true you have to show the spinner  */}
          {this.state.loading && <Spinner />}

         <div className="row">  
            { !this.state.loading && this.state.articles.map((element) => {
               return( 
               <div className="col-md-4"  key={element.url}>
                    <NewsItem 
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }

                      
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                      
                    />
                  </div>
               )
              })}
           </div>
          <div className="container d-flex justify-content-between">
        
              <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr; </button>
          </div>
        </div>
    );
  }
}


 