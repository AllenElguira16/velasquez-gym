import { ResponseError } from 'express-controller';
import {TController} from '~/api';

/**
 * Login with GET request
 * 
 * @author Michael Allen Elguira <AllenElguira16@gmail.com>
 */
export const Get: TController = async (request, response) => {
  const {user} = request.session; 

  if (!user) {
    throw new ResponseError(404, 'User not authenticated');
  }

  response.status(200).json({
    success: true,
    status: 200,
    user
  });
}

/**
 * Logout with DELETE request
 * 
 * @author Michael Allen Elguira <AllenElguira16@gmail.com>
 */
export const Delete: TController = async (request, response) => {

  request.session.destroy(null);

  response.status(200).json({
    success: true,
    status: 200
  });
}
