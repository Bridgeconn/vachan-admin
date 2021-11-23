import { QueryClient, QueryClientProvider } from "react-query";
import CommonContextProvider from "../contexts/Common";
import Header from "./Header";
import VerticalTabs from "./VerticalTabs";

const queryClient = new QueryClient();

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CommonContextProvider>
        <Header />
        <VerticalTabs />
      </CommonContextProvider>
    </QueryClientProvider>
  );
}
export default Home;
