import type { FC } from 'react';

import './styles.css';
import type { IEvent } from 'types';

const EventRow: FC<IEvent> = (props) => {
  const { id, name, appointmentId, resource, date } = props;
  return (
    <div className="event_row">
      <div>{id}&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div>{appointmentId || '____________________'}&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div>{name}&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div>{resource}&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</div>
      <div>{date}&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </div>
  );
};

export default EventRow;
