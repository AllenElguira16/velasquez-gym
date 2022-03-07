
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
  memberships?: IMembership[];
  createdAt: Date;
  updatedAt: Date;
}

interface IFitness {
  id: string;
  type: string;
  img: string;
  virtualAssistance?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IMembership {
  id: string;
  user: IUser;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IAttendance {
  id: string;
  user_id: string;
  type: 'check-in'|'check-out'
  createdAt: Date;
  updatedAt: Date;
}
