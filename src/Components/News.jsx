import React, { Component } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 12,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: false,
    };
    document.title = `Live News - ${props.category.toUpperCase()}`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    this.setState({ loading: true });
    await this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      document.title = `Live News - ${this.props.category.toUpperCase()}`;
    }
  }

  fetchData = async () => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0a7f6627d7c4b58b2228e0f2551072d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f0a7f6627d7c4b58b2228e0f2551072d`;
      // let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f0a7f6627d7c4b58b2228e0f2551072d`;
      this.props.setProgress(30);
      let response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      let parsedData = await response.json();


      let imgData = parsedData.articles.filter((d) => d.urlToImage !== null);
      console.log("imgdata", imgData);

      this.props.setProgress(50);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  handleNext = async () => {
    this.setState({ page: this.state.page + 1, loading: true }, this.fetchData);
  };

  handlePrev = async () => {
    this.setState({ page: this.state.page - 1, loading: true }, this.fetchData);
  };

  render() {
    return (
      <>
        <h1 className="text-center text-primary">Live News</h1>
        {this.state.loading && <Spinner />}
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title}
                  description={element.description}
                  url={element.urlToImage}
                  urlLink={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
          <div className="container mt-4">
            <ul className="pagination justify-content-between">
              <button
                className="btn btn-success"
                type="button"
                onClick={this.handlePrev}
                disabled={this.state.page <= 1}
                aria-label="Previous page"
              >
                &laquo; Previous
              </button>
              <button
                className="btn btn-success"
                type="button"
                onClick={this.handleNext}
                disabled={
                  this.state.page >=
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                }
                aria-label="Next page"
              >
                Next &raquo;
              </button>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
