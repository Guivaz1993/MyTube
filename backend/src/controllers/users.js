const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const modelUsers = require("../models/users");
const schemaUsers = require("../validations/users");

const secretToken = process.env.TOKEN_SECRET;

const signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    await schemaUsers.signUpSchema.validate(req.body);
    const userExists = await modelUsers.usernameExists(username);
    if (userExists) {
      return res.status(400).json({
        message: "Usuário já utilizado",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await modelUsers.insertUser(username, encryptedPassword);

    if (!newUser.length) {
      return res.status(400).json({
        message: "Não foi possível criar o usuário",
      });
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    await schemaUsers.signInSchema.validate(req.body);
    const user = await modelUsers.usernameExists(username);
    if (user.length) {
      return res.status(404).json({ message: "Usuário ou senha incorretos" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(404).json({ message: "Usuário ou senha incorretos" });
    }

    const token = jwt.sign({ id: user.id }, secretToken, { expiresIn: "2h" });

    const { password: _, ...userData } = user;

    return res.status(200).json({
      userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const tokenVerify = async (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    const responseToken = jwt.verify(token, secretToken);

    const userData = await modelUsers.getUser(responseToken.id);
    if (!userData) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const { password, ...user } = userData;

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  getUser,
  tokenVerify,
};
