import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import NotFound from "./pages/404/NotFound"
import Admin from "./pages/admin/Admin"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/noticia/:id" element={<Home />} />
      <Route path="/admin/:auth" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
