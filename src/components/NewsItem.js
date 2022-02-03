import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, source, date } = this.props;
    return (
      <div className="my-3">
        <div className="bg-dark text-white card">
          <div className="d-flex justify-content-end position-absolute top-0 start-0">
            <span className="badge bg-danger p-2">{source}</span>
          </div>
          <img src={imgUrl?imgUrl : "https://archive.org/download/no-photo-available/no-photo-available.png"} className="card-img-top" alt="news-head" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text text-light">{description}</p>
            <p className="card-text mb-2"><small className="text-muted">{new Date(date).toUTCString()}</small></p>
            {/* <p className="card-text my-2">By {source} on {new Date(date).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})}</p> */}
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-outline-danger btn-sm text-white"
              rel="noreferrer"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
