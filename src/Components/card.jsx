import React from 'react';

const Card = ({ data }) => {
    const readMore = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className='cardContainer'>
            {data
                .filter(item => item.title && item.description) // Skip incomplete data
                .map((curItem) => (
                    <div className='card' key={curItem.url}>
                        <img
                            src={curItem.urlToImage || "https://via.placeholder.com/300x200?text=No+Image"}
                            alt="news"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300x200?text=Image+Unavailable";
                            }}
                        />
                        <div className='cardContent'>
                            <h3
                                className='title'
                                onClick={() => readMore(curItem.url)}
                                style={{ cursor: "pointer" }}
                            >
                                {curItem.title}
                            </h3>
                            <p>{curItem.description}</p>
                            <button onClick={() => readMore(curItem.url)}>Read More</button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Card;
