import { withApollo } from "../source/apollo";
import ReviewsPage from "@/components/Pages/ReviewsPage";

export default withApollo(ReviewsPage, { ssr: false });
