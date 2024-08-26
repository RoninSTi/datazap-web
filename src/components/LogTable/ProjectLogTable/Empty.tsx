import { Button } from "@/components/Button";
import { Help } from "@/components/Icons/Help";
import { Log } from "@/components/Icons/Log";
import { Logs } from "@/components/Icons/Logs";
import { Upload } from "@/components/Icons/Upload";
import { BodyLargeBold } from "@/components/Typography/BodyLargeBold";
import { BodyMedium } from "@/components/Typography/BodyMedium";
import React from "react";

const Empty: React.FC = () => (
  <div className="flex items-center justify-center flex-1">
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 text-textPlaceholder dark:text-darkTextPlaceholder">
        <Logs height={24} width={24}/>
      </div>
      <BodyLargeBold variant="main">No Logs</BodyLargeBold>
      <BodyMedium variant="secondary">Get Started By Adding Logs</BodyMedium>
      <div className="flex flex-row justify-between gap-4 mt-6">
        <Button>
          <Upload />
          Upload Logs
        </Button>
        <Button variant="secondary">
          <Help />
          Learn More
        </Button>
      </div>
    </div>
  </div>
);

export { Empty };
