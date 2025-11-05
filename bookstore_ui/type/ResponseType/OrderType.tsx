export type OrderType = {
  data: {
    order_id: string;
    payment_method: string;
    total_price: number;
    created_at: string;
    status: string;
    user_id: string;
    updated_at: string;
    orderItems: OrderItemType[];
  }[];
  message: string;
  status: number;
};

export type OrderItemType = {
  id: string;
  order_id: string;
  price: number;
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
};
