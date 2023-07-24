import { gql } from "apollo-server";

const typeDefinitions = gql`
  type Days {
    nameDate: String!
    id: ID!
  }
  type Horario {
    hourStart: String!
    hourFinish: String!
    id: ID!
  }

  type Activity {
    name: String!
    hourStart: String!
    hourFinish: String!
    pileta: String
    userRegister: Int
    date: [String!]!
    users: [User]
    id: ID!
  }

  type User {
    nombre: String!
    telefono: String!
    telefonoContacto: String!
    edad: String!
    nombreTutor: String
    dniTutor: String
    email: String!
    password: String!
    role: String
    dni: String!
    sexo: String!
    barrio: String!
    qr: String
    foto: String!
    status: Boolean
    activity: [Activity]
    emailVerificationToken: String
    emailVerified: Boolean
    fichaMedica: String
    id: ID!
  }

  type Token {
    value: String!
    role: String!
  }

  type Query {
    userCount: Int!
    findHoursFromDay(date: String!): [Activity]
    getActivities: [Activity]!
    findUsersFromHour(
      date: String!
      hourStart: String!
      hourFinish: String!
    ): [Activity]
    findDat(name: String!): Days
    me: User
    findAllUsers: [User]!
    getHours: [Horario]!
  }

  type Mutation {
    createUser(
      nombre: String!
      telefono: String!
      telefonoContacto: String!
      edad: String!
      nombreTutor: String
      dniTutor: String
      email: String!
      password: String!
      dni: String!
      sexo: String!
      barrio: String!
      activity: String
      fichaMedica: String
      foto: String!
    ): User

    confirmAccount(token: String!): User

    createActivity(
      activity: String!
      hourStart: String!
      hourFinish: String!
      pileta: String!
      userRegister: Int!
      nameDate: [String]!
    ): Activity

    createHour(hourStart: String!, hourFinish: String!): Horario
    createDay(nameDate: String!): Days

    addUserFromActivity(id: String!): Activity

    login(email: String!, password: String!): Token
  }
`;

export default typeDefinitions;
