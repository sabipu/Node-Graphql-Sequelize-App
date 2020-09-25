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
          course_start_date: req.body.course_start_date,
          application_submission_date: req.body.application_submission_date,
          offer_letter_date: req.body.offer_letter_date,
          offer_accpetance_date: req.body.offer_accpetance_date,
          gte_assessment_date: req.body.gte_assessment_date,
          ecoe_date: req.body.ecoe_date,
          actual_ecoe_received_date: req.body.actual_ecoe_received_date,
          visa_application_lodge_date: req.body.visa_application_lodge_date,
          processing_time: req.body.processing_time,
          bonus_amount: req.body.bonus_amount
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