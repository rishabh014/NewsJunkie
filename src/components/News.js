import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        props.setProgress && props.setProgress(10);

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true);
        let data = await fetch(url);
        props.setProgress && props.setProgress(50);

        let parsedData = await data.json();
        console.log(parsedData);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress && props.setProgress(90);
    };

    useEffect(() => {
        updateNews();
    }, []);

    // const handlePrev = () => {
    //     setPage((prevPage) => prevPage - 1);
    // };

    // const handleNext = () => {
    //     setPage((prevPage) => prevPage + 1);
    // };

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            <h1 className='text-center' style={{ margin: '65px' }}>NewsJunkie - Top Headlines </h1>

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container" style={{ backgroundColor: 'coral' }}>
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 45) : ""}
                                    description={element.description ? element.description.slice(0, 85) : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    date={element.publishedAt}
                                    author={element.author}
                                    src={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: "in",
    // pageSize: 8,
    category: "general"
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

export default News;
