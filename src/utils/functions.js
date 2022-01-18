import { message } from "antd";

export const showMessage = (msg, msgType) => {
  switch (msgType) {
    case "success":
      message.success(msg);
      break;
    case "error":
      message.error(msg);
      break;
    case "warning":
      message.warning(msg);
      break;
    default:
      message.warning("Something not right!..");
  }
};

export const deleteItemByIndex = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1, array.length),
];
