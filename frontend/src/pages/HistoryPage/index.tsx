import axios from 'axios';
import EventRow from 'components/events/EventRow';
import ResRow from 'components/events/ResRow';
import { getParams } from 'helpers';
import type { FC, UIEvent } from 'react';
import { Children, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { IEvent, IKey, IResurse } from 'types';

import './styles.css';

const host: string | undefined = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: host,
});

const HistoryPage: FC = () => {
  const [eventsLines, setEventsLines] = useState<IEvent[] | IKey>([]);
  const [resLines, setResLines] = useState<IResurse[] | IKey>([]);
  const pageSize = 15;
  const [page, setPage] = useState<number>(0);

  const groupBy = (xs: IEvent[] | IKey, key: string, priorityKey: string, defaultKey: string): IKey =>
    xs.reduce((acc: IKey, x: IKey) => {
      const intKey = x[key] || (x.name === priorityKey ? priorityKey : defaultKey);
      (acc[intKey] = acc[intKey] || []).push(x);
      return acc;
    }, {});

  const grouppEvents = useMemo(() => {
    const arr = groupBy(eventsLines, 'appointmentId', 'Appointment', 'noappointmentId');
    arr.noappointmentId
      ?.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date))
      ?.slice(page * pageSize, page * pageSize + pageSize);
    arr.Appointment?.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date))?.slice(
      page * pageSize,
      page * pageSize + pageSize,
    );
    arr.noappointmentId
      ?.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date))
      ?.slice(page * pageSize, page * pageSize + pageSize);
    console.log(arr, page, page * pageSize, page * pageSize + pageSize);
    return arr;
  }, [eventsLines, page, pageSize]);

  const getRes = (ids: any[]) => {
    const qstr = getParams({ ids });
    api
      .get(`/resources?${qstr}`)
      .then((res) => {
        const resArray = res?.data?.items || [];
        setResLines(resArray);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const bottom =
      Number((e.currentTarget.scrollHeight - e.currentTarget.scrollTop).toFixed(0)) - e.currentTarget.clientHeight < 50;
    // const scrollBottom = e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight; // if div is wrapped data list
    if (bottom) {
      console.log('on bottom');
      getRes(['Condition/62558a85f8354e3ceeeaf039', 'MedicationStatement/61f40bff82ce73530ec0121c']);
      setPage(page + 1);
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
    <div onScroll={handleScroll} className="Home scrollable">
      <main>
        <h2>HistoryPage</h2>
        <p>That feels like an existential question, don&apos;t you think?</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      Appointment
      {Children.toArray(
        grouppEvents?.Appointment?.slice(page * pageSize, page * pageSize + pageSize)?.map((oneGroupp: any) => (
          <>
            <EventRow {...oneGroupp} />
            {Children.toArray(
              grouppEvents[oneGroupp?.id]
                ?.slice(page * pageSize, page * pageSize + pageSize)
                ?.map((one: IEvent) => <EventRow {...one} />),
            )}
            {Children.toArray(resLines?.map((oneRes: IResurse) => <ResRow {...oneRes} />))}
          </>
        )),
      )}
      <div>noappointmentId</div>
      {Children.toArray(
        grouppEvents?.noappointmentId?.map((oneGroupp: any) => (
          <>
            <EventRow {...oneGroupp} />
            {Children.toArray(
              grouppEvents[oneGroupp?.id]
                ?.slice(page * pageSize, page * pageSize + pageSize)
                ?.map((one: IEvent) => <EventRow {...one} />),
            )}
          </>
        )),
      )}
      {
        //  Children.toArray(eventsLines?.map((one: IEvent) => <EventRow {...one} />))
      }
    </div>
  );
};

export default HistoryPage;
