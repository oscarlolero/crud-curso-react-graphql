import {gql} from "@apollo/client";

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
