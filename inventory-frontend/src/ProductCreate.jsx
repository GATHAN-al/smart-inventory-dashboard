import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            await axios.post('http://localhost:8000/api/products', {
                name,
                category,
                price,
                stock,
                description
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Jika sukses, kembali ke halaman list produk
            navigate('/products');
        } catch (error) {
            console.error(error);
            alert("Gagal menyimpan produk.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>
            <div className="bg-white shadow rounded-lg p-6 max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    
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

                    {/* Harga & Stok (Grid) */}
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

                    {/* Tombol Simpan */}
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full">
                        Simpan Produk
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductCreate;