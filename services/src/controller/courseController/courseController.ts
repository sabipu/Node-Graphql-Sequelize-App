import { User, UserSession, Client, Company } from "#root/db/models";
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
        if (await Client.findOne({ where: { email: req.body.email } })) {
          res.status(403).send({
            success: false,
            message: "Email address already exists"
          })
        }if (await Client.findOne({ where: { condat_id: req.body.condat_id } })) {
          res.status(403).send({
            success: false,
            message: "Condat ID already exists"
          })
        } else {
          const user = await User.findByPk(session.userId);
          let userId = null;
          let companyId = null;
          let company = null;

          if(user) {
            userId = user.id;
          }
          if(userId !== null) {
            company = await Company.findOne({ where: { userId: userId } });
          }
          
          if(company) {
            companyId = company.id;
          }

          const site = await Client.create({
            id: generateUUID(),
            companyId: companyId,
            condat_id: req.body.condat_id,
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            added_by: userId,
            assigned_to: req.body.assigned_to,
            description: req.body.description
          });

          res.status(200).send(site);
        }
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
        const clients = await Client.findAll();

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

const courseController = new courseControllers();
export default courseController;