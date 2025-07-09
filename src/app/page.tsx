import { DetailDrawer } from "@/components/detail/detail-drawer";
import { MapDrawer } from "@/components/map/map-drawer";
import { MapView } from "@/components/map/map-view";

const HomePage = () => (
  <>
    <MapDrawer />
    <DetailDrawer />
    <MapView />
  </>
);

export default HomePage;
