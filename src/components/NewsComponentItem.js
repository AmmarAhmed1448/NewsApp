import { Component } from "react";

export class NewsComponentItem extends Component{
    render(){
        let {title, description, imgURL, redirection, author, date, source} = this.props;
        return(
            <div className="container my-3">
                <div className="card" >
                <img className="card-img-top" src={imgURL} alt="card" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toDateString()}</small></p>
                    <p className="card-text"><small className="text-muted">Source: {source}</small></p>
                    <a href={redirection} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read more</a>
                </div>
            </div>
            </div>
        );
    }
}

export default NewsComponentItem;