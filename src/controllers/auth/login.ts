import { ResponseError } from '~/helpers/response-error';
import { TController, IUser } from '~/types';
import { loginUser, registerAdmin } from '~/services/user-service';
import { createLog } from '~/services/log-service';

/**
 * Login with POST request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Post: TController = async (request, response) => {

  const user = request.body as IUser;
  const {username,password} = user;

  if (!username.length || !password.length) {
    throw new ResponseError(401, 'Form Inputs are Required');
  }

  if (username === 'admin')
    await registerAdmin();

  request.session.userId = await loginUser(user);

  await createLog(`${username} has logged in`);

  response.status(200).json({
    success: true,
    status: 200
  });
};
