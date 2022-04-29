import { ResponseError } from '~/helpers/response-error';
import { IUser, TController } from '~/types';
import { registerUser } from '~/services/user-service';
import { createLog } from '~/services/log-service';

/**
 * Login with POST request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Post: TController = async (request, response) => {
  const user = request.body as Omit<IUser,'type'>;
  const {firstname, lastname, email, username, password} = user;

  if (!firstname.length || !lastname.length || !email.length || !username.length || !password.length)
    throw new ResponseError(401, 'Form Inputs are Required');

  await registerUser({ ...user, type: 'member'  } );
  await createLog(`user with the username "${username}" is created`);

  response.status(200).json({
    success: true,
    status: 200
  });
};
