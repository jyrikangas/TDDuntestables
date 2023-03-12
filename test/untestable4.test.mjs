import { PasswordService, PostgresUserDao } from "../src/untestable4_copy.mjs";
import argon2 from "@node-rs/argon2";
import { expect } from "chai";

describe("Untestable 4: enterprise application", () => {
  let service;
  beforeEach(async () => {
    await PostgresUserDao.getInstance().open();
    await PostgresUserDao.getInstance().createTables();
    service = new PasswordService();
    
  });

  afterEach(async () => {
    await PostgresUserDao.getInstance().dropTables();
  });

  after(async () => {
    await PostgresUserDao.getInstance().close();
  });

  
  it("changes users password if given correct old password", async () => {
    const userId = "1";
    const oldPassword = "oldPassword";
    const newPassword = "newPassword";
    await PostgresUserDao.getInstance().save({ userId: userId, passwordHash: argon2.hashSync(oldPassword) });
    await service.changePassword(userId, oldPassword, newPassword);
    const user = await PostgresUserDao.getInstance().getById(userId);
    expect(argon2.verifySync(user.passwordHash, newPassword)).to.be.true;
  });

  it("it wont change password if old password is wrong", async () => {
    const userId = "1";
    const oldPassword = "oldPassword";
    const newPassword = "newPassword";
    await PostgresUserDao.getInstance().save({ userId: userId, passwordHash: argon2.hashSync(oldPassword) });
    
    try {
      await service.changePassword(userId, "wrongPassword", newPassword);
    }
    catch (e) {
      expect(e.message).to.equal("wrong old password");
    }
    const user = await PostgresUserDao.getInstance().getById(userId);
    expect(argon2.verifySync(user.passwordHash, newPassword)).to.be.false;
  });
});
