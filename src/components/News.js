import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {

    props.setProgress(10);
    
    const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&category=${
      props.category
    }${props.country === "" ? "" : "&country=" + props.country}&page=${page}&language=en`;

    setLoading(true);

    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(80);
    // setResults(results.concat(parsedData.results));
    setResults(parsedData.results);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsMonk | ${capitalizeFirstLetter(props.category)}`;
    updateNews();

  }, [props.country]);

  const fetchMoreData = async () => {

    const url = `https://newsdata.io/api/1/news?&apikey=${
      props.apiKey
    }&category=${props.category}${
      props.country === "" ? "" : "&country=" + props.country
    }&page=${page + 1}&language=en`;

    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setResults(results.concat(parsedData.results));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h2
        className="text-center text-secondary mb-2"
        style={{ marginTop: "90px" }}
      >
        Headlines { props.country === '' ? '' : '('+props.country + ') -'} {capitalizeFirstLetter(props.category)}
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={results.length}
        next={fetchMoreData}
        hasMore={results.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {/* {!this.state.loading && */}
            {results.map((element) => {
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
        {results.length === totalResults ? "End of Content" : ""}
      </p>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 4,
  category: "world",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
