import { ResponseError } from 'express-controller';
import { TController } from '~/api';
import { loginUser } from '~/services/user-service';

declare module 'express-session' {
  interface SessionData {
    user: IUser;
  }
}

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

  request.session.user = await loginUser(user); 

  response.status(200).json({
    success: true,
    status: 200
  });
};
