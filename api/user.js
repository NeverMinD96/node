module.exports = (db) => {
  const userDb = db('user');

  return {
    async read(id) {
      return await userDb.read(id, ['id', 'login']);
    },

    async create({ login, password }) {
      const passwordHash = await common.hash(password);
      return await userDb.create({ login, password: passwordHash });
    },

    async update(id, { login, password }) {
      const passwordHash = await common.hash(password);
      return await userDb.update(id, { login, password: passwordHash });
    },

    async delete(id) {
      return await userDb.delete(id);
    },

    async find(mask) {
      const sql = 'SELECT login from users where login like $1';
      return await userDb.query(sql, [mask]);
    },
  };
};
