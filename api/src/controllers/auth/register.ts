import { ResponseError } from 'express-controller';
import { TController } from '~/api';
import { registerUser } from '~/services/user-service';

/**
 * Login with POST request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Post: TController = async (request, response) => {
  const user = request.body as IUser;
  const {firstname,lastname,email,username,password,type} = user;

  if (!firstname.length || !lastname.length || !email.length || !username.length || !password.length || !type.length) {
    throw new ResponseError(401, 'Form Inputs are Required');
  }

  await registerUser(user);

  response.status(200).json({
    success: true,
    status: 200
  });
};
