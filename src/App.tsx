import { Routes, Route } from 'react-router-dom'
import { Providers } from './providers'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Providers>
  )
}

export default App