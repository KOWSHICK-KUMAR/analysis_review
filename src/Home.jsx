import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-pink-500 p-5">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg text-center transform transition duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4 flex items-center justify-center space-x-2">
                    <span>🔍📊</span> 
                    <span>Review & Analysis</span> 
                    <span>💡📈</span>
                </h1>
                <p className="text-gray-600 mb-6 text-lg">
                    AI-powered insights for sentiment analysis and data review.
                </p>
                
                <div className="flex flex-col space-y-4">
                    <Link to="/sentiment-analysis">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition w-full shadow-md flex items-center justify-center space-x-2">
                            <span>🧠</span>
                            <span>Sentiment Analysis</span>
                        </button>
                    </Link>
                    <Link to="/upload">
                        <button className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition w-full shadow-md flex items-center justify-center space-x-2">
                            <span>📂</span>
                            <span>Upload JSON</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
