import { User } from "#root/db/models";

const usersResolver = () => {
  return User.findAll();
};

export default usersResolver;