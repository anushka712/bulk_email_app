export const EMAIL_TEMPLATE_TYPES = {
  WELCOME: {
    type: "Welcome",
    variables: ["username", "email", "loginLink", "password"],
    template:
      "<p>Hi [username],</p> </br> <p>Welcome to <strong>[]</strong>! We're excited to have you on board.</p><h4>Here are your login details:</h4><ul><li><strong>Username:</strong> [username]</li><li><strong>Email:</strong> [email]</li><li><strong>Password:</strong> [password]</li></ul><p>You can log in to your account using the following link:</p><p>[loginLink]</p><p>For security reasons, we recommend that you change your password after your first login. If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,</p><p><strong>[domainname]</strong> Team</p>",
  },
  SELF_REGISTRATION: {
    type: "Self Registration",
    variables: ["username", "email", "loginLink", "password"],
    template:
      "<p>Hi [username],</p> </br> <p>Welcome to <strong>[domainname]</strong>! Your account has been successfully created.</p> </br> If you have any questions or need assistance, feel free to reach out to our support team.</p> </br> <p>Best regards,</p><p><strong>[domainname]</strong> Team</p>",
  },
  RESET_PASSWORD: {
    type: "Reset Password",
    variables: ["username", "password", "loginLink"],
    template: `<p>Hi [username],</p>
        <p>Your password has been successfully changed to <strong>[password]</strong>.</p>
        <p>You can log in using the following link: [loginLink].</p>
        <p>If you did not initiate this change, please contact our support team immediately to secure your account.</p>
        <p>If you have any questions or need assistance, feel free to reach out.</p>
        <p>Best regards,</p>
        <div class="-ml-[1px] text-lg font-medium line-clamp-1"><strong>[domainname]</strong> Team</div>`,
  },

  FORGOT_PASSWORD: {
    type: "Forgot Password",
    variables: ["username", "otp", "resetLink"],
    template:
      '<p>Hi [username],</p> <p>It looks like you requested to reset your password. Use the following OTP (One-Time Password) to verify your identity and reset your password.</p> <h4>Your OTP:</h4> <h1><strong>[otp]</strong></h1> <p>Alternatively, you can reset your password by clicking the link below:</p> <p>[resetLink]</p> <p>If you did not request a password reset, please ignore this email or contact our support team immediately.</p> <p>Best regards,</p> <div class="-ml-[1px] text-lg font-medium line-clamp-1"><strong>[domainname]</strong> Team</div>',
  },

  OTP: {
    type: "OTP",
    variables: ["username", "otp"],
    template:
      '<p>Hi [username],</p> <p>We received a request to verify your email during registration. Please use the following One-Time Password (OTP) to complete the process:</p> </br> <h4>Your OTP:</h4> <h1><strong>[otp]</strong></h1> </br> <p>This OTP is valid for a limited time. If you didn’t initiate this request, please ignore this message.</p> </br> <p>Best regards,</p> <div class="-ml-[1px] text-lg font-medium line-clamp-1"><strong>[domainname]</strong> Team</div>',
  },
};
