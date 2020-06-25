import { User } from "#root/db/models";

const updateUserResolver = (context: any, {id, email, name, hashPassword}: {id: string, email: string, name: string, hashPassword: string}) => {
  return User.update({ email, name, hashPassword }, {
    where: { id },
    returning: true
  });
}

export default updateUserResolver;