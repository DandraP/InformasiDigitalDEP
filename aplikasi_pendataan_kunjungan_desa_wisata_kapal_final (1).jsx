import React, { useState, useMemo } from "react";

// NOTE: Untuk deployment di GitHub & Vercel:
// 1. Simpan file gambar header sebagai: public/header.jpg
// 2. Jangan gunakan path /mnt/data (hanya berlaku di ChatGPT)
// 3. Gunakan relative path dari folder public


export default function App() {
  const [form, setForm] = useState({
    nama: "",
    daerah: "",
    kabupaten: "",
    provinsi: "",
    usia: "",
    gender: "",
    pendidikan: "",
    sebelum: "",
    sesudah: "",
  });

  const [errors, setErrors] = useState({});
  const [showPop, setShowPop] = useState(false);
  const [visits, setVisits] = useState([]);

  const kabupatenBali = ["Badung","Denpasar","Gianyar","Tabanan","Bangli","Klungkung","Karangasem","Buleleng","Jembrana"];

  const provinsiIndonesia = ["Aceh","Sumatera Utara","Sumatera Barat","Riau","Kepulauan Riau","Jambi","Sumatera Selatan","Bangka Belitung","Bengkulu","Lampung","Banten","DKI Jakarta","Jawa Barat","Jawa Tengah","DI Yogyakarta","Jawa Timur","Bali","Nusa Tenggara Barat","Nusa Tenggara Timur","Kalimantan Barat","Kalimantan Tengah","Kalimantan Selatan","Kalimantan Timur","Kalimantan Utara","Sulawesi Utara","Gorontalo","Sulawesi Tengah","Sulawesi Barat","Sulawesi Selatan","Maluku","Maluku Utara","Papua Barat","Papua"];

  const usiaRange = ["< 10 tahun","10 – 19","20 – 29","30 – 39","40 – 49","50 – 59","≥ 60"];

  const pendidikanList = ["Tidak Sekolah","SD / Sederajat","SMP / Sederajat","SMA / SMK / Sederajat","Diploma (D1–D3)","Sarjana (S1)","Magister (S2)","Doktor (S3)"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const requiredFields = ["nama", "daerah", "usia", "gender"];

  const progress = useMemo(() => {
    const filled = requiredFields.filter((f) => form[f]).length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    requiredFields.forEach((f) => { if (!form[f]) newErrors[f] = true; });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setVisits([form, ...visits]);
    setShowPop(true);
    setTimeout(() => setShowPop(false), 1500);

    setForm({ nama:"", daerah:"", kabupaten:"", provinsi:"", usia:"", gender:"", pendidikan:"", sebelum:"", sesudah:"" });
  };

  return (
    <div className="min-h-screen bg-[#7b1e24] p-4"-[#7b1e24] p-4">
      <div className="h-56 bg-cover bg-center flex items-center justify-center rounded-3xl" style={{ backgroundImage: "url('/header.jpg')" }}>
        <div className="bg-black/40 px-6 py-4 rounded-2xl">
          <h1 className="text-white text-2xl font-bold text-center">Sistem Data Kunjungan<br/>Desa Wisata Kapal</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-3xl shadow">
          <div className="mb-4 p-4 bg-[#f7eaea] rounded-2xl">
            <h2 className="font-bold text-[#7b1e24] mb-2">Dashboard Kunjungan</h2>
            <p>Total Kunjungan: <b>{visits.length}</b></p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm font-semibold mb-1"><span>Kelengkapan Form</span><span>{progress}%</span></div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-[#7b1e24] transition-all" style={{ width: `${progress}%` }} /></div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <Field label="Nama Wisatawan"><input name="nama" value={form.nama} onChange={handleChange} className={`input ${errors.nama && "error"}`} />{errors.nama && <p className="tooltip">Form ini wajib diisi!</p>}</Field>

            <Field label="Daerah Asal"><select name="daerah" value={form.daerah} onChange={handleChange} className={`input ${errors.daerah && "error"}`}><option value="">Pilih</option><option value="Dalam Bali">Dalam Bali</option><option value="Luar Bali">Luar Bali</option></select>{errors.daerah && <p className="tooltip">Form ini wajib diisi!</p>}</Field>

            {form.daerah === "Dalam Bali" && <Field label="Kabupaten"><select name="kabupaten" value={form.kabupaten} onChange={handleChange} className="input"><option value="">Pilih</option>{kabupatenBali.map(k => <option key={k}>{k}</option>)}</select></Field>}

            {form.daerah === "Luar Bali" && <Field label="Provinsi"><select name="provinsi" value={form.provinsi} onChange={handleChange} className="input"><option value="">Pilih</option>{provinsiIndonesia.map(p => <option key={p}>{p}</option>)}</select></Field>}

            <Field label="Usia"><select name="usia" value={form.usia} onChange={handleChange} className={`input ${errors.usia && "error"}`}><option value="">Pilih Rentang Usia</option>{usiaRange.map(u => <option key={u}>{u}</option>)}</select>{errors.usia && <p className="tooltip">Form ini wajib diisi!</p>}</Field>

            <Field label="Jenis Kelamin"><select name="gender" value={form.gender} onChange={handleChange} className={`input ${errors.gender && "error"}`}><option value="">Pilih</option><option>Laki-laki</option><option>Perempuan</option></select>{errors.gender && <p className="tooltip">Form ini wajib diisi!</p>}</Field>

            <Field label="Pendidikan">
              <select name="pendidikan" value={form.pendidikan} onChange={handleChange} className="input">
                <option value="">Pilih Pendidikan</option>
                {pendidikanList.map(p => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="DTW Sebelum"><input name="sebelum" value={form.sebelum} onChange={handleChange} className="input" /></Field>
            <Field label="DTW Sesudah"><input name="sesudah" value={form.sesudah} onChange={handleChange} className="input" /></Field>

            <button type="submit" className="btn">Simpan Data</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow overflow-x-auto">
          <h2 className="font-bold text-[#7b1e24] mb-3">Data Kunjungan</h2>
          {visits.length === 0 ? <p className="text-sm text-gray-500">Belum ada data.</p> : (
            <table className="w-full text-sm border-collapse">
              <thead><tr><th>No</th><th>Nama</th><th>Asal</th><th>Usia</th><th>Gender</th><th>Pendidikan</th></tr></thead>
              <tbody>{visits.map((v,i)=>(<tr key={i}><td>{i+1}</td><td>{v.nama}</td><td>{v.daerah === 'Dalam Bali' ? v.kabupaten : v.provinsi}</td><td>{v.usia}</td><td>{v.gender}</td><td>{v.pendidikan}</td></tr>))}</tbody>
            </table>
          )}
        </div>
      </div>

      {showPop && <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"><div className="pop">🎉 Data Berhasil Disimpan!</div></div>}

      <style>{`
        th,td{border:1px solid #ddd;padding:6px 8px}
        th{background:#7b1e24;color:white}
        .input{width:100%;padding:12px 14px;border-radius:14px;border:1px solid #ccc;transition:.25s}
        .input:hover{transform:translateY(-1px) scale(1.01);box-shadow:0 6px 18px rgba(123,30,36,.15)}
        .input:focus{outline:none;border-color:#7b1e24;box-shadow:0 0 0 3px rgba(123,30,36,.25)}
        .btn{background:#7b1e24;color:white;padding:14px;border-radius:16px;font-weight:700;transition:.25s}
        .btn:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 10px 25px rgba(123,30,36,.45)}
        .error{border:2px solid #facc15;background:#fffbe6}
        .tooltip{color:#ca8a04;font-size:12px;margin-top:2px}
        .pop{background:white;padding:28px 36px;border-radius:22px;font-size:20px;font-weight:800;color:#7b1e24;animation:pop .5s ease}
        @keyframes pop{0%{transform:scale(.3);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      {children}
    </div>
  );
}
