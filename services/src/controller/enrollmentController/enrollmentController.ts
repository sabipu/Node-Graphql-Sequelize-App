import { UserSession, Enrollment, Client } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import enrollmentCalculator from "#root/helpers/enrollmentCalculator";

class enrollmentControllers {
  createEnrollmentResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.body.sessionId);

      if(session) {
        return res.status(403).send({
          success: false,
          message: "No user found"
        }); 
      } else {
        const enrollmentData = await enrollmentCalculator(req.body.courseId, req.body.course_start_date);
        const client = await Client.findOne({ where: { condat_id: req.body.clientId } });

        if(client) {
          const enrollment = await Enrollment.create({
            id: generateUUID(),
            clientId: client.id,
            courseId: req.body.courseId,
            course_name: enrollmentData.course_name,
            course_category: req.body.category,
            course_start_date: req.body.course_start_date,
            application_submission_date: enrollmentData.applicate_submission_date,
            offer_letter_date: enrollmentData.offer_letter_date,
            offer_accpetance_date: enrollmentData.offer_accpetance_date,
            gte_assessment_date: enrollmentData.gte_assessment_date,
            ecoe_date: enrollmentData.ecoe_date,
            visa_application_lodge_date: enrollmentData.visa_application_lodge_date,
            processing_time: enrollmentData.processing_time,
            bonus_amount: enrollmentData.bonus_amount
          });

          const resPayload = {
            id: enrollment.id,
            client_name: client.first_name + ' ' + client.last_name,
            course_name: enrollmentData.course_name,
            course_category: req.body.category,
            course_start_date: req.body.course_start_date,
            application_submission_date: enrollmentData.applicate_submission_date,
            offer_letter_date: enrollmentData.offer_letter_date,
            offer_accpetance_date: enrollmentData.offer_accpetance_date,
            gte_assessment_date: enrollmentData.gte_assessment_date,
            ecoe_date: enrollmentData.ecoe_date,
            visa_application_lodge_date: enrollmentData.visa_application_lodge_date,
            processing_time: enrollmentData.processing_time,
            bonus_amount: enrollmentData.bonus_amount
          }

          res.status(200).send(resPayload);
        }

        // const site = await Enrollment.create({
        //   id: generateUUID(),
        //   clientId: req.body.clientId,
        //   courseId: req.body.courseId,
        //   course_start_date: req.body.course_start_date
        // });

        // res.status(200).send(site);
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
        const enrollments = await Enrollment.findAll();

        res.status(200).send({
          success: true,
          enrollments
        })
      }
    } catch(e) {
      return next(e);
    }
  }
}

const enrollmentController = new enrollmentControllers();
export default enrollmentController;