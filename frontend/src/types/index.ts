export interface IKey {
  [key: string]: any;
}

export interface IEvent {
  id: string;
  appointmentId?: string;
  name: string;
  resource: string;
  date: string;
}

export interface IResurse {
  id: string;
  details?: string;
  values?: IValueObj[] | string[];
  code?: string;
  date: string;
}

export interface IValueObj {
  value?: string | number;
  unit?: string;
}
