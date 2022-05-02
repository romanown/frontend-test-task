import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
            History App.
        </p>
      </header>
	  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<HistoryPage />} />
      </Routes>
    </div>
  );
}

const Home = () =>  {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/history">HistoryPage</Link>
      </nav>
    </>
  );
}

const HistoryPage = () =>  {
  return (
    <>
      <main>
        <h2>HistoryPage</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
