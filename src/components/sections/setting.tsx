import { AppGroup } from "@/components/app-ui";
import { DeleteEverything } from "@/components/delete-everything";
import { Setting } from "@/components/setting";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";

export function SettingSection() {
  const snapToIndex = useBottomSheetStore((state) => state.snapToIndex);

  return (
    <AppGroup title="Settings">
      <DeleteEverything />
      <Setting
        leftIcon="snow"
        label="Transactions"
        isLast={true}
        onPress={() => {
          snapToIndex("transaction-bottom-sheet", 0);
        }}
      />
    </AppGroup>
  );
}
