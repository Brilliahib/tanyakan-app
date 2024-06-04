import Navbar from "./components/Navbar/nav";

export default function MyApp() {
  return (
    <>
      <Navbar />
      <div className="flex px-4 justify-center text-center py-6 md:py-24">
        <div className="">
          <div className="hero-text max-w-3xl">
            <h1 className="text-3xl font-semibold mb-4">
              Enjoy Everyday With Tanyakan
            </h1>
            <p className="text-base text-gray-500 text-base mb-6 md:mb-8">
              Tanyakan adalah tempat berbagi ilmu ratusan juta siswa dan pakar
              edukasi, belajar bersama untuk menyelesaikan soal-soal yang paling
              rumit sekalipun
            </p>
            <div className="flex items-center justify-center gap-x-4 flex-wrap">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white px-6 border-2 py-1.5 h-fit">
                Explore
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black px-6 border-2 py-1.5 h-fit">
                Add a Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
