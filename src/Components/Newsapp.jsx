import React, { useEffect, useState } from 'react';
import Card from './card';

const Newsapp = () => {
    const [input, setInput] = useState("");       // input field
    const [search, setSearch] = useState("India"); // actual topic to fetch
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_KEY = "8d347171e98544fe9d040c33b75f2adc";

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
            const jsonData = await response.json();
            setNewsData(jsonData.articles);
        } catch (error) {
            console.error("Error fetching data:", error);
            setNewsData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [search]); // fetches only when 'search' changes

    const handleInput = (e) => {
        setInput(e.target.value); // input field updates
    };

    const handleSearch = () => {
        if (input.trim()) {
            setSearch(input); // trigger fetch with input
        }
    };

    const userInput = (e) => {
        const topic = e.target.value;
        setSearch(topic); // changes topic immediately
        setInput(topic);  // update input box to match
    };

    return (
        <div>
            {/* Navigation */}
            <nav>
                <div>
                    <h1>Trendy News</h1>
                </div>
                <ul>
                    <a href="#">All News</a>
                    <a href="#">Trending</a>
                </ul>
                <div className='searchbar'>
                    <input
                        type='text'
                        placeholder='Search Text'
                        value={input}
                        onChange={handleInput}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </nav>

            {/* Category Buttons */}
            <div className='categoryBtn'>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>

            {/* News Display */}
            <div>
                {loading ? (
                    <p>Loading news...</p>
                ) : newsData && newsData.length > 0 ? (
                    <Card data={newsData} />
                ) : (
                    <p>No news available.</p>
                )}
            </div>
        </div>
    );
};

export default Newsapp;
