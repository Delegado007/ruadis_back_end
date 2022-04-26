const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$9CyitTxYkpSH50Zc1VYiMe/x7BL6Oog2ST4dU7TJfDSd6qiZstcnW';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch)
}

hashPassword()

