# BookStore

A full-stack e-commerce bookstore application built with modern technologies.

## 🚀 Tech Stack

### Frontend (bookstore_ui)

- **Next.js 15** with React 19 & TypeScript
- **Tailwind CSS 4** for styling
- **Radix UI** for accessible UI components
- **Stripe** for payment processing
- **Axios** for HTTP requests
- **Swiper** for carousels
- **Recharts** for data visualization
- **Notistack** & **Sonner** for notifications
- **Motion** for animations

### Backend (bookstore_sv)

- **ASP.NET Core** (.NET 9) Web API
- **Entity Framework Core 9** for ORM
- **MySQL** database (Pomelo provider)
- **JWT** for authentication
- **BCrypt** for password hashing
- **Stripe.net** for payment integration
- **Rate Limiting** for API protection

## 📁 Project Structure

```
BookStore/
├── bookstore_ui/          # Next.js Frontend
│   ├── app/
│   │   ├── (auth)/        # Authentication pages (login, register)
│   │   ├── (site)/        # Main site pages
│   │   │   ├── shop/      # Product listings
│   │   │   ├── product/   # Product details
│   │   │   ├── cart/      # Shopping cart
│   │   │   ├── checkout/  # Checkout flow
│   │   │   ├── my-account/# User account
│   │   │   └── ...
│   │   └── admin/         # Admin dashboard
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers
│   ├── service/           # API service functions
│   └── type/              # TypeScript types
│
└── bookstore_sv/          # ASP.NET Core Backend
    ├── Controllers/       # API endpoints
    ├── Data/              # Database context
    ├── DTOs/              # Data transfer objects
    ├── Models/            # Entity models
    ├── Migrations/        # EF Core migrations
    └── Service/           # Business logic services
```

## ✨ Features

- 🔐 **Authentication** - Register, Login, JWT token refresh with secure cookies
- 📚 **Product Catalog** - Browse books by category, search, pagination
- 🛒 **Shopping Cart** - Add/remove items, quantity management
- 💳 **Stripe Checkout** - Secure payment processing
- 📦 **Order Management** - Order history, order tracking
- 👤 **User Account** - Profile management, billing/shipping addresses
- 🔍 **Search** - Search products by title, author
- 👑 **Admin Dashboard** - Manage products, orders, users
- 📱 **Responsive Design** - Mobile-friendly UI

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- .NET 9 SDK
- MySQL Server
- Stripe Account (for payments)

### Frontend Setup (bookstore_ui)

```bash
cd bookstore_ui

# Install dependencies
npm install

# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:5000
# NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Start development server
npm run dev
```

### Backend Setup (bookstore_sv)

```bash
cd bookstore_sv

# Restore packages
dotnet restore

# Configure user secrets for sensitive data
dotnet user-secrets set "Jwt:SecretKey" "your-secret-key"
dotnet user-secrets set "StripeAPIKey" "your-stripe-secret-key"

# Update database
dotnet ef database update

# Run the server
dotnet run
```

## 📜 Available Scripts

### Frontend

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

### Backend

| Script                            | Description          |
| --------------------------------- | -------------------- |
| `dotnet run`                      | Start the API server |
| `dotnet ef migrations add <name>` | Create migration     |
| `dotnet ef database update`       | Apply migrations     |

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Products

- `GET /api/product/all-products` - Get all products (paginated)
- `GET /api/product/category/{category}` - Get products by category
- `GET /api/product/{id}` - Get product details

### Cart

- `GET /api/cart/all-cart` - Get user's cart
- `POST /api/cart/add-to-cart` - Add item to cart
- `PUT /api/cart/update-quantity` - Update item quantity
- `DELETE /api/cart/remove-item` - Remove item from cart

### Orders

- `POST /api/order/create-orders` - Create order from cart
- `GET /api/order/all-orders` - Get user's orders

### Checkout (Stripe)

- `POST /api/checkoutstripe/save-address-billing-checkout` - Save billing address
- `POST /api/checkoutstripe/create-checkout-session` - Create Stripe session

### Admin

- `GET /api/admin/all-products-no-pagination` - Get all products (admin)
- `GET /api/admin/all-orders` - Get all orders (admin)
- `GET /api/admin/all-users` - Get all users (admin)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

---

Made with ❤️ by [quocnhat02092003](https://github.com/quocnhat02092003)
=======
Thread
>>>>>>> c1990d94cf30c7316dab1c6fee4309dcda3c4144
