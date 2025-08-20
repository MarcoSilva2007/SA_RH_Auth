export class User {
  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public senha: string
  ) {}

  // OBJ to JSON
  public toMap(): { [key: string]: any } {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };
  }

  // JSON to OBJ
  static fromMap(map: any): User {
    return new User(
      map.id,
      map.nome,
      map.email,
      map.senha
    );
  }
}
