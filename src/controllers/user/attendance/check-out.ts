import { TController } from "~/types";
import { checkOut } from "~/services/attendance-service";

export const Post: TController = async (request, response) => {

  await checkOut(request.session.userId as string);

  response.status(200).json({
    success: true,
    message: 'Check-in Successful'
  });
}