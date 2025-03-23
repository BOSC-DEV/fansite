
import { useState } from "react";

export function useResponseForm() {
  const [officialResponse, setOfficialResponse] = useState("");

  return {
    officialResponse, 
    setOfficialResponse
  };
}
