import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DataMerchant from './pages/DataMerchant';
import CustomerApp from './pages/CustomerApp';

// Layout khusus Admin (menampilkan Sidebar & Header)
function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet /> {/* Konten halaman admin akan muncul di sini */}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Jalur Utama: Tampilan Mobile Pelanggan */}
        <Route path="/" element={<CustomerApp />} />

        {/* 2. Jalur Khusus: Dashboard Web Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="merchant" element={<DataMerchant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}