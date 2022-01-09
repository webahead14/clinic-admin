import style from "./style.module.css";
import "./style.css";
import axios from "axios";
import React from "react";
import { Card, Tabs, Descriptions, Divider, Collapse } from "antd";
import {
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

const { TabPane } = Tabs;



function ClientPage(props) {
  const [client, setClient] = React.useState({}); //this is for when we do the fetch from backend
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/api/clinic/client/1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setClient((client) => (client = data.data));
      });
  }, []);

  const tabsArray = new Array(8).fill((props) => (
    <TabPane {...props}>{props.children}</TabPane>
  ));

  return JSON.stringify(client) !== "{}" ? (
    <div>
      <h1>ClientPage</h1>
      <Card>
        <Descriptions title="Patient Info">
          <Descriptions.Item label="ID">{client.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{client.name}</Descriptions.Item>
          <Descriptions.Item label="Government ID">
            {client.govId}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">{client.gender}</Descriptions.Item>
          <Descriptions.Item label="Phone">{client.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{client.email}</Descriptions.Item>
        </Descriptions>

        <Divider></Divider>

        <Descriptions title="Patient File">
          <Descriptions.Item label="Protocol" span="2">
            {client.protocol.name}
          </Descriptions.Item>
          <Descriptions.Item>
            <Collapse style={{}} ghost>
              <Panel
                header="Treatment"
                style={{ padding: 0 }}
                className={style.test}
              >
                <div style={{ position: "absolute" }}>
                  <p>StartDate: {client.treatment.startDate.split("T")[0]}</p>
                  <p>Status: {client.treatment.status}</p>
                </div>
              </Panel>
            </Collapse>
          </Descriptions.Item>
          <Descriptions.Item label="Condition" span="2">
            {client.condition}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Survey</Divider>

        <Tabs defaultActiveKey="1">
          {tabsArray.map((Element, index) => {
            return (
              <Element tab={`Week ${index + 1}`} key={`${index + 1}`}>
                <Descriptions>
                  {client.surveyProgress
                    ? client.surveyProgress
                      .map((element, idx) => {
                        if (element.week === index + 1) {
                          return (
                            <Descriptions.Item key={idx}>
                              <Collapse
                                accordion="true"
                                style={{ padding: "3px,16px" }}
                                ghost
                              >
                                <Panel header={element.name}>
                                  <div>
                                    Has finished: &nbsp;
                                    {element.isDone ? (
                                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    ) : element.isPartiallyDone ? (
                                      <LoadingOutlined />
                                    ) : (
                                      <CloseCircleTwoTone twoToneColor="#fc6161" />
                                    )}
                                  </div>
                                  <div>
                                    Did not finish: &nbsp;
                                    {element.hasMissed ? (
                                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    ) : (
                                      <CloseCircleTwoTone twoToneColor="#fc6161" />
                                    )}
                                  </div>
                                </Panel>
                              </Collapse>
                            </Descriptions.Item>
                          );
                        } else {
                          return null;
                        }
                      })
                      .filter((x) => x)
                    : null}
                </Descriptions>
              </Element>
            );
          })}
        </Tabs>
      </Card>
    </div>
  ) : null;
}

export default ClientPage;