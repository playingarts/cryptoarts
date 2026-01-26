import { withApollo } from "../source/apollo";
import ParticipatePage from "@/components/Pages/ParticipatePage";

export default withApollo(ParticipatePage, { ssr: false });
