import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Fib from './Fib';
import OtherPage from './OtherPage';

import './App.css';

const App = () => (
    <Router>
        <header>
            <h1>Welcome to our app!</h1>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/otherpage'>Other Page</Link>
            </nav>
        </header>
        <Routes>
            <Route path='' element={<Fib />} />
            <Route path='otherpage' element={<OtherPage />} />
        </Routes>
    </Router>
);

export default App;
