import React, { Component } from "react";
import Newsitem from "./Newsitem";
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor() {
    super();
    console.log("Hello, I am the constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async (page = 1) => {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24d7791113b9476580866b9af4ff22b5&page=${page}&pageSize=${this.props.pageSize}`;
    
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ 
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
        page: page
      });
    } catch (error) {
      console.error("Error fetching the news articles: ", error);
      this.setState({ loading: false });
    }
  }

  nextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      alert("No more pages");
    } else {
      this.fetchNews(this.state.page + 1);
    }
  }

  previousClick = async () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h2>Top News --</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imgurl={element.urlToImage}
                  url={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} onClick={this.previousClick} className="btn btn-dark">&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.nextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
