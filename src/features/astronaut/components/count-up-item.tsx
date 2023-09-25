import * as React from "react";

import { useCountUp } from "react-countup";
import { useInView } from "react-intersection-observer";

import { cn } from "~/lib/tailwind";

interface CountUpItem {
  field: string;
  value: number;
}

const DEFAULT_COUNT_UP_SETTINGS = {
  start: 0, // Start Value
  startOnMount: false,
  duration: 2, // Seconds
};

function CountUpItem({ field, value }: CountUpItem) {
  // Persist true animation state until animation ends
  const [startAnimate, setStartAnimate] = React.useState<boolean>(false);

  // Track element in view
  const { ref, inView } = useInView();

  // Using Id instead of ref, ref from useInView incompatible
  const id = React.useId();
  const { start } = useCountUp({
    ref: id,
    end: value,
    ...DEFAULT_COUNT_UP_SETTINGS,
  });

  React.useEffect(() => {
    if (inView) {
      start();
      setStartAnimate(true);
    }
  }, [inView, start]);

  return (
    <div className="w-44">
      <div className="mb-4 text-center text-8xl uppercase tracking-wider text-white" ref={ref} id={id} />
      <p
        className={cn("text-center text-xl uppercase text-white duration-1000", startAnimate && "animate-in fade-in-0")}
        onAnimationEnd={() => setStartAnimate(false)}
      >
        {field}
      </p>
    </div>
  );
}
export { CountUpItem };
