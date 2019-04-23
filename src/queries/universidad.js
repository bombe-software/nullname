import gql from 'graphql-tag';

export default gql`

query universidad($id: ID!){
    universidad(id: $id){
        id,
    		nombre,
    		abreviatura,
    		logo,
				sede{
          id,
          nombre,
          id,
          abreviatura,
          logo,
          categoria{
            id,
            nombre
          }
        }
    }
}
`;