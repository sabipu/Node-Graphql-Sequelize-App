import { addHours } from "date-fns";
import { User, UserSession, Site } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

class siteControllers {
  createSiteResolver = async (req: any, res: any, next: any) => {
    try {
      const user = await User.findByPk(req.body.userId);

      if(!user) {
        return res.status(403).send({
          success: false,
          message: "No user found"
        });
      } else {
        const site = await Site.create({
          id: generateUUID(),
          userId: req.body.userId,
          name: req.body.name,
          url: req.body.url,
          username: req.body.username,
          sitePassword: req.body.sitePassword,
          description: req.body.description
        });

        res.status(200).send(site);
      }
    } catch(e) {
      return next(e);
    }
  }

  getAllSitesResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.body.sessionId);

      if(!session) {
        res.status(403).send({
          success: false,
          message: "Cannot find session"
        })
      }

      if(session) {
        res.status(200).send({
          success: true,
          session
        })
      }


    } catch(e) {
      return next(e);
    }
  }
}

const siteController = new siteControllers();
export default siteController;