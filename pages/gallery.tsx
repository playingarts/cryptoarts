import { withApollo } from "../source/apollo";
import GalleryPage from "@/components/Pages/GalleryPage";

export default withApollo(GalleryPage, { ssr: false });
