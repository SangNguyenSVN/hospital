import Slider from "./src/components/shared/Slider/Slider";
import GridView from "./src/components/shared/GridView/GridView";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <Slider dot={true}/>
      <GridView />
    </div>
  );
}
