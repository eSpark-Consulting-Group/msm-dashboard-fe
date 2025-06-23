import { columns } from "../../../columns/devices";
import { DynamicTable, SubHeader } from "../../../components";

const Dashboard = () => {
  const data = [
    {
      id: 1,
      deviceId: "123456",
      area: "Place1",
      addedOn: "2 June ,2025",
      assigned: "2 person",
      chip: { variant: "green", label: "Active" },
    },
    {
      id: 2,
      deviceId: "123456",
      area: "Place1",
      addedOn: "2 June ,2025",
      assigned: "2 person",
      chip: { variant: "red", label: "In active" },
    },
  ];

  return (
    <>
      <SubHeader
        heading="Hey Alex -"
        sideText="here’s what’s happening with your device and users"
      />
      <DynamicTable data={data} columns={columns()} isLoading={false} />
    </>
  );
};

export default Dashboard;
