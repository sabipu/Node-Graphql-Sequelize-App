import * as React from "react";
import { useState } from "react";

const AddSite = () => {
  const [isAdding, setIsAdding] = useState(false);

  if(!isAdding) {
    return (
      <div onClick={() => setIsAdding(true)}>
        + Add Site
      </div>
    )
  }

  return (
    <div>
      <form>
        text
      </form>
    </div>
  );
};

export default AddSite;