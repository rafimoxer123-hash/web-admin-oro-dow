export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard Analitik</h1>
                    <p className="text-sm text-gray-500">Ringkasan aktivitas transaksi Pasar Oro-Oro Dowo</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-semibold">
                    Role: Admin
                </span>
            </div>

            {/* Ringkasan Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Total Transaksi</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-2">Rp 125.000</h3>
                    <p className="text-xs text-emerald-600 mt-1">↑ +12% hari ini</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Warung Aktif</p>
                    <h3 className="text-2xl font-bold text-emerald-700 mt-2">40 Warung</h3>
                    <p className="text-xs text-gray-400 mt-1">Siap melayani pesanan</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Pesanan Diproses</p>
                    <h3 className="text-2xl font-bold text-amber-600 mt-2">18 Pesanan</h3>
                    <p className="text-xs text-gray-400 mt-1">Dalam proses pengiriman</p>
                </div>
            </div>
        </div>
    );
}