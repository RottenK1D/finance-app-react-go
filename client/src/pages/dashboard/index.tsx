import { useMediaQuery } from "usehooks-ts";
import { gridTemplateLg, gridTemplateSm } from "@/lib/gridTemplates";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

const Dashboard = () => {
  const matches = useMediaQuery("(min-width: 1200px)");
  return (
    <section
      className="w-full h-full grid gap-3 px-3 overflow-auto"
      style={
        matches
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 80px))",
              gridTemplateAreas: gridTemplateLg,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSm,
            }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </section>
  );
};

export default Dashboard;
