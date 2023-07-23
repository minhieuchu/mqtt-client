import { DeviceModel, Nullable } from "../common/types";

type DeviceProps = {
  deviceModel: Nullable<DeviceModel>;
};

export default function Device({ deviceModel }: DeviceProps) {
  return (
    <div>
      <h3>Device Page</h3>
      {deviceModel && (
        <div>
          <div>
            Device ID: <b> {deviceModel.device_id} </b>
          </div>
          <div>
            Device Name: <b> {deviceModel.device_name} </b>
          </div>
          <div>
            Status: <b> {deviceModel.status ? "True" : "False"}</b>
          </div>
        </div>
      )}
    </div>
  );
}
