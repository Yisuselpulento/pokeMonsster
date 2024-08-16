import { Link, Outlet } from "react-router-dom"
/* import Instagram from "../icons/instagram"
import Github from "../icons/Github" */

const Layout = () => {
  return (
    <div className="p-2 bg-neutral-900 text-white min-h-screen ">
        <header className="mb-3">
            <img 
            className="w-[200px]"
            src="/pokemonsster.webp" alt="Logo de la pagina" />
        </header>
        <main className="min-h-[500px] flex flex-col items-center justify-center ">
        <Outlet/>
        </main>
        <footer className="flex flex-col items-center justify-end h-[150px]">
          <p>Made by <span className="text-neutral-400">Monsster</span></p>
   {/*        <div className="flex gap-2 mt-3">
            <Link 
              className="hover:scale-125 transition-all"
            to="https://www.instagram.com/_.monsster._/"
            target="_blank"
            rel="noopener noreferrer"
            >
             <Instagram/>
            </Link>
            <Link 
            className="hover:scale-125 transition-all"
            to="https://github.com/Yisuselpulento"
            target="_blank"
            rel="noopener noreferrer"
            >
             <Github/>
            </Link>
          </div> */}
        </footer>
    </div>
  )
}

export default Layout