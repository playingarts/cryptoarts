import { withApollo } from "../source/apollo";
import PressPage from "@/components/Pages/PressPage";

export default withApollo(PressPage, { ssr: false });
