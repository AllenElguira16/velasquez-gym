import { TController } from "~/api";
import { checkIn } from "~/services/attendance-service";

export const Post: TController = async (request, response) => {

  await checkIn(request.session.userId);

  response.status(200).json({
    success: true,
    message: 'Check-in Successful'
  });
}