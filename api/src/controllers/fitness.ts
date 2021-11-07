import { ResponseError } from 'express-controller';
import { TController } from '~/api';
import { loginUser } from '~/services/user-service';

/**
 * Login with GEt request
 * 
 * @author Michael Allen Elguira <michael01@simplexi.com.ph>
 */
export const Get: TController = async (request, response) => {
  response.status(200).json({
    success: true,
    status: 200,
    fitness: [
      {
        id: '1234678-1234678-1234678',
        type: 'cardio',
        img: 'https://static.onecms.io/wp-content/uploads/sites/35/2021/07/23/best-cardio-exercises-promo-2000.jpg',
      },
      {
        id: '1234678-1234678-1234678',
        type: 'bulking',
        img: 'https://www.bodybuilding.com/fun/images/2014/what-is-the-best-bulking-program_15-700xh.jpg',
      },
      {
        id: '1234678-1234678-1234678',
        type: 'lean',
        img: 'https://skinnyms.com/wp-content/uploads/2019/08/The-Lean-Body-Workout-for-Beginners-Photo-1.jpg',
      },
    ]
  });
};
