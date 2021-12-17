import { ResponseError } from "express-controller";
import { getRepository } from "typeorm";
import { AttendanceEntity } from "~/entities/attendance-entity";
import { today } from "~/helpers/today";

const attendanceEntity = getRepository(AttendanceEntity);

export const checkIn = async (userId: string) => {
  const checkInCount = await attendanceEntity.count({ where: {user_id: userId, date: today }});
  if (checkInCount > 0) {
    throw new ResponseError(400, 'Already Checked-in');
  }

  await attendanceEntity.save({  
    user_id: userId,
    checkIn: true,
  });
};

export const checkOut = async (userId: string) => {
  const attendance = await attendanceEntity.findOne({ 
    where: {
      user_id: userId,
      checkIn: true, 
      date: today
    }
  });

  if (!attendance) {
    throw new ResponseError(400, 'Check-in First');
  }

  if (attendance.checkOut) {
    throw new ResponseError(400, 'Already Checked-out');
  }

  attendance.checkOut = true;

  await attendanceEntity.save(attendance);
};

export const getAttendance = async (userId: string) => {
  const data = await attendanceEntity.find({ 
    where: {
      user_id: userId
    }
  });

  return data;
}
