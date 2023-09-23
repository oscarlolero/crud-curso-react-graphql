import {gql} from "@apollo/client";

export const FIND_PERSONS = gql`
    query findPersonByName($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
            id
            name
            phone
            budget
            address {
                street
                city
            }
        }
    }
`;

export const ALL_PERSONS = gql`
    query {
        allPersons {
            id
            name
            phone
            budget
            address {
                street
                city
            }
        }
    }
`;
