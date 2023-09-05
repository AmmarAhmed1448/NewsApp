import { Component } from "react";
import NewsComponentItem from "./NewsComponentItem";
import PropTypes from "prop-types"
import { Spinner } from "./Spinner";

export class NewsComponent extends Component{
    static defaultProps = {
        pageSize: 20,
        country: "us",
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }


    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            pageSize: 20,
            totalResults: 0
        };
    }

    
    async componentDidMount(){
        this.setState(
            {
                loading: true
            }
        )
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d87cc71688e4deeb837e82bf5a1453d&pagesize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState(
            {
                articles: parsedData.articles, 
                totalResults: parsedData.totalResults,
                loading: false
            }
        );
    }

    handleNextClick = async () => {
        if (!(Math.ceil(this.state.totalResults / 20) < this.state.page + 1)){
            this.setState(
                {
                    loading: true
                }
            )
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d87cc71688e4deeb837e82bf5a1453d&page=${this.state.page+1}&pagesize=${this.state.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading: false
            });
            console.log("Page No: " + this.state.page);  
        }
        
    }

    handlePrevClick = async () => {
        this.setState(
            {
                loading: true
            }
        )

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d87cc71688e4deeb837e82bf5a1453d&page=${this.state.page-1}&pagesize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading: false
        });
    }

    render(){
        return(
            <div className="container my-3">
                <h1 className="text-center">Top Fucking {this.props.category.replace(this.props.category[0], this.props.category[0].toUpperCase())} Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="container">
                    <div className="row">
                        {!this.state.loading && (this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                            <NewsComponentItem title={element.title} description={element.description} imgURL={element.urlToImage} redirection={element.url} author={element.author} date = {element.publishedAt} source = {element.source.name}/>
                                    </div>
                        }))}
                </div>

                <div className="container d-flex justify-content-between my-5">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary" onClick={this.handlePrevClick}>Previous</button>
                <button disabled={(Math.ceil(this.state.totalResults) / 20 < this.state.page+1) || this.state.page >= 5} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next</button>
                </div>
                </div>
            </div>
        );
    }
}