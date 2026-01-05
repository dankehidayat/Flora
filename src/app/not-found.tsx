export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Not Found</h2>
        <p className="text-slate-600">Could not find requested resource</p>
      </div>
    </div>
  );
}
