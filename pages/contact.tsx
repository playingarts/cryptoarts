import { withApollo } from "../source/apollo";
import ContactPage from "@/components/Pages/ContactPage";

export default withApollo(ContactPage, { ssr: false });
