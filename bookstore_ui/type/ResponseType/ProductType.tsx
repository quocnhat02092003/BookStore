export type ProductType = {
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
  }[];
  counts?: number;
  message?: string;
  status?: number;
  totalPages: number;
};
