import { withApollo } from "../source/apollo";
import PrivacyPage from "@/components/Pages/PrivacyPage";

export default withApollo(PrivacyPage, { ssr: false });
