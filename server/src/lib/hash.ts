import * as bcrypt from "bcrypt";

const hash = async (toHash: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(toHash, salt);
};

export default hash;
