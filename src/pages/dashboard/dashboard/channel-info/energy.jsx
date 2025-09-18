import { DynamicTabs2, EnergyCards } from "../../../../components";

const Energy = ({ data }) => {
  const tabs = [
    {
      id: 1,
      label: "Real Time",
      content: <EnergyCards energyData={data} />,
    },
    {
      id: 2,
      label: "Average value ",
      content: <EnergyCards energyData={data} />,
    },
  ];
  return (
    <>
      <DynamicTabs2 tabs={tabs} defaultActive={0} />
    </>
  );
};

export default Energy;
