 import { Card, Tabs, Descriptions, Divider, Collapse, Button,Table } from "antd";
 import axios from "axios";
 import React from "react";
 import { useParams } from "react-router"; 
 import { useNavigate } from "react-router-dom";

function ProtocolList(){

    const dataSource = [{"id":1,"name":"PTSD A1",
    "condition":"",
    "surveysAmount":"3",
    "surveysTypes":"3",
    "date":"29.1.2022"},
    {"id":2,
    "name":"Anxiety Ver X2",
    "condition":"",
    "surveysAmount":"6",
    "surveysTypes":"5",
    "date":"29.1.2022"},
    {"id":3,"name":"ADHD main",
    "condition":"",
    "surveysAmount":"2",
    "surveysTypes":"2",
    "date":"29.1.2022"}];
    ;
      
      const columns = [
        {
        
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Number Of Survey',
          dataIndex: 'surveysAmount',
          key: 'surveysAmount',
        },
      {
        title: 'Date Created',
        dataIndex: 'date',
        key: 'date',
      },
    ];
      // const navigate = useNavigate();
      const { REACT_APP_API_URL } = process.env;
    
      const [protocolList, setProtocolList] = React.useState([]); //this is for when we do the fetch from backend
      React.useEffect(() => {
        const token = localStorage.getItem("token");
        axios
          .get(`${REACT_APP_API_URL}api/clinic/protocols`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((data) => {
            // var newProtocolList=data.data.protocols;
            // var formattedProtocolList=newProtocolList.map((protocol,index) =>{return {"key":index+1,...protocol}});
            // console.log(formattedProtocolList);
            setProtocolList(data.data.protocols);
          });
      }, []);
    return (   <div>
      <Button type="primary" onClick={() => null
        // navigate("/add/protocol")
        }>
Add Protocol
    </Button>
    <Table dataSource={protocolList} columns={columns} />
    </div>
    
    )
      
    
}

  
 
export default ProtocolList;

