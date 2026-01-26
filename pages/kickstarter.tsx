import { withApollo } from "../source/apollo";
import KickstarterPage from "@/components/Pages/KickstarterPage";

export default withApollo(KickstarterPage, { ssr: false });
