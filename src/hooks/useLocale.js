import { useContext } from "react";
import { LocaleContext } from "../context/LocaleContext";
export function useLocale() {
  return useContext(LocaleContext);
}
