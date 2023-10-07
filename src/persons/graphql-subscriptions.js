import {gql} from "@apollo/client";

const NEW_PERSON_ADDED = gql`
    subscription OnNewPersonAdded {
        subscription {
            personAdded {
                name
            }
        }
    }
`;
