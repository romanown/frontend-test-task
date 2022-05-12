import type { FC } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Home: FC = () => (
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

export default Home;
