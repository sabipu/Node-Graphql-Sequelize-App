import { User, UserSession, Client } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

class clientControllers {
  createClientResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.body.sessionId);

      if(!session) {
        return res.status(403).send({
          success: false,
          message: "No user found"
        });
      } else {
        const site = await Client.create({
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

  getAllClientResolver = async (req: any, res: any, next: any) => {
    try {
      const session = await UserSession.findByPk(req.body.sessionId);

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

const clientController = new clientControllers();
export default clientController;