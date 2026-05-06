import { Fragment, ReactElement, useMemo } from "react";

interface SelectListProps<T> {
  data: T[];
  selectedItem: T | null;
  onSelect: (item: T) => void;
  keyExtractor: (item: T, index: number) => string;
  renderItem: (params: {
    item: T;
    isSelected: boolean;
    onPress: () => void;
    index: number;
  }) => ReactElement | null;
}

export function SelectList<T>({
  data,
  selectedItem,
  onSelect,
  keyExtractor,
  renderItem,
}: SelectListProps<T>) {
  const items = useMemo(() => {
    return data.map((item, index) => {
      const isSelected = selectedItem === item;

      return (
        <Fragment key={keyExtractor(item, index)}>
          {renderItem({
            item,
            isSelected,
            index,
            onPress: () => onSelect(item),
          })}
        </Fragment>
      );
    });
  }, [data, selectedItem, onSelect, keyExtractor, renderItem]);

  return <Fragment>{items}</Fragment>;
}
