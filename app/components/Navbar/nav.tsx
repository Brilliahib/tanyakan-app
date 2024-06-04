export default function Navbar() {
  return (
    <>
      <header>
        <div className="top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl">
          <div className="flex items-center">
            <div className="flex items-center">
              <a href="" className="text-sm font-medium mr-2">
                Tanyakan
              </a>
            </div>
            <div className="flex items-center">
              <p>/</p>
              <a
                href="/login"
                className="ml-2 text-sm font-medium hover:underline dark:text-zinc-200"
              >
                Login
              </a>
            </div>
          </div>
          <div></div>
        </div>
      </header>
    </>
  );
}
