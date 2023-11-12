import { AreaChart, Color, Flex, Icon, Tab, TabGroup, TabList, Text, Title } from "@tremor/react";
import { Info } from "lucide-react";
import { useState } from "react";

const Kpis = {
  Sales: "Sales",
  Profit: "Profit",
};

const kpiList = [Kpis.Sales, Kpis.Profit];

export type DailyPerformance = {
  date: string;
  Sales: number;
  Profit: number;
};

export const performance: DailyPerformance[] = [
  {
    date: "2023-11-01",
    Sales: 900.73,
    Profit: 173,
  },
  {
    date: "2023-11-02",
    Sales: 1000.74,
    Profit: 174.6,
  },
  {
    date: "2023-11-03",
    Sales: 1100.93,
    Profit: 293.1,
  },
  {
    date: "2023-11-04",
    Sales: 1200.9,
    Profit: 290.2,
  },
];

export default function ChartView() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedKpi = kpiList[selectedIndex];

  const areaChartArgs = {
    className: "mt-5 h-72",
    data: performance,
    index: "date",
    categories: [selectedKpi],
    colors: ["blue"] as Color[],
    showLegend: false,
    yAxisWidth: 60,
  };

  return (
    <>
      <div className="md:flex justify-between">
        <div>
          <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
            <Title>Patient Stats</Title>
            <Icon
              icon={Info}
              variant="simple"
              tooltip="Shows daily increase or decrease of particular domain"
            />
          </Flex>
          <Text>Showing data from the past 5 days</Text>
        </div>
        <div>
          <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
            <TabList color="gray" variant="solid">
              <Tab>Heart Rate</Tab>
              <Tab>Blood Pressure</Tab>
            </TabList>
          </TabGroup>
        </div>
      </div>
      {/* web */}
      <div className="mt-8 hidden sm:block">
        <AreaChart {...areaChartArgs} />
      </div>
      {/* mobile */}
      <div className="mt-8 sm:hidden">
        <AreaChart {...areaChartArgs} startEndOnly={true} showGradient={false} showYAxis={false} />
      </div>
    </>
  );
}