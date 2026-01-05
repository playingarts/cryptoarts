import { withApollo } from "../source/apollo";
import ContactPage from "../new/Pages/ContactPage";

export default withApollo(ContactPage, { ssr: false });
