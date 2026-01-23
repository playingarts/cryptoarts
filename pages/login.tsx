import { withApollo } from "../source/apollo";
import LoginPage from "@/components/Pages/LoginPage";

export default withApollo(LoginPage, { ssr: false });
