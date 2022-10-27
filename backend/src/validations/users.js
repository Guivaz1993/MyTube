const yup = require("./config");

const signUpSchema = yup.object().shape({
  username: yup.string().trim().required().max(50),
  password: yup.string().trim().required(),
});

const signInSchema = yup.object().shape({
  username: yup.string().trim().required().max(50),
  password: yup.string().trim().required(),
});

module.exports = {
  signUpSchema,
  signInSchema,
};
