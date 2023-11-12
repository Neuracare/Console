import { useLoaderData } from "@remix-run/react";
import { Button, Card, Text, Title, Flex, MarkerBar } from "@tremor/react";
import { Droplet, Gauge, Heart, Wind } from "lucide-react";
import useSWR from "swr";
import ChartView from "~/chart-view";
import Map from "~/map";
import TrackerView from "~/tracker";

export const loader = ({ params }: { params: any }) => {
  return params.id;
};

export type Patient = {
  name: string;
  heartRate: number;
  bloodOxygen: number;
  respiratoryRate: number;
  location: "Home" | "Roaming";
  status: string;
};

const fetcher = ({ url, id }: { url: string; id: string }) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  }).then((res) => res.json());

export default function Overview() {
  const id = useLoaderData<typeof loader>();
  const { data, isLoading, mutate } = useSWR(
    { url: "https://backend.neuracare.tech/web/getPatient", id: id },
    fetcher,
    { refreshInterval: 1000 }
  );

  if (!data || isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-tremor-title text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
          {data.name}
          <Text className="mt-1">{id}</Text>
        </h2>

        <div className="flex items-center gap-x-4">
          <Button size="lg" variant="secondary">
            Edit
          </Button>
          <Button
            size="lg"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-8">
        <Card className="flex items-start justify-center p-6 gap-x-6">
          <Heart className="h-10 w-10 text-red-500" />
          <div>
            <span className="text-sm text-gray-600 block">Heart Rate</span>
            <span className="text-lg font-medium">{data.heartRate} bpm</span>
          </div>
        </Card>
        <Card className="flex items-start justify-center p-6 gap-x-6">
          <Gauge className="h-10 w-10 text-gray-500" />
          <div>
            <span className="text-sm text-gray-600 block">Blood Pressure</span>
            <span className="text-lg font-medium">118/70 mmHg</span>
          </div>
        </Card>
        <Card className="flex items-start justify-center p-6 gap-x-6">
          <Droplet className="h-10 w-10 text-red-500" />
          <div>
            <span className="text-sm text-gray-600 block">Blood Oxygen</span>
            <span className="text-lg font-medium">{data.bloodOxygen}%</span>
          </div>
        </Card>
        <Card className="flex items-start justify-center p-6 gap-x-6">
          <Wind className="h-10 w-10 text-blue-500" />
          <div>
            <span className="text-sm text-gray-600 block">
              Respiratory Rate
            </span>
            <span className="text-lg font-medium">
              {data.respiratoryRate} breaths/min
            </span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-10">
        <Card>
          <ChartView />
        </Card>

        <div className="grid grid-cols-1 grid-rows-2 gap-10">
          <TrackerView />

          <Card>
            <Title>Average Condition</Title>
            <Text>Oct - Nov 2023</Text>
            <Flex className="mt-6">
              <Text>Declining</Text>
              <Text>Improving</Text>
            </Flex>
            <MarkerBar
              value={45}
              minValue={25}
              maxValue={65}
              color="yellow"
              className="mt-4"
            />
          </Card>
        </div>
      </div>

      <Card className="mt-10">
        <Title>Patient's Location</Title>
        <Text>Refreshed every 30 seconds</Text>
        <Map location={data.location} />
      </Card>
    </>
  );
}
