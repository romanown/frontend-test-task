import axios from 'axios';
import EventRow from 'components/events/EventRow';
import type { FC } from 'react';
import { Children, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { IEvent, IKey } from 'types';

import './styles.css';

const host: string | undefined = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: host,
});

const HistoryPage: FC = () => {
  const [eventsLines, setEventsLines] = useState<IEvent[] | IKey>([]);

  const groupBy = (xs: IEvent[] | IKey, key: string, priorityKey: string, defaultKey: string): IKey =>
    xs.reduce((acc: IKey, x: IKey) => {
      const intKey = x[key] || (x.name === priorityKey ? priorityKey : defaultKey);
      (acc[intKey] = acc[intKey] || []).push(x);
      return acc;
    }, {});

  const grouppEvents = useMemo(() => {
    const arr = groupBy(eventsLines, 'appointmentId', 'Appointment', 'noappointmentId');
    arr.noappointmentId?.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));
    arr.Appointment?.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));
    return arr;
  }, [eventsLines]);

  const handleScroll = (e: any) => {
    e.stopPropagation();
    const bottom = Number((e.target.scrollHeight - e.target.scrollTop).toFixed(0)) - e.target.clientHeight < 50;
    // const scrollBottom = e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight; // if div is wrapped data list
    if (bottom) {
      console.log('on bottom');
    }
  };

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
      <div onScroll={handleScroll} className="Home scrollable">
        Appointment
        {Children.toArray(
          grouppEvents?.Appointment?.map((oneGroupp: any) => (
            <>
              <EventRow {...oneGroupp} />
              {Children.toArray(grouppEvents[oneGroupp?.id]?.map((one: IEvent) => <EventRow {...one} />))}
            </>
          )),
        )}
        noappointmentId
        {Children.toArray(
          grouppEvents?.noappointmentId?.map((oneGroupp: any) => (
            <>
              <EventRow {...oneGroupp} />
              {Children.toArray(grouppEvents[oneGroupp?.id]?.map((one: IEvent) => <EventRow {...one} />))}
            </>
          )),
        )}
      </div>
      {
        //  Children.toArray(eventsLines?.map((one: IEvent) => <EventRow {...one} />))
      }
      <div onScroll={handleScroll}>text</div>
    </>
  );
};

export default HistoryPage;
