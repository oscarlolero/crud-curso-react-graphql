import {gql} from "@apollo/client";
import {PERSON_DETAILS_FRAGMENT} from "./graphql-queries.js";

export const CREATE_PERSON = gql`
    mutation createPerson($name: String!, $street: String!, $city: String!, $age: Int!, $budget: Int!, $phone: String!) {
        addPerson(
            name: $name,
            street: $street,
            city: $city,
            age: $age,
            budget: $budget,
            phone: $phone
        ) {
            ...PersonDetails
        }
    }

    ${PERSON_DETAILS_FRAGMENT}
`

export const EDIT_NUMBER = gql`
    mutation editNumber($name: String!, $phone: String!) {
        editPhone(name: $name, phone: $phone) {
            name
            phone
            id
        }
    }
`
