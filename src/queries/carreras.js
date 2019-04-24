import gql from 'graphql-tag';

export default gql`
{
  carreras{
    id,
    nombre
    sede{
      id
      abreviatura,
      universidad{
        id,
        abreviatura
      }
    }
  }
}


`;