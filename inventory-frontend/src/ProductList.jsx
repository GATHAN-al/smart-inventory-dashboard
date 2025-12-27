import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    
    // Helper untuk mengambil token
    const getConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    // Ambil data produk dari API
    const fetchProducts = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:8001/api/products', getConfig());
            setProducts(res.data.data ? res.data.data : res.data); // Handle jika response dibungkus "data"
        } catch (err) {
            console.error("Gagal mengambil data:", err);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();
    }, [fetchProducts]);

    // Fungsi Hapus
    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/products/${id}`, getConfig());
            fetchProducts(); // Refresh list setelah hapus
            alert("Produk berhasil dihapus");
        } catch (err) {
            console.error("Gagal menghapus:", err);
            alert("Gagal menghapus produk");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Produk</h1>
                <Link to="/products/create" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md">
                    + Tambah Produk
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Harga</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stok</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">Rp {parseInt(product.price).toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{product.stock}</td>
                                    
                                    {/* KOLOM AKSI (EDIT & DELETE) */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex justify-center items-center space-x-3">
                                            
                                            {/* Tombol Edit (Link ke halaman Edit) */}
                                            <Link 
                                                to={`/products/edit/${product.id}`} 
                                                className="text-yellow-500 hover:text-yellow-700 transform hover:scale-110 transition duration-200"
                                                title="Edit"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </Link>

                                            {/* Tombol Hapus */}
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:text-red-700 transform hover:scale-110 transition duration-200"
                                                title="Hapus"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    Belum ada data produk.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;