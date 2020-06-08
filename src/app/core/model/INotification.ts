export interface INotification {
  id: number;
  title: string;
  text: string;
  wakeup?: boolean;
  trigger: {};
  unitsBefore?: number;
  unitsType?: string;
}
