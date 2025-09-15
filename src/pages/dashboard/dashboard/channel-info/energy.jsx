import { DynamicTabs2, EnergyCards } from "../../../../components";

const Energy = () => {
  const tabs = [
    {
      id: 1,
      label: "Real Time",
      content: <EnergyCards />,
    },
    {
      id: 2,
      label: "Average value ",
      content: <EnergyCards />,
    },
  ];
  return (
    <>
      <DynamicTabs2 tabs={tabs} defaultActive={0} />
    </>
  );
};

export default Energy;
