import { DataPointModel, Nullable } from "../common/types";

type DashBoardProps = {
  dataPointModel: Nullable<DataPointModel>;
};

export default function DashBoard({ dataPointModel }: DashBoardProps) {
  return (
    <div>
      <h3>DashBoard Page</h3>
      {dataPointModel && (
        <div>
          <div>
            Device ID: <b> {dataPointModel.device_id} </b>
          </div>
          <div>
            Sensor Name: <b> {dataPointModel.sensor_name} </b>
          </div>
          <div>
            Value: <b> {dataPointModel.value} </b>
          </div>
          <div>
            Unit: <b> {dataPointModel.unit} </b>
          </div>
        </div>
      )}
    </div>
  );
}
