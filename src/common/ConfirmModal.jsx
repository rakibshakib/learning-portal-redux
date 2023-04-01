import { Popconfirm } from "antd";
import React from "react";

const ConfirmModal = ({ text, description, confirm, children }) => {
  return (
    <Popconfirm
      placement="topLeft"
      title={text || ""}
      description={description || ""}
      onConfirm={() => confirm?.()}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};

export default ConfirmModal;
