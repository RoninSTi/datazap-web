import { BodyLargeBold } from "@/components/Typography/BodyLargeBold";
import React from "react";

const Empty: React.FC = () => (
  <div className="flex items-center justify-center flex-1">
    <BodyLargeBold variant="main">No Logs</BodyLargeBold>
  </div>
);

export { Empty };
