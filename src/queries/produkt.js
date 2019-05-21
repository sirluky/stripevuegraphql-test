import { gql } from 'graphql-tag';

export const PRODUCT_QUERY = gql`
  {
    produkty {
      id
      nazev
      cena
      kategorie
    }
  }
`;
