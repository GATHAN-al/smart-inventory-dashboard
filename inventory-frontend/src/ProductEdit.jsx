import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEdit = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();
    
    // State untuk form
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');

    // Ambil data produk saat halaman dibuka
    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const product = response.data.data; // Sesuaikan dengan format JSON dari API
                
                // Isi form dengan data lama
                setName(product.name);
                setCategory(product.category);
                setPrice(product.price);
                setStock(product.stock);
                setDescription(product.description);
            } catch (error) {
                console.error("Gagal mengambil data", error);
                alert("Produk tidak ditemukan!");
                navigate('/products');
            }
        };

        fetchProduct();
    }, [id, navigate]);

    // Fungsi Update Data
    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            await axios.put(`http://localhost:8001/api/products/${id}`, {
                name,
                category,
                price,
                stock,
                description
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Jika sukses, kembali ke list
            alert("Produk berhasil diperbarui!");
            navigate('/products');
        } catch (error) {
            console.error("Gagal update", error);
            alert("Gagal mengupdate produk.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>
            <div className="bg-white shadow rounded-lg p-6 max-w-xl">
                <form onSubmit={handleUpdate} className="space-y-4">
                    
                    {/* Nama Produk */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Nama Produk</label>
                        <input 
                            type="text" 
                            className="w-full border p-2 rounded" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Kategori */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Kategori</label>
                        <select 
                            className="w-full border p-2 rounded"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Books">Books</option>
                        </select>
                    </div>

                    {/* Harga & Stok */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Harga (Rp)</label>
                            <input 
                                type="number" 
                                className="w-full border p-2 rounded" 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Stok</label>
                            <input 
                                type="number" 
                                className="w-full border p-2 rounded" 
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Deskripsi</label>
                        <textarea 
                            className="w-full border p-2 rounded" 
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Update Produk
                        </button>
                        <button type="button" onClick={() => navigate('/products')} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;