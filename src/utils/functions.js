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
