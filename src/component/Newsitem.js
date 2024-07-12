import React, { Component } from 'react'

export class Newsitem extends Component {

    render() {
        let { title, discription,imgurl,url} = this.props;

        return (
                <div className="card" style={{width: "18rem"}}>
            <img src={!imgurl ? "https://www.reuters.com/resizer/rZ2G6-2Xt4sg9uIJjqp8C1waFmU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/NOUV44KPN5JF5O3JYK6NYRMWH4.jpg": imgurl} className="card-img-top" alt="..."/>
  <div className="card-body">
            <h5 className="card-title">{ title}</h5>
  <p className="card-text">{ discription}</p>
    <a href={url} target="_blank" className="btn btn-dark">read more</a>
  </div>
</div>         
    )
  }
}
export default Newsitem