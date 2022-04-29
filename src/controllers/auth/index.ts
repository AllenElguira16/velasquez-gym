import { ResponseError } from "~/helpers/response-error";
import { createLog } from "~/services/log-service";
import { getUserById, logoutUser, updateUser } from "~/services/user-service";
import { TController } from "~/types";

/**
 * Login with GET request
 *
 * @author Michael Allen Elguira <AllenElguira16@gmail.com>
 */
export const Get: TController = async (request, response) => {
  const { userId } = request.session;

  if (!userId) {
    throw new ResponseError(404, "User not authenticated");
  }

  response.status(200).json({
    success: true,
    status: 200,
    user: await getUserById(userId),
  });
};

/**
 * Logout with DELETE request
 *
 * @author Michael Allen Elguira <AllenElguira16@gmail.com>
 */
export const Put: TController = async (request, response) => {
  const userId = request.body.id;

  if (userId) {
    const { username } = await getUserById(userId);
    await createLog(`admin has change "${username}" account info`);
    await updateUser(userId, request.body);

    response.status(200).json({
      success: true,
      status: 200,
    });
  }
};

/**
 * Logout with DELETE request
 *
 * @author Michael Allen Elguira <AllenElguira16@gmail.com>
 */
export const Delete: TController = async (request, response) => {
  const { userId } = request.session;

  if (userId) {
    const { username } = await getUserById(userId);
    await createLog(`${username} has logged out`);
    logoutUser(userId);

    request.session.destroy((err) => {
      console.log(err);
    });

    response.status(200).json({
      success: true,
      status: 200,
    });
  }
};
