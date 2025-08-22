export class LoginDto {
    email=""
    password=""
    recaptchaToken="" // Add this field

    constructor(
      email="",
      password="",
      recaptchaToken=""
    ) {
      this.email = email
      this.password = password
      this.recaptchaToken = recaptchaToken
    }
  }