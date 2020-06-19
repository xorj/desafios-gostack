import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        //Não colocar colunas preenchidas automaticamente
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  checkPassword = (password) => {
    return bcrypt.compare(password, this.password_hash);
  };
}

export default User;
