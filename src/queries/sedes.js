import gql from 'graphql-tag';

export default gql`
{
    sedes{
      id,
      nombre,
      logo,
      abreviatura,
      categoria{
        id
        nombre
      },
      posicion,
      universidad{
        id,
        nombre,
        abreviatura
      }
    }
}
`;