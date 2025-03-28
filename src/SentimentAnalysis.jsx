import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SentimentAnalysis() {
    const [review, setReview] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const analyzeSentiment = async () => {
        if (!review.trim()) {
            setError("❌ Please enter a review.");
            return;
        }
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:5000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: review }),
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRefresh = () => {
        setReview("");
        setResult(null);
        setError("");
    };

    return (
        <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-indigo-500 to-pink-500 flex flex-col items-center justify-center p-5">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl transform transition duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-800 flex items-center justify-center space-x-2">
                    <span>🔍📊</span>
                    <span>Sentiment Analysis</span>
                    <span>💡📝</span>
                </h2>

                <textarea
                    rows="4"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="💬 Enter your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>

                {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={analyzeSentiment}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                    >
                        <span>🔍</span>
                        <span>Analyze Sentiment</span>
                    </button>

                    <button
                        onClick={handleRefresh}
                        className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition flex items-center space-x-2"
                    >
                        <span>🔄</span>
                        <span>Refresh</span>
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition flex items-center space-x-2"
                    >
                        <span>⬅️</span>
                        <span>Back</span>
                    </button>
                </div>

                {result && (
                    <div className="mt-6 bg-gray-50 p-5 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">📊 Analysis Results:</h3>
                        <p><strong>🤖 Hugging Face:</strong> {result.huggingface.label} ({(result.huggingface.score * 100).toFixed(2)}%)</p>
                        <p><strong>📝 VADER:</strong>
                            ✅ Positive: {(result.vader.pos * 100).toFixed(2)}%,
                            ⚖️ Neutral: {(result.vader.neu * 100).toFixed(2)}%,
                            ❌ Negative: {(result.vader.neg * 100).toFixed(2)}%</p>
                        <p><strong>📡 RoBERTa:</strong>
                            ✅ Positive: {(result.roberta.roberta_pos * 100).toFixed(2)}%,
                            ⚖️ Neutral: {(result.roberta.roberta_neu * 100).toFixed(2)}%,
                            ❌ Negative: {(result.roberta.roberta_neg * 100).toFixed(2)}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SentimentAnalysis;
