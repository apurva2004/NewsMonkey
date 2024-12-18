//import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react'

export class NewsItems extends Component {



    render() {
        let { source, title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className=' my-3'>
                <div className="card"  >
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: 1 }}>{source}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: '0'
                        }
                        }>

                            <span className="badge rounded-pill bg-danger"> {source} </span>
                        </div>
                    </span>
                    <img src={!imageUrl ? "https://bitcoinist.com/wp-content/uploads/2024/07/Screenshot_316.jpg" : imageUrl}
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
