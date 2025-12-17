import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert('Login gagal. Periksa email dan password.');
        }
    };

    return (
        // Container Utama: min-h-screen memastikan tinggi minimal setinggi layar
        // flex items-center justify-center bertugas menengahkan kotak putih
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            
            {/* Kartu Login */}
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Selamat Datang</h2>
                    <p className="text-gray-500 text-sm mt-2">Silakan masuk ke akun inventaris Anda</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="admin@example.com" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="********" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200">
                        Masuk
                    </button>
                </form>
                
                {/* Opsional: Link Register dummy */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Belum punya akun? <span className="text-blue-600 cursor-pointer hover:underline">Hubungi Admin</span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;