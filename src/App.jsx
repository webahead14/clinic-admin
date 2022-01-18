import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Layout, Menu } from "antd";
import {
  ApartmentOutlined,
  TeamOutlined,
  FileOutlined,
  UserOutlined,
  FundOutlined,
} from "@ant-design/icons";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ClientList from "./pages/ClientList";
import ProtocolList from "./pages/ProtocolList";
import SurveyList from "./pages/SurveyList";
import AddClient from "./pages/AddClient";
import AddProtocol from "./pages/AddProtocol";
import AddSurvey from "./pages/AddSurvey";
import ClientPage from "./pages/ClientPage";
import ProtocolPage from "./pages/ProtocolPage";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);

  // Just an axios example
  // useEffect(() => {
  //   axios.get(url)
  //     .then((res) => {
  //       res.data <- no need to JSON.parse the response
  //     })
  //     .catch()
  //
  //   axios.post(url, { body: {} }) <- no need to JSON.stringify the body
  //     .then((res) => {
  //       res.data
  //     })
  //     .catch()
  // }, [])

  if (location.pathname === "/login") {
    return <Login />;
  }

  // To change the color of the dark mode refer to the craco.config.js file
  return (
    <Layout dir="ltr">
      <Header className="header">
        <div>
          <h2 style={{ color: "white", margin: "0 10px 0 -30px" }}>
            Clinic admin
          </h2>
        </div>
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Tab 1</Menu.Item>
        <Menu.Item key="2">Tab 2</Menu.Item>
        <Menu.Item key="3">Tab 3</Menu.Item>
      </Menu> */}
      </Header>
      <Layout className="site-layout" style={{ minHeight: "90vh" }}>
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Sider collapsible collapsed={collapse} onCollapse={setCollapse}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item
              key="1"
              onClick={() => navigate("/")}
              icon={<FundOutlined />}
              style={{ marginTop: 0 }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => navigate("/clients")}
              icon={<TeamOutlined />}
              style={{ marginTop: 0 }}
            >
              Client list
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => navigate("/protocols")}
              icon={<ApartmentOutlined />}
            >
              Protocol list
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => navigate("/surveys")}
              icon={<FileOutlined />}
            >
              Survey list
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ margin: "0 16px" }}>
          <div style={{ paddingTop: "10px", minHeight: 360 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clients" element={<ClientList />} />
              <Route path="/surveys" element={<SurveyList />} />
              <Route path="/protocols" element={<ProtocolList />} />
              <Route path="/add/protocol" element={<AddProtocol />} />
              <Route path="/add/survey" element={<AddSurvey />} />
              <Route path="/add/client" element={<AddClient />} />
              <Route path="/client/:id" element={<ClientPage />} />
              <Route path="/protocol/:id" element={<ProtocolPage />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
