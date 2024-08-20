import { Route, Routes , BrowserRouter } from "react-router-dom"
import Home from "./Pages/Home"
import PokemonsDynamic from "./Pages/PokemonsDynamic"
import Layout from "./Layout/Layout"
import NotFound from "./Pages/NotFound"
import Favorites from "./Pages/Favorites"

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/:pokeid" element={<PokemonsDynamic />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}