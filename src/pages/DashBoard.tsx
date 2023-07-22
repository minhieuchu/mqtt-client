import { DataPointModel, Nullable } from "../common/types";

type DashBoardProps = {
  dataPointModel: Nullable<DataPointModel>;
};

export default function DashBoard({ dataPointModel }: DashBoardProps) {
  return (
    <>
      <h3>DashBoard Page</h3>
      {dataPointModel}
    </>
  );
}
