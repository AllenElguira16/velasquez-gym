
interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  type: 'member'|'admin';
  fitness: IFitness;
  attendances?: IAttendance[]
  membership?: IMembership;
}

interface IFitness {
  id: string;
  type: string;
  img: string;
  virtualAssistance?: string;
}

interface IMembership {
  id: string;
  user_id: string;
  paid: boolean;
}

interface IAttendance {
  id: string;
  user_id: string;
  checkIn: boolean;
  checkOut: boolean;
  date: string;
}
