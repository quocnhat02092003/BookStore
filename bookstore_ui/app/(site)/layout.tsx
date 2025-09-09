import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShipDetailHome from "@/components/features/home/ShipDetailHome";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <ShipDetailHome />
      <Footer />
    </>
  );
}
