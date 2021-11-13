import { ResponseError } from 'express-controller';
import { TController } from '~/api';
import { loginUser, registerAdmin } from '~/services/user-service';

/**
 * Login with POST request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Post: TController = async (request, response) => {

  const user = request.body as IUser;
  const {username,password,type} = user;

  if (!username.length || !password.length || !type.length) {
    throw new ResponseError(401, 'Form Inputs are Required');
  }

  if (username === 'admin')
    await registerAdmin();

  request.session.userId = await loginUser(user);

  response.status(200).json({
    success: true,
    status: 200
  });
};
