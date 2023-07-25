import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_PERSONS, FIND_PERSON } from "./graphql-queries";

export const usePerson = () => {
  const result = useQuery(ALL_PERSONS);
  return result;
};
