import NewsComponentItem from "./NewsComponentItem";
import React from "react";
import PropTypes from "prop-types"
import { Spinner } from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect} from "react";

export function NewsComponent(props) {

    const apiKey = process.env.REACT_APP_API_KEY
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        updatePage(page);
    },
        []
    );


    // constructor() {
    //     super();
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1,
    //         pageSize: 20,
    //         totalResults: 0
    //     };

    // }

    const fetchMoreData = async () => {

        setLoading(true);
        // this.setState({
        //     loading: true,
        // });

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page + 1}&pagesize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles));
        setPage(page + 1);
        setLoading(false);
        
        // this.setState({
            //     articles: this.state.articles.concat(parsedData.articles),
            //     // articles: parsedData.articles,
            //     page: this.state.page + 1,
            //     loading: false
            // })
        }
        
        async function updatePage(pageNo) {
            props.progress(10);
            setLoading(true);
        // this.setState({
        //     loading: true
        // });

        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d87cc71688e4deeb837e82bf5a1453d&page=${this.state.page}&pagesize=${this.state.pageSize}`;

        try {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${pageNo}&pagesize=${pageSize}`;

            // console.log("Fetching initiated")            // ---------
            let data = await fetch(url);
            if (!data.ok) {
                throw new Error("Bad network");
            }
            props.progress(30);
            // console.log("URL Fetched")                      // ---------
            let parsedData = await data.json();
            props.progress(50);
            // console.log("JSON Converted")                // ---------
            // console.log("Page No: " + this.state.page);  // --------
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            console.log(parsedData);                     // ---------
            setLoading(false);

            // this.setState({
            //     articles: parsedData.articles,
            //     totalResults: parsedData.totalResults,
            //     loading: false
            // });
            props.progress(100);
            // console.log("State Updated")                 // ---------
        }
        catch (error) {
            console.log(`Fucking error occured: ${error.message}`)
        }
    }



    // async function componentDidMount() {
    //     //     this.setState({
    //     //         loading: true
    //     // });
    //     updatePage(page);
    //     console.log("Component Mounted")                //This executes first


    


    const handleNextClick = async () => {
        // if (!(Math.ceil(this.state.totalResults / 20) < this.state.page + 1)){
        //     this.setState({
        //             loading: true
        //     });
        // console.log("Before next updation")          // ---------
        updatePage(page + 1);
        // console.log("After next updation")           // ---------
        setPage(page + 1);

        // this.setState({
        //     page: this.state.page + 1
        // });
        // console.log("State Changed for Next")        // ---------
        // console.log("Page No: " + this.state.page);  

        // this.updatePage(this.state.page+1);
        // console.log("URL: " + url);  

        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d87cc71688e4deeb837e82bf5a1453d&page=${this.state.page+1}&pagesize=${this.state.pageSize}`;
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        //     this.setState({
        //         page: this.state.page+1,
        //         articles: parsedData.articles,
        //         loading: false
        //     });
    }



    const handlePrevClick = async () => {
        // this.setState({
        //         loading: true
        // });

        updatePage(page - 1);
        setPage(page - 1);
        // this.setState({
        //     page: this.state.page - 1
        // });


        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d87cc71688e4deeb837e82bf5a1453d&page=${this.state.page-1}&pagesize=${this.state.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page-1,
        //     articles: parsedData.articles,
        //     loading: false
        // });
    }


        return (
            <div className="container my-3">
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={(page * pageSize < 100) && (page * pageSize < totalResults)}
                    loader={<Spinner />}
                    endMessage={<h1 style={{ textAlign: "center", backgroundColor: "blue", color: "white" }}>Thats all the fucking news we have!!!</h1>}
                >

                    <h1 className="text-center">Top Fucking {props.category.replace(props.category[0], props.category[0].toUpperCase())} USA Headlines</h1>
                    {loading && <Spinner />}
                    {/* <div className="container" > */}
                    <div className="row">
                        {articles.map((element) => {
                            if (element.title && element.url && element.urlToImage && element.title !== "[Removed]" && element.url !== "https://removed.com") {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsComponentItem title={element.title} description={element.description} imgURL={element.urlToImage} redirection={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            }
                            else{
                                return null;
                            }
                        })}
                    </div>

                    {/* <div className="container d-flex justify-content-between my-5">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary" onClick={this.handlePrevClick}>Previous</button>
                        <button disabled={(Math.ceil(this.state.totalResults) / 20 < this.state.page + 1) || this.state.page >= 5} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next</button>
                    </div> */}
                    {/* </div> */}
                </InfiniteScroll>
            </div>

        );
    }


NewsComponent.defaultProps = {
    pageSize: 20,
    country: "us",
}

NewsComponent.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}


