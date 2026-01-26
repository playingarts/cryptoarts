import { withApollo } from "../source/apollo";
import ArtistsPage from "@/components/Pages/ArtistsPage";

export default withApollo(ArtistsPage, { ssr: false });
