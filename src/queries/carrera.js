import gql from 'graphql-tag';

export default gql`
query carrera($id: ID!){
    carrera(id: $id){
        id
        nombre
        categoria{
            id
            nombre
        }
        semestres
        materias{
            id
            nombre
        }
    }
}
`;