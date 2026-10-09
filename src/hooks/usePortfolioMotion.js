import { useContext } from "react";
import { PortfolioMotionContext } from "../context/PortfolioMotionContext";
export function usePortfolioMotion() {
  return useContext(PortfolioMotionContext);
}
