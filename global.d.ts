
interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  type: 'member'|'trainer'|'admin';
  fitness: IFitness;
}

interface IFitness {
  id: string;
  type: string;
  img: string;
}
