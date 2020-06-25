import * as bcrypt from "bcryptjs";

const hashedPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export default hashedPassword;