import {gql} from "@apollo/client";

export const PERSON_DETAILS_FRAGMENT = gql`
    fragment PersonDetails on Person {
        id
        name
        phone
        budget
        address {
            street
            city
        }
    }
`;

export const FIND_PERSON_BY_NAME = gql`
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
