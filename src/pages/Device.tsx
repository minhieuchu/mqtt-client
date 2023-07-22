import { DeviceModel, Nullable } from "../common/types";

type DeviceProps = {
  deviceModel: Nullable<DeviceModel>;
};

export default function Device({ deviceModel }: DeviceProps) {
  return (
    <>
      <h3>Device Page</h3>
      {deviceModel}
    </>
  );
}
