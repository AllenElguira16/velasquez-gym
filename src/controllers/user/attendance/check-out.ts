import { TController } from "~/types";
import { checkOut } from "~/services/attendance-service";
import { createLog } from "~/services/log-service";
import { getUserById } from "~/services/user-service";

export const Post: TController = async (request, response) => {
  const { userId } = request.session;

  if (!userId) return;
  
  const { username } = await getUserById(userId);
  
  await checkOut(userId);
  await createLog(`${username} has logged in`);

  response.status(200).json({
    success: true,
    message: 'Check-in Successful'
  });
}