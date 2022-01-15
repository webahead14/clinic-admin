import style from "./style.module.css";
import "./style.css";
import { Form, Input, Button, Select } from "antd";
import { showMessage } from "../../utils/functions";
import { useState, useEffect } from "react";

const { Option } = Select;

function AddSurvey() {
  const [answers, setAnswers] = useState("");
  const [submitedAnswers, setSubmitedAnswers] = useState([]);

  return (
    <div className={style.addSurvey}>
      <Form
        name="addSurvey"
        onFinishFailed={(e) => {
          console.log(e);
          alert("Failed to submit");
        }}
        onFinish={(e) => {
          console.log("finish", e);
        }}
      >
        <Form.Item
          label="Survey name"
          name="name"
          onChange={(e) => console.log(e.target.value)}
          rules={[
            { required: true, message: "Please enter a name for the survey" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Question type:"
          name="questionType"
          rules={[{ required: true, message: "Please Choose a question type" }]}
        >
          <Select style={{ width: 150 }} onChange={(e) => console.log(e)}>
            <Option value="matrix">Matrix</Option>
            <Option value="multiple_choice">Multiple Choice</Option>
            <Option value="open_text">Open Text</Option>
          </Select>
        </Form.Item>

        <div className={style.matrixFormat}>
          Matrix format:
          <Form.Item
            label="Instructions:"
            name="instructions"
            onChange={(e) => console.log(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please enter instructions text for the matrix",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Title:"
            name="title"
            onChange={(e) => console.log(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please enter a title for the matrix",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {submitedAnswers.length ? (
            <Form.Item label="Answers" name="submittednswers">
              <Select
                mode="multiple"
                disabled
                style={{ width: "100%" }}
                defaultValue={submitedAnswers}
              ></Select>
            </Form.Item>
          ) : null}
          <Form.Item
            label="Answers:"
            name="answers"
            onChange={(e) => setAnswers(e.target.value)}
            rules={[
              {
                required: true,
                message:
                  "Please enter an answer as an option for each question in the matrix",
              },
            ]}
          >
            <Input placeholder="e.g. Poorly Semi-Poorly Avarage Semi-Strongly Strongly" />
          </Form.Item>
          <Button
            onClick={() => {
              setSubmitedAnswers(answers.split(" "));
            }}
          >
            Set Answers
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddSurvey;
