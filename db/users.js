const {client} = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ email, password, fullname, isAdmin = false }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const {
    rows: [user],
  } = await client.query(
    `
      INSERT INTO users(email, password, fullname, "isAdmin")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, fullname, "isAdmin";
    `,
    [email, hashedPassword, fullname, isAdmin]
  );

  return user;
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordsMatch) {
    delete user.password;
    return user;
  } else {
    return null;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT id, email
    FROM users
    WHERE id=$1;
    `,[userId]);

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT users, email
      FROM users
      WHERE id=$1;    
      `,
      [email]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
};
