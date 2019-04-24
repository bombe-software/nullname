import gql from 'graphql-tag';

export default gql`
{
    universidades{
     id,
     nombre,
      abreviatura,
      logo 
    }
}
`;