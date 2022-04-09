import { ResponseError } from '~/helpers/response-error';
import { getUserById, logoutUser } from '~/services/user-service';
import { TController } from '~/types';

/**
 * Login with GET request
 * 
 * @author Michael Allen Elguira <AllenElguira16@gmail.com>
 */
export const Get: TController = async (request, response) => {
  const { userId } = request.session;

  if (!userId) {
    throw new ResponseError(404, 'User not authenticated');
  }

  response.status(200).json({
    success: true,
    status: 200,
    user: await getUserById(userId)
  });
}

/**
 * Logout with DELETE request
 * 
 * @author Michael Allen Elguira <AllenElguira16@gmail.com>
 */
export const Delete: TController = async (request, response) => {

  if (request.session.userId) {
    logoutUser(request.session.userId);

    request.session.destroy((err) => {
      console.log(err);
    });

    response.status(200).json({
      success: true,
      status: 200
    });
  }
}
