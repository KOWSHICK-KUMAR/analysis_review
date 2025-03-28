import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SentimentAnalysis from "./SentimentAnalysis";
import Home from "./Home";
import UploadJson from "./UploadJson";

function App() {
    return (
        <Router>
           
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
                    <Route path="/upload" element={<UploadJson />} />
                </Routes>
           
        </Router>
    );
}

export default App;
