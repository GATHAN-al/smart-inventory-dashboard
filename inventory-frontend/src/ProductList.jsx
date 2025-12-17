import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    
    // Helper untuk mengambil token
    const getConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    // --- PERBAIKAN: Definisikan fungsi ini DULU ---
const fetchProducts = useCallback(async () => {        try {
            // Pastikan URL API benar
            const res = await axios.get('http://localhost:8000/api/products', getConfig());
            setProducts(res.data);
        } catch (err) {
            console.error("Gagal mengambil data:", err);
        }
}, []); // Array kosong berarti fungsi ini tidak akan berubah-ubah
    // --- BARU panggil di sini ---
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts ();
    }, [fetchProducts]);

    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/products/${id}`, getConfig());
            fetchProducts(); // Refresh list setelah hapus
        } catch (err) {
            console.error("Gagal menghapus:", err);
            alert("Gagal menghapus produk");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manajemen Produk</h1>
<Link to="/products/create" className="bg-indigo-600 text-white px-4 py-2 rounded">
    Tambah Produk
</Link>            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stok</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">Rp {product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    Tidak ada data produk.
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