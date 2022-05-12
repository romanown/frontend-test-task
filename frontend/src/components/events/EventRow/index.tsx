import type { FC } from 'react';

import './styles.css';
import type { IEvent } from './data';

const EventRow: FC<IEvent> = (props) => {
  const { id, name, appointmentId, resource, date } = props;
  return (
    <div>
      {id}&nbsp;&nbsp;&nbsp;&nbsp;
      {appointmentId || '____________________'}&nbsp;&nbsp;&nbsp;&nbsp;
      {name}&nbsp;&nbsp;&nbsp;&nbsp;
      {resource}&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      {date}&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  );
};

export default EventRow;
