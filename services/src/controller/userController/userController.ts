import { User, Site } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import hashedPassword from "#root/helpers/hashedPassword";

class userControllers {
  getAllUsers(req: any, res: any) {
    User.findAll()
      .then((users: any) => res.status(200).send({
        success: 'true',
        message: 'users retrieved successfully',
        users,
      }));
  }

  getSiteResolver = async (req: any, res: any, next: any) => {
    try {
      const sites = await Site.findByPk(req.body.userId);

      if(!sites) {
        res.status(403).send({
          success: false,
          message: "Not sites found"
        });
        return next(new Error("Invalid session ID"));
      }

      return res.status(200).send({
        success: true,
        message: "Retrieved sites successfully",
        sites
      });
    } catch(e) {
      return next(e);
    }
  }

  createUserResolver = async (req: any, res: any, next: any) => {
    if (await User.findOne({ where: { email: req.body.email } })) {
      res.status(403).send({
        success: false,
        message: "The following email address already exists"
      })
    }
    try {
      const user = await User.create({
        id: generateUUID(),
        email: req.body.email, 
        name: req.body.name, 
        hashPassword: hashedPassword(req.body.hashPassword)
      });

      return res.status(200).send({
        success: true,
        message: "User created successfully",
        user
      })
    } catch(e) {
      return next(e);
    }
  }

  createSiteResolver = async (req: any, res: any, next: any) => {
    try {
      res.status(200).send(req.body);
    } catch(e) {
      return next(e);
    }
  }
}

const userController = new userControllers();
export default userController;
