import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="global min-h-screen flex flex-col justify-center items-center">
       <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
}
