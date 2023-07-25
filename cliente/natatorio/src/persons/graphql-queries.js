import { gql } from "@apollo/client";

export const PERSON_DETAILS_FRAGMENT = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`;

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS_FRAGMENT}
`;

export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }

  ${PERSON_DETAILS_FRAGMENT}
`;
export const ALL_HOURS = gql`
  query {
    getHours {
      hourStart
      hourFinish
    }
  }
`;
export const GET_ACTIVITY_FROM_HOUR = gql`
  query ($date: String!) {
    findHoursFromDay(date: $date) {
      name
      userRegister
    }
  }
`;
export const GET_ACTIVITY = gql`
  query {
    getActivities {
      name
      userRegister
      pileta
      date
      hourStart
      id
    }
  }
`;
export const GET_USER_INFO = gql`
  query {
    me {
      nombre
      qr
      status
      foto
      activity {
        name
        hourStart
        hourFinish
        date
      }
    }
  }
`;
