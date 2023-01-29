import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    // this is how we going to do props in our class based compenents and we have to do in this exact the same way
    const { title, description, imageUrl, newsUrl, author, date , source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
                {source} 
              </span>
          <img
            src={
              !imageUrl
                ?"https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              
            </h5>
            <p className="card-text">{description}</p>
            <small className="text-muted">
              {author ? "unknown" : author} on {new Date(date).toGMTString()}
            </small>
            <a href={newsUrl}  target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Click To Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
