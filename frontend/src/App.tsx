import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import HistoryPage from './pages/HistoryPage';
import Home from './pages/Home';

const App: FC = () => (
  <div className="App">
    <header className="App-header">
      <p>History App.</p>
    </header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="history" element={<HistoryPage />} />
    </Routes>
  </div>
);

export default App;
