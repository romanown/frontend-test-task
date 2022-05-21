import type { FC } from 'react';

import './styles.css';
import type { IResurse } from 'types';

const ResRow: FC<IResurse> = (props) => {
  const { id, details, values, code } = props;
  return (
    <div className="res_row">
      <div>{id}&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div>{details}&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div>{JSON.stringify(values)}&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</div>
      <div>{code}&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </div>
  );
};

export default ResRow;
