import { useState } from "react";
import useInterval from "use-interval";

export default function UseInterval(){
  let [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 15000);
}