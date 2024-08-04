import Slider from "./src/components/shared/Slider/Slider";
import GridView from "./src/components/shared/GridView/GridView";
import Schedule from "./src/components/screen/home/ItemCard/Schedule";

export default function Home() {
  return (
    <div>
      <Slider dot={true}/>
      <Schedule/>
    </div>
  );
}
