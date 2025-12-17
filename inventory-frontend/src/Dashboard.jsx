import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({ total_products: 0, total_value: 0, low_stock: 0, chart_data: [] });

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8000/api/dashboard-stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data);
        };
        fetchStats();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Ringkasan Inventaris</h1>
            
            {/* Kartu KPI (Key Performance Indicators) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-gray-500">Total Produk</h3>
                    <p className="text-3xl font-bold">{stats.total_products}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-gray-500">Nilai Aset</h3>
                    <p className="text-3xl font-bold">Rp {stats.total_value}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
                    <h3 className="text-gray-500">Stok Menipis</h3>
                    <p className="text-3xl font-bold text-red-600">{stats.low_stock}</p>
                </div>
            </div>

            {/* Grafik Recharts */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Level Stok per Kategori</h2>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.chart_data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total_stock" fill="#3b82f6" name="Total Stok" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;