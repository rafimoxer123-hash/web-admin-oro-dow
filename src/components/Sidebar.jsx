import { Link } from 'react-router-dom';
import { LayoutDashboard, Store } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-emerald-900 text-white flex flex-col">
            <div className="p-6">
                <h2 className="text-xl font-bold tracking-wider">ORO-ORO DOWO</h2>
                <p className="text-xs text-emerald-300 mt-1">Admin Dashboard</p>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {/* Pastikan link mengarah ke /admin karena kita menggunakan nested route di App.jsx */}
                <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition">
                    <LayoutDashboard size={20} />
                    <span className="font-medium text-sm">Analitik</span>
                </Link>
                <Link to="/admin/merchant" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-800 transition">
                    <Store size={20} />
                    <span className="font-medium text-sm">Data Merchant</span>
                </Link>
            </nav>
        </aside>
    );
}