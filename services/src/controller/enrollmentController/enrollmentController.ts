import { User, UserSession, Client, Enrollment } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

class enrollmentControllers {
  createEnrollmentResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.body.sessionId);

      if(!session) {
        return res.status(403).send({
          success: false,
          message: "No user found"
        });
      } else {
        const site = await Enrollment.create({
          id: generateUUID(),
          clientId: req.body.clientId,
          courseId: req.body.courseId,
          universityId: req.body.universityId,
          course_name: req.body.course_name,
          course_category: req.body.course_category,
          course_start_date: req.body.course_start_date
        });

        res.status(200).send(site);
      }
    } catch(e) {
      return next(e);
    }
  }

  getAllEnrollmentResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.body.sessionId);

      if(!session) {
        res.status(403).send({
          success: false,
          message: "Cannot find session"
        })
      } else {
        const clients = await Enrollment.findAll();

        res.status(200).send({
          success: true,
          clients
        })
      }
    } catch(e) {
      return next(e);
    }
  }
}

const enrollmentController = new enrollmentControllers();
export default enrollmentController;