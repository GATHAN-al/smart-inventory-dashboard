import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'; // Tambahkan Link di sini
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import ProductList from './ProductList';
import ProductCreate from './ProductCreate';

// Komponen Layout Sederhana untuk Navigasi (Sidebar/Navbar)
const Layout = ({ children }) => {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Sederhana */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-indigo-600">Smart Inventory</h2>
        </div>
        <nav className="mt-6">
          {/* Ganti <a> menjadi <Link> agar tidak reload halaman */}
          <Link 
            to="/dashboard" 
            className={`block py-2.5 px-4 ${location.pathname === '/dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/products" 
            className={`block py-2.5 px-4 ${location.pathname.includes('/products') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Products
          </Link>
          <button onClick={handleLogout} className="w-full text-left block py-2.5 px-4 text-red-600 hover:bg-red-50">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

// Komponen untuk Cek apakah User sudah Login (Protected Route)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Routes>
      {/* Route Public */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Redirect root ke login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Route Protected (Harus Login) */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* --- INI YANG TADI HILANG (DAFTAR PRODUK) --- */}
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        } 
      />

      {/* Route Create Product */}
      <Route 
        path="/products/create" 
        element={
          <ProtectedRoute>
            <ProductCreate />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;