import { withApollo } from "../source/apollo";
import PodcastPage from "@/components/Pages/PodcastPage";

export default withApollo(PodcastPage, { ssr: false });
