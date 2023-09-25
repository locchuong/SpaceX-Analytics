import { useEffect, useState } from "react";

export enum ScrollDirection {
  up,
  down,
}

/**
 * The threshold represents the minimum amount of vertical scroll distance required to consider a scroll action as a change in scroll direction.
 */
const threshold = 1;

/**
 * Track the scroll direction and scroll position of the window.
 *
 * @returns {{
 *   scrollDirection: ScrollDirection, // The current scroll direction (ScrollDirection.up or ScrollDirection.down).
 *   scrollPositionY: number,          // The current vertical scroll position in pixels.
 * }}
 *
 * @example
 * // Usage example:
 * const { scrollDirection, scrollPositionY } = useWindowScroll();
 */
export const useWindowScroll = () => {
  const [scrollDirection, setScrollDirection] = useState(ScrollDirection.up);
  const [scrollPositionY, setScrollPositionY] = useState<number>(0);

  useEffect(() => {
    let previousScrollYPosition = window.scrollY;

    const scrolledMoreThanThreshold = (currentScrollYPosition: number) => Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;

    const isScrollingUp = (currentScrollYPosition: number) =>
      currentScrollYPosition > previousScrollYPosition &&
      !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
      !(currentScrollYPosition > 0 && previousScrollYPosition === 0);

    const updateScrollDirection = () => {
      const currentScrollYPosition = window.scrollY;

      if (scrolledMoreThanThreshold(currentScrollYPosition)) {
        const newScrollDirection = isScrollingUp(currentScrollYPosition) ? ScrollDirection.down : ScrollDirection.up;
        setScrollDirection(newScrollDirection);
        previousScrollYPosition = currentScrollYPosition > 0 ? currentScrollYPosition : 0;
      }

      setScrollPositionY(currentScrollYPosition);
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);

    window.addEventListener("scroll", onScroll, false);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrollDirection, scrollPositionY };
};
