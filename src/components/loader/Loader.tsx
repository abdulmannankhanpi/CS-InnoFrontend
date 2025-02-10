import React from "react";
import { Stack, Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <Stack direction="horizontal" gap={1}>
        {Array(3)
          .fill(true)
          .map((_, index) => (
            <Spinner key={index} animation="grow" />
          ))}
      </Stack>
    </div>
  );
};

export default Loader;
