import { withApollo } from "../source/apollo";
import PrivacyPage from "../new/Pages/PrivacyPage";

export default withApollo(PrivacyPage, { ssr: false });
