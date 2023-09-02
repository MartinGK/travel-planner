import Card from "../../components/Card";
import Layout from "../layout";
import SomethingWrong from './SomethingWrong';


export default function ErrorPage() {
  return (
    <Layout>
      <Card>
        <SomethingWrong />
      </Card>
    </Layout>
  );
}
