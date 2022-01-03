import style from "./style.module.css";
import options from "../../utils/allSurveys";
import { Card, Descriptions, Divider } from "antd";

function ClientPage(props) {
  return (
    <div>
      <h1>ClientPage</h1>
      <Card>
        <Descriptions title="User Info"></Descriptions>
      </Card>
    </div>
  );
}

export default ClientPage;
