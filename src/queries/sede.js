import gql from 'graphql-tag';

export default gql`
query sede($id: ID!){
    sede(id: $id){
      id  
      nombre
      abreviatura
      logo
      categoria{
          id
          nombre
      }
      carreras{
          id
          nombre
      }
    }
}
`;