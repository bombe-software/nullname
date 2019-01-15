import gql from 'graphql-tag';

export default gql`
query Carrera2($id1: ID!, $id2: ID!){
  carrera2(id1: $id1, id2: $id2){
    id,
    nombre,
    sede{
      id,
      abreviatura,
      universidad{
        id,
        abreviatura
      }
    }
    materias{
      id,
      nombre,
      semestre,
      categoria{
        id,
        nombre
      }
    }
  }
}
`;