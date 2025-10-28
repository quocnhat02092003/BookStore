export type CartType = {
  data: CartItemType;
  message: string;
  status: number;
};

export type CartItemType = {
  cartItems: {
    id: string;
    cart_id: string;
    product_id: string;
    quantity: number;
    product: {
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
    };
  }[];
  created_at: string;
  updated_at: string;
  id: string;
};
