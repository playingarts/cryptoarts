import { withApollo } from "../source/apollo";
import ARPage from "@/components/Pages/ARPage";

export default withApollo(ARPage, { ssr: false });
