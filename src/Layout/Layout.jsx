import { Link, Outlet } from "react-router-dom"
import { FaGithub,FaInstagram  } from "react-icons/fa"

const Layout = () => {
  return (
    <div className="p-2 bg-neutral-900 text-white min-h-screen ">
        <header className="mb-3 flex justify-between items-center">
            <img 
            className="w-[200px]"
            src="/pokemonsster.webp" alt="Logo de la pagina" />
            <Link 
            className="border rounded-lg border-neutral-700 hover:bg-neutral-800 px-5 py-2"
            to="/favorites"
            >
              Favoritos
            </Link>
        </header>
        <main className="min-h-[500px] flex flex-col items-center justify-center ">
        <Outlet/>
        </main>
        <footer className="flex flex-col items-center justify-end h-[150px]">
          <p>Made by <span className="text-neutral-400">Monsster</span></p>
         <div className="flex gap-2 mt-3">
            <Link 
              className="hover:scale-125 transition-all"
            to="https://www.instagram.com/_.monsster._/"
            target="_blank"
            rel="noopener noreferrer"
            >
             <FaInstagram className="size-6" />
            </Link>
            <Link 
            className="hover:scale-125 transition-all"
            to="https://github.com/Yisuselpulento"
            target="_blank"
            rel="noopener noreferrer"
            >
             <FaGithub className="size-6" />
            </Link>
          </div> 
        </footer>
    </div>
  )
}

export default Layout