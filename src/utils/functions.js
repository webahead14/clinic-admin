import { message } from 'antd';

export const showError = (err) => {
  message.error(err.message);
};
