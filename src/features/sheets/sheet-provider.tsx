import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PropsWithChildren } from "react";
import { SheetBackHandler } from "./sheet-back-handler";
import { SheetHost } from "./sheet-host";

export function SheetProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <BottomSheetModalProvider>
      {children}

      <SheetHost />
      <SheetBackHandler />
    </BottomSheetModalProvider>
  );
}
