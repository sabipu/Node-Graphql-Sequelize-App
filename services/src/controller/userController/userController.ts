import { addHours } from "date-fns";
import { User, UserSession, Site } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import hashedPassword from "#root/helpers/hashedPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";

const USER_SESSION_EXPIRY_HOURS = 1;

class userControllers {
  getAllUsers(req: any, res: any) {
    User.findAll()
      .then((users: any) => res.status(200).send({
        success: true,
        message: 'users retrieved successfully',
        users,
      }));
  }

  createUserResolver = async (req: any, res: any, next: any) => {
    if (await User.findOne({ where: { email: req.body.email } })) {
      res.status(403).send({
        success: false,
        message: "Email address already exists"
      })
    }
    try {
      const user = await User.create({
        id: generateUUID(),
        email: req.body.email,
        name: req.body.name,
        hashPassword: hashedPassword(req.body.password)
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

  userSessionResolver = async (req: any, res: any, next: any) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email && password) {
      const user = await User.findOne({ where: { email: req.body.email } });

      if(!user) {
        return res.status(403).send({
          success: false,
          message: "Email doesn't exists"
        });
      }

      if (!passwordCompareSync(req.body.password, user.hashPassword)) {
        return res.status(403).send({
          success: false,
          message: "Incorrect password"
        });
      }

      const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);
      const sessionToken = generateUUID();

      const userSession = await UserSession.create({
        expiresAt,
        id: sessionToken,
        userId: user.id
      });

      return res.status(200).send({
        success: true,
        message: "User session created",
        userSession
      });

    }

    return res.status(403).send({
      success: false,
      message: "Email or password not provided"
    });
  }
}

const userController = new userControllers();
export default userController;
