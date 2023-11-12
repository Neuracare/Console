import { Info } from "lucide-react";
import {
  BadgeDelta,
  Card,
  DeltaType,
  Flex,
  Icon,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: "rmadithya@outlook.com",
    }),
  }).then((res) => res.json());

export default function Overview() {
  const { data, isLoading } = useSWR(
    "https://backend.neuracare.tech/web/getPatients",
    fetcher
  );

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const isPatientSelected = (patient: Patient) =>
    (patient.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(patient.name) || selectedNames.length === 0);

  if (!data || isLoading) {
    return <>Loading...</>;
  }

  console.log('data :>> ', data);

  return (
    <div className="w-full">
      <Card>
        <>
          <div>
            <Flex
              className="space-x-0.5"
              justifyContent="start"
              alignItems="center"
            >
              <Title>Patients Overview</Title>
              <Icon
                icon={Info}
                variant="simple"
                tooltip="Shows general health conditions of all patients"
              />
            </Flex>
          </div>
          <div className="flex space-x-2 mt-4">
            <MultiSelect
              className="max-w-full sm:max-w-xs"
              onValueChange={setSelectedNames}
              placeholder="Select Patients..."
            >
              {data[0].patients.map((item: Patient) => (
                <MultiSelectItem key={item.name} value={item.name}>
                  {item.name}
                </MultiSelectItem>
              ))}
            </MultiSelect>
            <Select
              className="max-w-full sm:max-w-xs"
              defaultValue="all"
              onValueChange={setSelectedStatus}
            >
              <SelectItem value="all">All Conditions</SelectItem>
              <SelectItem value="improving">Improving</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
              <SelectItem value="declining">Declining</SelectItem>
            </Select>
          </div>
          <Table className="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Heart Rate
                </TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Blood Pressure
                </TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Blood Oxygen
                </TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Respiratory Rate
                </TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Location
                </TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Condition
                </TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data[0].patients
                .filter((item: Patient) => isPatientSelected(item))
                .map((item: Patient) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">
                      {item.heartRate} bpm
                    </TableCell>
                    <TableCell className="text-right">
                      118/90 mmHg
                    </TableCell>
                    <TableCell className="text-right">
                      {item.bloodOxygen}%
                    </TableCell>
                    <TableCell className="text-right">
                      {item.respiratoryRate} breaths/min
                    </TableCell>
                    <TableCell className="text-right">
                      Home
                    </TableCell>
                    <TableCell className="text-right">
                      <BadgeDelta
                        deltaType={deltaTypes[item.status]}
                        size="xs"
                        className="px-3"
                      >
                        {item.status}
                      </BadgeDelta>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      </Card>
    </div>
  );
}

export type DailyPerformance = {
  date: string;
  Sales: number;
  Profit: number;
  Customers: number;
};

export type Patient = {
  name: string;
  heartRate: number;
  bloodPressure: string;
  bloodOxygen: number;
  respiratoryRate: number;
  location: "Home" | "Roaming";
  status: string;
};

export const patients: Patient[] = [
  {
    name: "Shlok Desai",
    heartRate: 45,
    bloodPressure: "118/60",
    bloodOxygen: 98,
    respiratoryRate: 19,
    location: "Home",
    status: "improving",
  },
  {
    name: "Mia Khalifa",
    heartRate: 35,
    bloodPressure: "100/90",
    respiratoryRate: 15,
    location: "Home",
    bloodOxygen: 76,
    status: "stable",
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  stable: "unchanged",
  improving: "moderateIncrease",
  declining: "moderateDecrease",
};
