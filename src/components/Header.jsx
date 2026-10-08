import { Bell, Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-64">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Cari transaksi..."
                    className="bg-transparent border-none outline-none text-sm w-full"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-emerald-700 relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">Albar</p>
                        <p className="text-xs text-emerald-600 font-semibold">Admin / Manajer</p>
                    </div>
                    <div className="w-9 h-9 bg-emerald-800 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}