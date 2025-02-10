import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Header from './components/header/Header'
import AboutUs from './pages/AboutUs'
import Error404 from './pages/Error404'

function App() {

	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home view="public" />} />
				<Route path="/personalize" element={<Home view="personalize" />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</>
	)
}

export default App
