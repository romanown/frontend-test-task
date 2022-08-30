import { Observer, useLocalObservable } from 'mobx-react-lite';
import type { FC, UIEvent } from 'react';
import { Children, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import EventRow from 'components/events/EventRow';
import ResRow from 'components/events/ResRow';
import { runFetch } from 'data/api';
import { getParams } from 'helpers';
import type { IEvent, IKey, IResurse } from 'types';

import './styles.css';

const HistoryPage: FC = () => {
  const [eventsLines, setEventsLines] = useState<IEvent[] | IKey>([]);
  const [resLines, setResLines] = useState<IResurse[] | IKey>([]);
  const pageSize = 15;
  // const [page, setPage] = useState<number>(0);

  const store = useLocalObservable(() => ({
    page: 0,
    nextPage() {
      store.page++;
    },
  }));

  const debounce = useCallback((callback: any, delay: number) => {
    let timeout: any;
    const ex = () => {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
    return ex;
  }, []);

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
    arr.noappointmentId?.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));
    return arr;
  }, [eventsLines]);

  const getRes = async (ids: any[]) => {
    const qstr = getParams({ ids });
    const getResLines = await runFetch(`/resources?${qstr}`, {});
    setResLines(getResLines?.items || []);
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    console.log(store.page);
    e.stopPropagation();
    const bottom =
      Number((e.currentTarget.scrollHeight - e.currentTarget.scrollTop).toFixed(0)) - e.currentTarget.clientHeight < 50;
    // const scrollBottom = e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight; // if div is wrapped data list
    if (bottom) {
      getRes(['Condition/62558a85f8354e3ceeeaf039', 'MedicationStatement/61f40bff82ce73530ec0121c']);
      debounce(store.nextPage(), 1000);
      // setTimeout(() => setPage(page + 1), 1000);
    }
  };

  useEffect(() => {
    const eventsArray = async () => {
      const data = await runFetch('/events', {});
      setEventsLines(data?.items || []);
    };
    eventsArray();
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
      <Observer>
        {() => (
          <div>
            <div>Appointment</div>
            {Children.toArray(
              grouppEvents?.Appointment?.slice(store.page * pageSize, store.page * pageSize + pageSize)?.map(
                (oneGroupp: any) => (
                  <>
                    <EventRow {...oneGroupp} />
                    {Children.toArray(
                      grouppEvents[oneGroupp?.id]
                        ?.slice(store.page * pageSize, store.page * pageSize + pageSize)
                        ?.map((one: IEvent) => <EventRow {...one} />),
                    )}
                    {Children.toArray(resLines?.map((oneRes: IResurse) => <ResRow {...oneRes} />))}
                  </>
                ),
              ),
            )}
            <div>noappointmentId</div>
            {Children.toArray(
              grouppEvents?.noappointmentId?.map((oneGroupp: any) => (
                <>
                  <EventRow {...oneGroupp} />
                  {Children.toArray(
                    grouppEvents[oneGroupp?.id]
                      ?.slice(store.page * pageSize, store.page * pageSize + pageSize)
                      ?.map((one: IEvent) => <EventRow {...one} />),
                  )}
                </>
              )),
            )}
            {
              //  Children.toArray(eventsLines?.map((one: IEvent) => <EventRow {...one} />))
            }
          </div>
        )}
      </Observer>
    </div>
  );
};

export default HistoryPage;
