import React from 'react'


const NewsItem = (props) => {
    const handleClick = () => {
        console.log('Read More clicked');
        // Add any other logic or debugging statements here
    };

    let { title, description, imageUrl, url, date, author, src } = props
    return (
        <div className='my-3'>

            <div className="card" >
                <div style={{ display: 'flex', position: 'absolute', justifyContent: 'flex-end', right: 0 }}>
                    <span className=" badge rounded-pill bg-danger" >
                        {src}

                    </span>
                </div>
                <img src={!imageUrl ? "https://image.cnbcfm.com/api/v1/image/107259512-1687283761390-NYSE_Traders-OB-20230620-CC-PRESS-11.jpg?v=1687369270&w=1920&h=1080" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small style={{ color: 'Tomato' }}>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={url} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-dark" onClick={handleClick}>Read More</a>

                </div>
            </div >
        </div >
    )

}

export default NewsItem