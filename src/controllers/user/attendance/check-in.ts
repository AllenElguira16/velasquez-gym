import { TController } from "~/types";
import { checkIn } from "~/services/attendance-service";
import { getUserById } from "~/services/user-service";
import { createLog } from "~/services/log-service";

export const Post: TController = async (request, response) => {
  const { userId } = request.session;

  if (!userId) return;
  
  const { username } = await getUserById(userId);
  
  await checkIn(userId);
  await createLog(`${username} has logged in`);


  response.status(200).json({
    success: true,
    message: 'Check-in Successful'
  });
}