import style from "./style.module.css";
import "./style.css";
import { Form, Input, Button, Select, Radio } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { showMessage, deleteItemByIndex } from "../../utils/functions";
import { addSurvey } from "../../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { Component }  from 'react';

const { Option } = Select;
const { TextArea } = Input;

function AddSurvey() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [survey, setSurvey] = useState("");
  const [data, setData] = useState({ survey: "", questions: [] });
  const [submitted, setSubmitted] = useState(0);

  useEffect(() => {
    if (submitted) {
      addSurvey(data)
        .then((res) => {
          showMessage(res.data, "success");
          navigate("/surveys");
        })
        .catch((err) => {
          showMessage(err.response.data.message, "error");
        });
    }
  }, [data]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  return (
    <div className={style.addSurvey}>
      <Form
        name="addSurvey"
        onFinishFailed={() => {
          showMessage(
            "Failed to submit, Please fill the empty fields",
            "error"
          );
        }}
        onFinish={(e) => {
          let surveyQuestions = [];
          questions.forEach((q, idx) => {
            if (q.type === "matrix") {
              q.multipleChoice = null;
              q.matrixFormat.columns.map((column, idx) =>
                q.matrixFormat.answers.push(idx.toString())
              );
              const listOfQuestions = q.matrixFormat.matrixQuestions;
              delete q.matrixFormat.matrixQuestions;
              listOfQuestions.forEach((matQuestion) =>
                surveyQuestions.push({ ...q, question: matQuestion })
              );
            }
            if (q.type === "multiple_choice") {
              q.matrixFormat = null;
              surveyQuestions.push(q);
            }
            if (q.type === "open_text") {
              q.matrixFormat = null;
              q.multipleChoice = null;
              surveyQuestions.push(q);
            }
          });
          setSubmitted(true);
          setData({ survey: survey, questions: surveyQuestions });
        }}
      >
        <Form.Item
          label="Survey name"
          name="survey"
          onChange={(e) => setSurvey(e.target.value)}
          rules={[
            { required: true, message: "Please enter a name for the survey" },
          ]}
        >
          <Input />
        </Form.Item>
        {questions.map((question, idx) => {
          return (
            <Form.Item name={idx} key={idx}>
              <Form.Item
                label="Question type:"
                name={[idx, "type"]}
                rules={[
                  { required: true, message: "Please Choose a question type" },
                ]}
              >
                <Select
                  style={{ width: 150 }}
                  onChange={(questionType) => {
                    questions[idx].type = questionType;
                    if (questionType === "matrix") {
                      questions[idx].group = idx;
                    }
                    setQuestions([...questions]);
                  }}
                >
                  <Option value="matrix">Matrix</Option>
                  <Option value="multiple_choice">Multiple Choice</Option>
                  <Option value="open_text">Open Text</Option>
                </Select>
              </Form.Item>
              {question.type && question.type !== "matrix" ? (
                <Form.Item
                  label="Question:"
                  name={[idx, "question"]}
                  onChange={(q) => {
                    questions[idx].question = q.target.value;
                    setQuestions([...questions]);
                  }}
                  rules={[
                    { required: true, message: "Please enter a question" },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : null}

              {questions[idx].type === "multiple_choice" ? (
                <Form.Item name={"multipleChoice" + idx.toString()}>
                  <Form.Item
                    label="Type:"
                    name={[idx, "choiceType"]}
                    onChange={(qType) => {
                      questions[idx].multipleChoice.choiceType =
                        qType.target.value;
                      setQuestions([...questions]);
                    }}
                    rules={[
                      { required: true, message: "Please choose a type" },
                    ]}
                  >
                    <Radio.Group name="options" defaultValue={1}>
                      <Radio value="Radio">Radio</Radio>
                      <Radio value="Checkbox">Checkbox</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.List
                    name={[idx, "answers"]}
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 2) {
                            return Promise.reject(
                              new Error("Enter At least 2 options")
                            );
                          }
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            {...(index === 0
                              ? formItemLayout
                              : formItemLayoutWithOutLabel)}
                            label={index === 0 ? "Answers:" : ""}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Please input an answer or delete this field.",
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                placeholder="Enter an answer/option"
                                style={{ width: "60%" }}
                                onChange={(answer) => {
                                  questions[idx].multipleChoice.answers[index] =
                                    { text: answer.target.value };
                                  setQuestions([...questions]);
                                }}
                              />
                            </Form.Item>
                            {fields.length > 1 ? (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => {
                                  remove(field.name);
                                  questions[idx].multipleChoice.answers =
                                    deleteItemByIndex(
                                      questions[idx].multipleChoice.answers,
                                      index
                                    );
                                  setQuestions([...questions]);
                                }}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                              questions[idx].multipleChoice.answers.push("");
                            }}
                            style={{ width: "fit-content" }}
                            icon={<PlusOutlined />}
                          >
                            Add Answers
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              ) : null}

              {questions[idx].type === "matrix" ? (
                <Form.Item name={"matrix" + idx.toString()}>
                  <Form.Item
                    label="Instructions:"
                    name={[idx, "instructions"]}
                    onChange={(instructions) => {
                      questions[idx].matrixFormat.instructions =
                        instructions.target.value;
                      setQuestions([...questions]);
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please fill the instructions for this matrix",
                      },
                    ]}
                  >
                    <TextArea placeholder="Insturctions.." />
                  </Form.Item>
                  <Form.Item
                    label="Title:"
                    name={[idx, "title"]}
                    onChange={(title) => {
                      questions[idx].matrixFormat.title = title.target.value;
                      setQuestions([...questions]);
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter a title for the matrix",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.List
                    name={[idx, "matrixQuestions"]}
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 1) {
                            return Promise.reject(
                              new Error("Enter At least 1 question")
                            );
                          }
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            {...(index === 0
                              ? formItemLayout
                              : formItemLayoutWithOutLabel)}
                            label={index === 0 ? "Matrix Questions:" : ""}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Please input a question or delete this field.",
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                placeholder="Enter an question for the matrix.."
                                style={{ width: "60%" }}
                                onChange={(question) => {
                                  questions[idx].matrixFormat.matrixQuestions[
                                    index
                                  ] = question.target.value;
                                  setQuestions([...questions]);
                                }}
                              />
                            </Form.Item>
                            {fields.length > 1 ? (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => {
                                  remove(field.name);
                                  questions[idx].matrixFormat.matrixQuestions =
                                    deleteItemByIndex(
                                      questions[idx].matrixFormat
                                        .matrixQuestions,
                                      index
                                    );
                                  setQuestions([...questions]);
                                }}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                              questions[idx].matrixFormat.matrixQuestions.push(
                                ""
                              );
                            }}
                            style={{ width: "fit-content" }}
                            icon={<PlusOutlined />}
                          >
                            Add Matrix Question
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.List
                    name={[idx, "columns"]}
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 2) {
                            return Promise.reject(
                              new Error("Enter At least 2 options")
                            );
                          }
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            {...(index === 0
                              ? formItemLayout
                              : formItemLayoutWithOutLabel)}
                            label={index === 0 ? "Matrix Answers:" : ""}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Please input an answer or delete this field.",
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                placeholder="Enter an answer/option for each question"
                                style={{ width: "60%" }}
                                onChange={(answer) => {
                                  questions[idx].matrixFormat.columns[index] = {
                                    text: answer.target.value,
                                  };
                                  setQuestions([...questions]);
                                }}
                              />
                            </Form.Item>
                            {fields.length > 1 ? (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => {
                                  remove(field.name);
                                  questions[idx].matrixFormat.columns =
                                    deleteItemByIndex(
                                      questions[idx].matrixFormat.columns,
                                      index
                                    );
                                  setQuestions([...questions]);
                                }}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                              questions[idx].matrixFormat.columns.push("");
                            }}
                            style={{ width: "fit-content" }}
                            icon={<PlusOutlined />}
                          >
                            Add Answers
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              ) : null}
            </Form.Item>
          );
        })}
        <Form.Item>
          <Button
            type="dashed"
            onClick={() =>
              setQuestions([
                ...questions,
                {
                  type: "",
                  question: "",
                  group: null,
                  matrixFormat: {
                    title: "",
                    columns: [],
                    answers: [],
                    instructions: "",
                    matrixQuestions: [],
                  },
                  multipleChoice: {
                    choiceType: "",
                    answers: [], //[{ text: "answer1" },..]
                  },
                },
              ])
            }
            style={{ width: "fit-content" }}
            icon={<PlusOutlined />}
          >
            Add Question
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddSurvey;
