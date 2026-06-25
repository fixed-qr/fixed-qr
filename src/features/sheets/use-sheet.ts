import { useShallow } from "zustand/react/shallow";
import { useSheetStore } from "./use-sheet-store";

export function useSheet() {
  const { push, replace, pop, closeAll } = useSheetStore(
    useShallow((state) => ({
      push: state.push,
      replace: state.replace,
      pop: state.pop,
      closeAll: state.closeAll,
    })),
  );

  return {
    push,
    replace,
    pop,
    closeAll,
  };
}
