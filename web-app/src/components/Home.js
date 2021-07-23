import { QueryClient, QueryClientProvider } from "react-query";
import CommentaryProvider from "../contexts/commentary";
import CommonContextProvider from "../contexts/Common";
import DictonaryContextProvider from "../contexts/dictonary";
import Header from "./Header";
import VerticalTabs from "./VerticalTabs";

const queryClient = new QueryClient();

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CommonContextProvider>
        <CommentaryProvider>
          <DictonaryContextProvider>
            <Header />
            <VerticalTabs />
          </DictonaryContextProvider>
        </CommentaryProvider>
      </CommonContextProvider>
    </QueryClientProvider>
  );
}
export default Home;
