import { TController } from "~/api";
import { getUsers } from "~/services/user-service";

/**
 * Get Users
 * 
 * @param request 
 * @param response 
 */
export const Get: TController = async (request, response) => {

  response.status(200).json({
    success: true,
    users: await getUsers()
  });
}