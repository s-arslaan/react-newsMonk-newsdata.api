import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 4,
    category: "world",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    //   this runs #1st
    super(props);
    this.state = {
      results: [],
      loading: true,
      page: 0,
      totalResults: 0,
    };
    document.title = `NewsMonk | ${this.capitalizeFirstLetter(props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let url = `https://newsdata.io/api/1/news?apikey=${this.props.apiKey}&category=${this.props.category}${this.props.country === ''? '' : '&country='+this.props.country}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(80);
    this.setState({
      // results: parsedData.results,
      results: this.state.results.concat(parsedData.results),
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    //   this runs after render #3rd
    this.updateNews();
  }

  // handleNextClick = async () => {
  //   // console.log("next");
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  // handlePrevClick = async () => {
  //   // console.log("prev");
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsdata.io/api/1/news?&apikey=${this.props.apiKey}&category=${this.props.category}${this.props.country === ''? '' : '&country='+this.props.country}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      // results: parsedData.results,
      results: this.state.results.concat(parsedData.results),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    //   this runs after constructor #2nd
    return (
      <>
        <h2 className="text-center text-secondary mb-2" style={{ marginTop: "90px" }}>
          Headlines - {this.capitalizeFirstLetter(this.props.category)}
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.results.length}
          next={this.fetchMoreData}
          hasMore={this.state.results.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* {!this.state.loading && */}
              {this.state.results?.map((element) => {
                return (
                  <div className="col-md-4 col-lg-3" key={element.link}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imgUrl={element.image_url}
                      newsUrl={element.link}
                      source={element.source_id}
                      date={element.pubDate}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        <p className="text-muted text-center">
          {this.state.results.length === this.state.totalResults
            ? "End of Content"
            : ""}
        </p>

        {/* Prev-Next buttons */}
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark m-1"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark m-1"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
