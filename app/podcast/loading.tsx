export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0014] to-[#1a0033] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-t-2 border-[rgb(154,87,222)] border-solid rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl">Loading podcasts...</p>
      </div>
    </div>
  )
}
