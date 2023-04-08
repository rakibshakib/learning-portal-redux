import React from "react";
import { Modal } from "antd";

const ViewModal = ({
  width,
  height,
  setVisible,
  children,
  title,
  onCancel,
  open,
  onOk,
}) => {
  return (
    <>
      <Modal
        title={title}
        centered={true}
        open={open}
        onOk={onOk}
        onCancel={() => (onCancel ? onCancel() : setVisible(false))}
        width={width || 1000}
        bodyStyle={{
          height: height || "80vh",
          // overflowY: "scroll",
        }}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default ViewModal;
