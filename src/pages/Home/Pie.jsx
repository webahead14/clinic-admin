import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/charts";

const DemoPie = () => {
  const data = [
    {
      type: "ADHD",
      value: 27,
    },
    {
      type: "ADD",
      value: 25,
    },
    {
      type: "PTSD",
      value: 18,
    },
    {
      type: "WEIRDO",
      value: 15,
    },
    {
      type: "BET-HOON",
      value: 10,
    },
    {
      type: "IT'S OKAY",
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export default DemoPie;
