import axios from 'axios';
import type { FC } from 'react';
import { Children, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

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

interface IEvent {
  id: string;
  appointmentId?: string;
  name: string;
  resource: string;
  date: string;
}

interface IKey {
  [key: string]: any;
}

const host: string | undefined = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: host,
});

const HistoryPage: FC = () => {
  const [eventsLines, setEventsLines] = useState<IEvent[] | IKey>([]);

  const groupBy = (xs: IEvent[] | IKey, key: string, defaultKey: string): IKey =>
    xs.reduce((acc: IKey, x: IKey) => {
      const intKey = x[key] || defaultKey;
      (acc[intKey] = acc[intKey] || []).push(x);
      return acc;
    }, {});
  const grouppEvents = groupBy(eventsLines, 'appointmentId', 'noappointmentId');

  useEffect(() => {
    api
      .get('/events')
      .then((res) => {
        const eventsArray = res?.data?.items || [];
        setEventsLines(eventsArray);
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
        <p>That feels like an existential question, don&apos;t you think?</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      {Children.toArray(
        Object.keys(grouppEvents)?.map((oneGroupp: any) =>
          grouppEvents[oneGroupp]?.map((one: IEvent) => <EventRow {...one} />),
        ),
      )}
      {Children.toArray(eventsLines?.map((one: IEvent) => <EventRow {...one} />))}
    </>
  );
};

const EventRow: FC<IEvent> = (props) => {
  const { id, name, appointmentId, resource, date } = props;
  return (
    <div>
      {id}&nbsp;&nbsp;&nbsp;&nbsp;
      {appointmentId || ''}&nbsp;&nbsp;&nbsp;&nbsp;
      {name}&nbsp;&nbsp;&nbsp;&nbsp;
      {resource}&nbsp;&nbsp;&nbsp;&nbsp;
      {date}&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  );
};

export default App;
