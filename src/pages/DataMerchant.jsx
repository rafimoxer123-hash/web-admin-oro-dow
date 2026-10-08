export default function DataMerchant() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Kelola Data Merchant</h1>
            <p className="text-sm text-gray-500 mb-6">Daftar warung dan menu kuliner Pasar Oro-Oro Dowo.</p>

            {/* Tempat tabel data merchant yang nanti diambil via API */}
            <div className="p-10 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400">
                Belum ada data merchant.
            </div>
        </div>
    );
}