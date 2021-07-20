import { QueryClient, QueryClientProvider } from 'react-query';
import CommentaryProvider from '../contexts/commentary';
import CommonContextProvider from '../contexts/Common';
import Header from "./Header";
import VerticalTabs from "./VerticalTabs";

const queryClient = new QueryClient()

function Home() {
	return (
		<QueryClientProvider client={queryClient}>
		<CommonContextProvider>
		<CommentaryProvider>
				<Header />
				<VerticalTabs />
			</CommentaryProvider>
		</CommonContextProvider>
		</QueryClientProvider>
	);
}
export default Home;
