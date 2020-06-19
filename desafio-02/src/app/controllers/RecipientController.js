import Sequelize from "sequelize";
import Recipient from "../models/Recipient";
import * as Yup from "yup";

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(10).max(100),
      street: Yup.string().required().min(6).max(100),
      number: Yup.number().required(),
      complement: Yup.string(),
      uf: Yup.string().max(2),
      city: Yup.string().min(2).max(100),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Invalid recipient." });
    }

    const recipient = await Recipient.create(req.body);

    return res.status(200).json({
      message: "Recipient added.",
      recipient,
    });
  }
}

export default new RecipientController();
