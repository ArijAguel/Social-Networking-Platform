export class UpdatePaswordDto {
    id=0
    password=""
    constructor(
      id=0,
      password=""
    ) {
      this.id = id
      this.password = password
    }
  }