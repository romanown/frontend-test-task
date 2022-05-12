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
