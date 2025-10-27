import { ProductType } from "./ProductType";

export interface ProductInformationType extends ProductType {
  productInformation: {
    description: string;
    publishers: string[];
    publish_date: string;
    number_of_pages: number;
    isbn_13: string[];
    subjects: string[];
  };
  author: {
    author_key: string;
    name: string;
  };
  productSummary: {
    id: string;
    product_id: string;
    average: number;
    count: number;
    sortable: number;
  };
  productCount: {
    id: string;
    product_id: string;
    want_to_read: number;
    currently_reading: number;
    already_read: number;
  };
}

export type ProductInformationResponseType = {
  data: {
    product_id: string;
    type: string;
    cover: number;
    author_key: string[];
    title: string;
    first_publish_year: number;
    cover_edition_key: string;
    price: number;
    category: string;
    quantity_in_stock: number;
    authors: [
      {
        author_key: string;
        name: string;
      }
    ];
    productInformation: {
      description: string;
      publishers: string[];
      publish_date: string;
      number_of_pages: number;
      isbn_13: string[];
      subjects: string[];
    };
    author: {
      author_key: string;
      name: string;
    };
    productSummary: {
      id: string;
      product_id: string;
      average: number;
      count: number;
      sortable: number;
    };
    productCount: {
      id: string;
      product_id: string;
      want_to_read: number;
      currently_reading: number;
      already_read: number;
    };
  };
};
