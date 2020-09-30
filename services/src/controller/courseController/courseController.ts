import { User, UserSession, Institute, Course, Client, Company } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

class courseControllers {
  createCourseResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.body.sessionId);

      if(!session) {
        return res.status(403).send({
          success: false,
          message: "No user found"
        }); 
      } else {
        const user = await User.findByPk(session.userId);

        

        if(user) {
          const company = await Company.findByPk(user.companyId); 
        }
        
        if(user) { 
          const company = await Company.findByPk(user.companyId);

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
                couse_duration: req.body.course_duration,
                application_processing_days: req.body.application_processing_days,
                onshore_bonus_amount: req.body.onshore_bonus_amount,
                offshore_bonus_amount: req.body.offshore_bonus_amount
              })

              res.status(200).send(course);
            }
          }
        }
        res.status(200).send('error');
      }
    } catch(e) {
      return next(e);
    }
  }

  getAllCourseResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.headers.token);

      if(!session) {
        res.status(403).send({
          success: false,
          message: "Cannot find session"
        })
      } else {
        const courses = await Course.findAll();

        res.status(200).send({
          success: true,
          courses
        })
      }
    } catch(e) {
      return next(e);
    }
  }
}

const courseController = new courseControllers();
export default courseController;