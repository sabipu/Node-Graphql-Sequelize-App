import { User } from "#root/db/models";

const createUserResolver = (context: any, {email, name, hashPassword}: {email: string, name: string, hashPassword: string}) => {
  return User.create({ email, name, hashPassword });
}

export default createUserResolver;