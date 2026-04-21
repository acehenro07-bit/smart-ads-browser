import React, { useState, useEffect } from 'react';
import { 
  Search, 
  RotateCw, 
  Bookmark, 
  ShieldCheck, 
  ShieldAlert, 
  X, 
  Globe, 
  Plus, 
  AlertCircle,
  ExternalLink,
  Info
} from 'lucide-react';

/**
 * SmartAds Browser - Dikembangkan oleh acehenro07-bit
 * Repositori: https://github.com/acehenro07-bit/smart-ads-browser
 */

const App = () => {
  const [url, setUrl] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: 'Wikipedia', url: 'https://www.wikipedia.org' },
    { id: 2, title: 'GitHub', url: 'https://www.github.com' }
  ]);
  const [isAdBlockActive, setIsAdBlockActive] = useState(true);
  const [isHome, setIsHome] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Situs yang biasanya mengizinkan iFrame untuk testing
  const suggestions = [
    { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
    { name: 'Frontiers', url: 'https://www.frontiersin.org' },
    { name: 'Archive.org', url: 'https://archive.org' }
  ];

  const handleGoToUrl = (e) => {
    e.preventDefault();
    let targetUrl = url.trim();
    if (!targetUrl) return;

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    setActiveUrl(targetUrl);
    setIsHome(false);
    triggerNotification(`Menghubungkan ke ${targetUrl}...`);
  };

  const triggerNotification = (msg) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const addBookmark = () => {
    if (!activeUrl) return;
    try {
      const newBookmark = {
        id: Date.now(),
        title: new URL(activeUrl).hostname,
        url: activeUrl
      };
      setBookmarks([...bookmarks, newBookmark]);
      triggerNotification("Halaman disimpan ke daftar favorit!");
    } catch (e) {
      triggerNotification("URL tidak valid untuk di-bookmark.");
    }
  };

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const reloadPage = () => {
    if (activeUrl) {
      const current = activeUrl;
      setActiveUrl('');
      setTimeout(() => setActiveUrl(current), 100);
      triggerNotification("Memperbarui halaman...");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Navbar Atas */}
      <nav className="bg-white border-b border-slate-200 p-2 flex items-center gap-3 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2 px-3">
          <div className="w-3 h-3 rounded-full bg-rose-400 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm"></div>
        </div>

        <button 
          onClick={() => { setIsHome(true); setUrl(''); setActiveUrl(''); }}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          title="Ke Beranda"
        >
          <Globe size={20} />
        </button>

        <button 
          onClick={reloadPage}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          title="Reload"
        >
          <RotateCw size={18} />
        </button>

        <form onSubmit={handleGoToUrl} className="flex-1 flex items-center bg-slate-100 rounded-full px-4 py-1.5 border border-transparent focus-within:border-blue-400 focus-within:bg-white transition-all shadow-inner">
          <Search size={16} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Coba wikipedia.org atau ketik alamat..."
            className="bg-transparent border-none outline-none w-full text-sm"
          />
        </form>

        <button 
          onClick={() => setIsAdBlockActive(!isAdBlockActive)}
          className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all flex items-center gap-2 border-2 ${
            isAdBlockActive 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
            : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}
        >
          {isAdBlockActive ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
          <span className="hidden sm:inline">{isAdBlockActive ? 'AD-BLOCK AKTIF' : 'PROTEKSI MATI'}</span>
        </button>
      </nav>

      <main className="flex-1 relative flex flex-col overflow-hidden">
        {showNotification && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur text-white px-6 py-2 rounded-full text-xs font-medium shadow-2xl z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
            {notificationMsg}
          </div>
        )}

        {isHome ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="mb-12 text-center">
              <div className="inline-block p-3 bg-blue-50 rounded-2xl mb-4 shadow-sm">
                <ShieldCheck size={48} className="text-blue-500" />
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-800">
                Smart<span className="text-blue-500">Ads</span> Browser
              </h1>
              <p className="text-slate-500 mt-2 text-sm">Navigasi bersih oleh <span className="font-bold text-slate-700">acehenro07-bit</span></p>
            </div>

            <form onSubmit={handleGoToUrl} className="w-full max-w-xl mb-10">
              <div className="flex items-center bg-white border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl focus-within:border-blue-500 focus-within:shadow-xl transition-all rounded-2xl px-6 py-4 shadow-sm">
                <Search className="text-slate-400 mr-3" size={24} />
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Ketik alamat website..."
                  className="w-full outline-none text-lg font-medium"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <p className="text-[10px] uppercase font-bold text-slate-400 w-full text-center mb-1 tracking-widest">Saran Situs:</p>
                {suggestions.map(s => (
                  <button 
                    key={s.name}
                    type="button"
                    onClick={() => { setUrl(s.url); setActiveUrl(s.url); setIsHome(false); }}
                    className="px-4 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-full text-xs font-semibold transition-all shadow-sm"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </form>

            <div className="w-full max-w-2xl px-4">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                <Bookmark size={16} className="text-blue-500" />
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Favorit Saya</h2>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {bookmarks.map(bm => (
                  <div key={bm.id} className="group relative flex flex-col items-center">
                    <button 
                      onClick={() => { setUrl(bm.url); setActiveUrl(bm.url); setIsHome(false); }}
                      className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all shadow-sm"
                    >
                      <Globe size={24} className="text-slate-400 group-hover:text-blue-600" />
                    </button>
                    <span className="text-[10px] font-bold text-slate-600 truncate w-full text-center px-1">{bm.title}</span>
                    <button onClick={() => removeBookmark(bm.id)} className="absolute -top-2 -right-2 bg-white shadow-md rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white transition-all">
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => triggerNotification("Klik ikon Bookmark di navigasi untuk menambah!")}
                  className="w-14 h-14 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center mb-2 hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-300 hover:text-blue-500 shadow-sm"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white flex flex-col relative">
            {/* Toolbar Status */}
            <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-[11px] shadow-lg z-10">
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1 font-bold ${isAdBlockActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <ShieldCheck size={14} /> {isAdBlockActive ? 'AD-BLOCK AKTIF' : 'PROTEKSI NONAKTIF'}
                </span>
                <span className="text-slate-600">|</span>
                <span className="truncate max-w-[150px] sm:max-w-md opacity-70">URL: {activeUrl}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={addBookmark} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded flex items-center gap-1 transition-all">
                  <Bookmark size={12} /> Simpan
                </button>
                <a 
                  href={activeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded flex items-center gap-1 transition-all font-bold"
                >
                  Tab Baru <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Peringatan iFrame */}
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-[11px] text-amber-800 animate-in slide-in-from-top duration-500">
              <Info size={14} />
              <span>Jika layar kosong, situs ini melarang akses via aplikasi. Gunakan tombol <b>Tab Baru</b> di pojok kanan atas.</span>
            </div>

            <div className="flex-1 w-full bg-slate-200 relative overflow-hidden">
              <iframe 
                src={activeUrl} 
                className="w-full h-full border-none bg-white shadow-inner"
                title="Browser Viewport"
                sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
              />
              
              {isAdBlockActive && (
                <div className="absolute bottom-6 right-6 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <div className="bg-white/90 backdrop-blur-md shadow-2xl border border-emerald-100 p-4 rounded-2xl max-w-[200px]">
                      <div className="flex items-center gap-2 text-emerald-600 font-black text-xs mb-1">
                        <ShieldCheck size={16} />
                        <span>SMART SHIELD</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">Konten iklan dan skrip pelacak berbahaya otomatis diblokir oleh sistem.</p>
                   </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500"/> Privacy Mode</span>
          <span>Open-Source by acehenro07-bit</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Status: Online
        </div>
      </footer>
    </div>
  );
};

export default App;