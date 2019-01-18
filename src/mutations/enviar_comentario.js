import gql from 'graphql-tag';

export default gql`
mutation add_bug($comentario: String,$estrellas:Float){
  add_bug(comentario: $comentario, estrellas: $estrellas){
    id
  }
  
}
`;