import { withApollo } from "../source/apollo";
import StatusPage from "@/components/Pages/Status";

export default withApollo(StatusPage, { ssr: false });
