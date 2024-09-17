import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {

    let { title, description, url, urlLink, author, date, source } = this.props;

    return (
      <>
        <div className="container mt-4">
            <div className="card">
                {/* <img src={url} alt="Not Found" className='card-mg-top'/> */}
                <div className="card-body">
                    <span 
                        className="badge rounded-pil bg-success bg-gradient text-light" 
                        style={{display:"flex", justifyContent: "flex-end", position: "absolute", right: '0px', top: "0px"}}
                    >
                        {source}
                    </span>
                    <h5 className='card-title text-success'>{title.split("",50)}...</h5>
                    <p className="card-text">{description ? description.split("",200) : "No description"} ...</p>
                    <p>By : {author?author:"Anonymous"}</p>
                    <hr/>
                    <p>Published on : { new Date(date).toLocaleDateString()} | {" "} {new Date(date).toDateString()}</p>
                    <a href={urlLink} className='btn btn-primary btn-gradient'>Read More</a>
                </div>
            </div>
        </div>
      </>
    )
  }
}
