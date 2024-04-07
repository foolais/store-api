const bcrypt = require('bcrypt');

// encode
const hashing = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { hashing, comparePassword };
