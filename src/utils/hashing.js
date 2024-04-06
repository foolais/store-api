const bcrypt = require('bcrypt');

// encode
const hashing = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = hashing;
