import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        total_products: 0,
        total_value: 0,
        low_stock: 0,
        chart: { labels: [], data: [] }
    });

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard-stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(response.data);
            } catch (error) {
                console.error("Gagal mengambil data dashboard", error);
            }
        };

        fetchStats();
    }, []);

    // Konfigurasi Data Chart
    const chartData = {
        labels: stats.chart.labels, // Label dari Backend (Electronics, Furniture, dll)
        datasets: [
            {
                label: 'Jumlah Produk',
                data: stats.chart.data, // Data dari Backend (5, 3, 2, dll)
                backgroundColor: 'rgba(79, 70, 229, 0.8)', // Warna Ungu Indigo
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Statistik Stok per Kategori',
            },
        },
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
            
            {/* Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-medium">Total Produk</h3>
                    <p className="text-3xl font-bold text-gray-800">{stats.total_products}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium">Nilai Aset</h3>
                    <p className="text-3xl font-bold text-gray-800">
                        Rp {parseInt(stats.total_value).toLocaleString('id-ID')}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <h3 className="text-gray-500 text-sm font-medium">Stok Menipis</h3>
                    <p className="text-3xl font-bold text-red-600">{stats.low_stock}</p>
                </div>
            </div>

            {/* Grafik Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-80 w-full">
                    {stats.chart.labels.length > 0 ? (
                        <Bar options={chartOptions} data={chartData} />
                    ) : (
                        <p className="text-center text-gray-500 mt-20">Sedang memuat data grafik...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;