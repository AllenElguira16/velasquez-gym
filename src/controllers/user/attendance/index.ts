import { TController } from "~/types";
import { getAttendance } from "~/services/attendance-service";

export const Get: TController = async (request, response) => {

  const attendance = await getAttendance(request.session.userId as string);

  response.status(200).json({
    success: true,
    attendance 
  });
}

