import React, {useEffect, Children, useState} from 'react';
import type {FC} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';

const App: FC = () =>  {
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

const Home: FC = () =>  {
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

interface IEvent {
    id: string;
    appointmentId: string;
    name: string;
    resource: string;
    date: string;
}

interface IEvents {
    items: IEvent[];
}

const api = axios.create({
    baseURL: 'http://localhost:5010',
});

const HistoryPage: FC = () =>  {
    const [events, setEvents] = useState<IEvent[]>([]);
    useEffect(() => {
        api
            .get('/events')
            .then((res) => {
                const eventsArray = res?.data?.items || [];
                setEvents(eventsArray);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    }, []);

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
        {Children.toArray(
            events?.map((one:IEvent) => (
<EventRow {...one} />
                )))}
    </>
  );
}

const EventRow: FC<IEvent> = props =>  {
    const {id, name} = props;
    return (
        <div>
            {id}
            {name}
        </div>
    );
}

export default App;
