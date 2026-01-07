export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-4xl text-center px-6">
        <h1 className="text-5xl font-bold mb-6 text-purple-400">
          Launch Your Tech Career
        </h1>

        <p className="text-gray-300 mb-8">
          Join a visionary team building intelligent solutions that transform industries
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg">
            Register
          </button>
          <button className="px-6 py-3 border border-purple-400 rounded-lg hover:bg-purple-800">
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
