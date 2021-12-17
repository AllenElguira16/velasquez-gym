import { TController } from "~/api";
import { checkOut } from "~/services/attendance-service";

export const Post: TController = async (request, response) => {

  await checkOut(request.session.userId);

  response.status(200).json({
    success: true,
    message: 'Check-in Successful'
  });
}