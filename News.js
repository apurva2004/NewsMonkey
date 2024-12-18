import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


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

    constructor(props) {
        super(props);
        this.state = {
            articles: [], // Ensure articles is always an array
            loading: true,
            page: 1,
            totalResults: 0

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=988a0d217ca24626ad8932bb6a1de5d9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        //let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=988a0d217ca24626ad8932bb6a1de5d9&page=1&pageSize=${this.props.pageSize}`;
        //this.setState({ loading: true });
        //let data = await fetch(url);
        //let parsedData = await data.json();
        //console.log(parsedData);
        //this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.updateNews();

    }
    handelprevclick = async () => {
        //let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=988a0d217ca24626ad8932bb6a1de5d9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        //let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page - 1,
        //   //  articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();

    }
    handelnextclick = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=988a0d217ca24626ad8932bb6a1de5d9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //

        //     })

        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews()

    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=988a0d217ca24626ad8932bb6a1de5d9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
           
        });


    };



    render() {
        return (
           <>
                <h2 className="text-center" style={{ margin: '30px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines  </h2>
                {this.state.loading && <Loading />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loading />}
                >

                    <div className='container'>

                        <div className="row">


                            {
                               this.state.articles.map((element) => {
                                return    <div className="col-md-4" key={element.url}>
                                        <NewsItems
                                            title={element.title ? element.title.slice(0, 40) : ""}
                                            description={element.description ? element.description.slice(0, 88) : ""}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                           // source={element.source.name}
                                        />

                                    </div>


})}</div>
                    </div>
                </InfiniteScroll>

            </>



        );
    }

}

export default News
