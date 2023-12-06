import { useParams } from "react-router-dom";
import Head from "../../../components/head"
import PageLayout from "../../../components/page-layout"

const AboutProductPage = () => {
    const { itemId } = useParams();
    return (
        <PageLayout>
            <Head title={itemId} />

        </PageLayout>
    )
}

export default AboutProductPage