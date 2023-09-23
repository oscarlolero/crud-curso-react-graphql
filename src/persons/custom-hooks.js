import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {ALL_PERSONS, FIND_PERSONS} from "./graphql-queries.js";
import {CREATE_PERSON, EDIT_NUMBER} from "./graphql-mutations.js";

export const usePersons = () => {
  console.log('refechting')
  // return useQuery(ALL_PERSONS)
  const {data, loading, error} = useQuery(ALL_PERSONS);

  if (error) {
    console.error(error)
  }
  return {data, loading, error};
};

export const useAddPerson = () => {

  const [createPerson, {data, loading, error}] = useMutation(CREATE_PERSON, {
    // refetchQueries asdasd: [{query: ALL_PERSONS}], //en lugar de llamar a refetch, se puede usar esta propiedad: "update" para actualizar el cache de apollo de forma manual
    update: (store, response) => { //esto es solo para optimizar, tener mucho cuidado con esto porque puede causar problemas si no se hace bien
      const dataInStore = store.readQuery({query: ALL_PERSONS});
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, response.data.addPerson]
        }
      });
    }
  });

  const addPerson = async ({name, street, city, age, budget, phone}) => {
    await createPerson({variables: {name, street, city, age, budget, phone}});
  };

  return {addPerson, data, loading, error};
};

export const useSearchPerson = () => {
  const [getPerson, result] = useLazyQuery(FIND_PERSONS);

  const {data, loading, error} = result;
  return {getPerson, data, loading, error};
};

export const useEditNumber = () => {

  const [modifyNumber, {data, loading, error}] = useMutation(EDIT_NUMBER);

  const editNumber = async (name, phone) => {
    await modifyNumber({variables: {name, phone}});
  };


  return {editNumber, data, loading, error};

};
