import * as bcrypt from 'bcrypt';

export const hash = (item, rounds: number) => {
  return bcrypt.hash(item, rounds);
};

export const compare = async (password, user) => {
  const match = await bcrypt.compare(password, user.password);

  return match ? user : null;
};
