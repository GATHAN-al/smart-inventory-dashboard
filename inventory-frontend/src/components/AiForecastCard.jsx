import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AiForecastCard = () => {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Tembak ke Laravel (Port 8001)
        axios.get('http://127.0.0.1:8001/api/predict-stock')
            .then(response => {
                setPrediction(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Gagal ngambil ramalan:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="p-6 bg-white rounded-xl shadow-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-full"></div>
        </div>
    );

    if (!prediction) return null;

    const { trend, recommended_restock, note } = prediction.ai_analysis;
    const isTrendingUp = trend === 'increasing';

    return (
        <div className="relative overflow-hidden p-6 bg-white rounded-xl shadow-xl border border-indigo-100">
            {/* Background Hiasan Biar Techy */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full opacity-50 blur-xl"></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                            AI Stock Prediction
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">Powered by Python & Scikit-Learn</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${isTrendingUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isTrendingUp ? '📈 TREND NAIK' : '📉 TREND TURUN'}
                    </span>
                </div>

                <div className="flex items-end gap-3 mb-2">
                    <h1 className="text-5xl font-extrabold text-indigo-600">
                        {recommended_restock}
                    </h1>
                    <span className="text-gray-600 font-medium mb-2">Unit</span>
                </div>
                
                <p className="text-sm text-gray-600 font-medium">
                    Rekomendasi Restock Minggu Ini
                </p>

                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <p className="text-xs text-indigo-800 italic">
                        "🤖 {note}"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AiForecastCard;