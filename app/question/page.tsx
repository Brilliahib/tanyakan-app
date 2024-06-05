import Card from "../components/Card/card";
import Navbar from "../components/Navbar/nav";

export default function Question() {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-3xl format format-sm sm:format-base lg:format-lg py-4 lg:py-8">
        <h1 className="font-bold text-xl mb-4">Cari Pertanyaan</h1>
        <Card rounded="md">
          <p className="text-xs text-gray-500 mb-2">5/30/2024, 11:34:33 PM</p>
          <p className="text-base font-semibold text-slate-900">
            Bagaimana caranya bisa menjadi Software Engineer?
          </p>
        </Card>
        <Card rounded="md">
          <p className="text-xs text-gray-500 mb-2">5/30/2024, 11:47:38 PM</p>
          <p className="text-base font-semibold text-slate-900">
            Semangat terus ges! aku capek :p
          </p>
        </Card>
      </div>
    </>
  );
}
