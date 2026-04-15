import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrackPageView from "@/components/TrackPageView";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TrackPageView />
      <Header />
      <main className="flex-1 pt-25">{children}</main>
      <Footer />
    </>
  );
}
