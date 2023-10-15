import * as nodermailer from "nodemailer";
import config from "./config";

const transporter = nodermailer.createTransport({
  service: "hotmail",
  auth: {
    user: config.nodemailer.user,
    pass: config.nodemailer.password,
  },
});

export default transporter;
