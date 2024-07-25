

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

export default function Apipart(props) {
    const { country, pageSize, category } = props;
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);

    const fetchAll = (page) => {
        fetch(`https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=24d7791113b9476580866b9af4ff22b5&page=${page}&pageSize=${pageSize}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPost(data.articles);
                setTotalResult(data.totalResults);
            });
    };
    useEffect(() => {
        fetchAll(page);
    }, [page]);

    const previousClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const nextClick = () => {
        if (page + 1 <= Math.ceil(totalResult / pageSize)) {
            setPage(page + 1);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    {post.map((post, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card" style={{ width: '18rem' }}>
                                <img src={!post.urlToImage ? "https://www.reuters.com/resizer/rZ2G6-2Xt4sg9uIJjqp8C1waFmU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/NOUV44KPN5JF5O3JYK6NYRMWH4.jpg":post.urlToImage} className="card-img-top" alt={post.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{post.title ? post.title.slice(0, 45): ""}</h5>
                                  <p className="card-text">{post.description ? post.description.slice(0, 88) : ""}</p>
                                    <a href={post.url} className="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} onClick={previousClick} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResult / pageSize)} onClick={nextClick} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        </div>
    );
}

Apipart.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
};

Apipart.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
};
