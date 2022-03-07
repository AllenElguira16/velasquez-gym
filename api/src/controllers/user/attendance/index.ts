import { TController } from "~/api";
import { getAttendance } from "~/services/attendance-service";

export const Get: TController = async (request, response) => {

  response.status(200).json({
    success: true,
    attendance: await getAttendance(request.session.userId) 
  });
}

