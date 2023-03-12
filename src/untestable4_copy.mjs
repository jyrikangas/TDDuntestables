import argon2 from "@node-rs/argon2";
import pg from "pg";
export class PostgresUserDao {
  
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PostgresUserDao();
    }
    return this.instance;
  }

  require
  db = new pg.Pool({
    user: "untestable",
    host: "localhost",
    database: "untestable",
    password: "secret",
    port: "5432",
  });

  close() {
    this.db.end();
  }
  open() {
    this.db.connect();
  }

  createTables() {
    return this.db.query(
      `create table if not exists users (
        user_id varchar(255) primary key,
        password_hash varchar(100) not null
      )`
    );
  }
  dropTables() {
    return this.db.query(
      `drop table if exists users`
    );
  }


  #rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId]
    );
    return rows.map(this.#rowToUser)[0] || null;
  }

  async save(user) {
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash]
    );
  }
}

export class PasswordService {
  users = PostgresUserDao.getInstance();

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    if (!argon2.verifySync(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = argon2.hashSync(newPassword);
    await this.users.save(user);
  }
}
