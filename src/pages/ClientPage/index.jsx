import style from "./style.module.css";
import options from "../../utils/allSurveys";
import { Card, Descriptions, Divider, Collapse } from "antd";

const { Panel } = Collapse;

const Client = {
  id: 2,
  name: "Julio Elias",
  govId: "2323984983953",
  condition:
    "George djsaofsanm fnsafansd saofn saofnas[d sando[a snd[fasnw sdnaspif naspidn aspfna spodna sfonasp odnsapofn sapond aspofnaspo nfason p",
  phone: "0543198210",
  email: "some@random.email",
  gender: "Male",
  treatment: {
    status: "on-going",
    startDate: "02-01-2022",
  },
  protocol: {
    name: "PTSD protocol A",
  },
  surveyProgress: [
    {
      isDone: true,
      isPartiallyDone: false,
      hasMissed: false,
      name: "Survey 1",
    },
    {
      isDone: false,
      isPartiallyDone: false,
      hasMissed: true,
      name: "Survey 2",
    },
    {
      isDone: false,
      isPartiallyDone: true,
      hasMissed: true,
      name: "Survey 2",
    },
  ],
};

function ClientPage(props) {
  // const [client, setClient] = React.useState({}); //this is for when we do the fetch from backend
  return (
    <div>
      <h1>ClientPage</h1>
      <Card>
        <Descriptions title="Patient Info">
          <Descriptions.Item label="ID">{Client.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{Client.name}</Descriptions.Item>
          <Descriptions.Item label="Government ID">
            {Client.govId}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">{Client.gender}</Descriptions.Item>
          <Descriptions.Item label="Phone">{Client.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{Client.email}</Descriptions.Item>
        </Descriptions>
        <Divider></Divider>

        <Descriptions title="Patient File">
          <Descriptions.Item label="Protocol" span="2">
            {Client.protocol.name}
          </Descriptions.Item>
          <Descriptions.Item>
            <Collapse
              style={{ position: "absolute", padding: "3px,16px" }}
              ghost
            >
              <Panel header="Treatment1">
                <p>Status: {Client.treatment.status}</p>
                <p>StartDate: {Client.treatment.startDate}</p>
              </Panel>
            </Collapse>
          </Descriptions.Item>
          <Descriptions.Item label="Condition" span="2">
            {Client.condition}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default ClientPage;
