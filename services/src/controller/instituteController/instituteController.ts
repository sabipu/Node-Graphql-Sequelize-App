import { User, UserSession, Company, Institute, Course } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

class instituteControllers {
  createInstituteResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.body.sessionId);

      if(!session) {
        return res.status(403).send({
          success: false,
          message: "No user found"
        }); 
      } else {
        const user = await User.findByPk(session.userId);
        const company = null;
        const course = null;
        
        if(user) { const company = await Company.findByPk(user.companyId); }

        if(company) {
          const institute = await Institute.create({
            id: generateUUID(),
            companyId: company.id,
            institute_name: req.body.institute_name,
            institute_code: req.body.institute_code,
            institute_email: req.body.institute_email,
            institute_phone: req.body.institute_phone
          });

          if(institute) {
            const course = await Course.create({
              id: generateUUID(),
              instituteId: institute.id,
              course_name: req.body.course_name,
              course_duration: req.body.course_duration,
              application_processing_days: req.body.application_processing_days,
              onshore_bonus_amount: req.body.onshore_bonus_amount,
              offshore_bonus_amount: req.body.offshore_bonus_amount
            })
          }
        }

        res.status(200).send(course);
      }
    } catch(e) {
      return next(e);
    }
  }

  getAllInstituteResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.body.sessionId);

      if(session) {
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

const instituteController = new instituteControllers();
export default instituteController;