import React from 'react';
import { Modal } from 'antd';

export default React.memo((props) => {
  const { visible, onOk, onCancel } = props;


  return (
    <div>
      <Modal
        title="Issue Book"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        {props.children}
      </Modal>
    </div>
  );
});
