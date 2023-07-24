import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation (
    $nombre: String!
    $telefono: String!
    $telefonoContacto: String!
    $edad: String!
    $email: String!
    $password: String!
    $dni: String!
    $sexo: String!
    $barrio: String!
    $foto: String!
  ) {
    createUser(
      nombre: $nombre
      telefono: $telefono
      telefonoContacto: $telefonoContacto
      edad: $edad
      email: $email
      password: $password
      dni: $dni
      sexo: $sexo
      barrio: $barrio
      foto: $foto
    ) {
      email
      emailVerificationToken
      emailVerified
      dni
    }
  }
`;

//para que se sincronise el cambio debemos pasarle el id del objeto a cambiar, y a su vez lo que cambiamos

export const EDIT_NUMBRE = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      id
    }
  }
`;
export const CONFIRM = gql`
  mutation confirmAccount($token: String!) {
    confirmAccount(token: $token) {
      nombre
      emailVerificationToken
      emailVerified
    }
  }
`;
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      value
      role
    }
  }
`;
export const REGISTER_FROM_ACTIVITY = gql`
  mutation addUserFromActivity($addUserFromActivityId: String!) {
    addUserFromActivity(id: $addUserFromActivityId) {
      name
      id
      userRegister
    }
  }
`;
