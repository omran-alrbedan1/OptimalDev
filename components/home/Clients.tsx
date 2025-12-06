import Header from "@/components/Header";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const Clients = async ({ clients }: { clients: ClientsResponse }) => {
  return (
    <div className="rounded-md flex flex-col pb-10 antialiased bg-white dark:bg-darkMod-700  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden -mt-12">
      <Header
        title={clients?.section?.title}
        paragraph={clients?.section?.description}
      />
      <InfiniteMovingCards
        items={clients.data}
        direction="right"
        speed="fast"
      />
    </div>
  );
};

export default Clients;
