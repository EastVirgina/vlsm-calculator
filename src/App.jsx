import { useState, useMemo } from 'react';
import { calculateVLSM } from './utils/vlsm';

function App() {
  const [baseIp, setBaseIp] = useState('192.168.1.0');
  const [subnets, setSubnets] = useState([
    { id: 1, name: 'Ruang Server', hosts: 60 },
    { id: 2, name: 'Lab Komputer', hosts: 25 },
  ]);

  const vlsmResults = useMemo(() => {
    try {
      return calculateVLSM(baseIp, subnets);
    } catch (error) {
      return [];
    }
  }, [baseIp, subnets]);

  const addSubnet = () => {
    const newId = subnets.length ? Math.max(...subnets.map(s => s.id)) + 1 : 1;
    setSubnets([...subnets, { id: newId, name: `Subnet ${newId}`, hosts: 10 }]);
  };

  const updateSubnet = (id, field, value) => {
    setSubnets(subnets.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSubnet = (id) => {
    setSubnets(subnets.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Kalkulator VLSM</h1>
        <p className="text-slate-500 text-sm mt-1">Alat Perencanaan Subnetting Jaringan</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Panel Kontrol Input */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-slate-700">Base IP Address</label>
            <input 
              type="text" 
              value={baseIp} 
              onChange={(e) => setBaseIp(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="192.168.1.0"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-slate-700">Daftar Subnet</h3>
              <button 
                onClick={addSubnet}
                className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium hover:bg-blue-200 cursor-pointer"
              >
                + Tambah
              </button>
            </div>
            
            {subnets.map((subnet) => (
              <div key={subnet.id} className="p-3 bg-slate-50 rounded border border-slate-200 relative group">
                <input 
                  type="text" 
                  value={subnet.name} 
                  onChange={(e) => updateSubnet(subnet.id, 'name', e.target.value)}
                  className="w-full text-sm font-medium bg-transparent border-b border-slate-300 mb-2 focus:outline-none focus:border-blue-500"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Hosts:</span>
                  <input 
                    type="number" 
                    value={subnet.hosts} 
                    onChange={(e) => updateSubnet(subnet.id, 'hosts', parseInt(e.target.value) || 0)}
                    className="w-20 p-1 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button 
                  onClick={() => removeSubnet(subnet.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 hidden group-hover:block cursor-pointer"
                  title="Hapus Subnet"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Tabel Hasil */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold">Nama Subnet</th>
                  <th className="p-4 font-semibold">Alokasi Blok</th>
                  <th className="p-4 font-semibold">Network ID</th>
                  <th className="p-4 font-semibold">Range IP Valid</th>
                  <th className="p-4 font-semibold">Broadcast ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vlsmResults.map((result) => (
                  <tr key={result.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{result.name}</div>
                      <div className="text-xs text-slate-500">Butuh: {result.neededSize} hosts</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                        /{result.cidr}
                      </span>
                      <div className="text-xs text-slate-500 mt-1">Total: {result.allocatedSize} IP</div>
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-700">{result.networkId}</td>
                    <td className="p-4 font-mono text-xs text-emerald-600">
                      {result.firstIp} - {result.lastIp}
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-700">{result.broadcastId}</td>
                  </tr>
                ))}
                {vlsmResults.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                      Tambahkan subnet untuk melihat hasil kalkulasi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;