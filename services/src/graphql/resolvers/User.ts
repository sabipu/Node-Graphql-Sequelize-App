import { User, Site } from "#root/db/models";

const resolvers = {
  sites: (user: User) => {
    return Site.findAll({
      include: [
        {
          model: User,
          where: { id: user.id }
        }
      ],
      order: [["name", "ASC"]]
    });
  }
};

export default resolvers;