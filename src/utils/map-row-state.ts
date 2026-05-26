export type MapRowStateArgs<T> = {
  item: T;
  index: number;
  columnIndex: number;
  isIncompleteRow: boolean;
};

export function mapRowState<T, R>(
  items: T[],
  mapper: (args: MapRowStateArgs<T>) => R,
  rowSize: number = 3,
): R[] {
  const remainder = items.length % rowSize;
  const incompleteRowStart = items.length - remainder;
  const hasIncompleteRow = remainder !== 0;

  return items.map((item, index) => {
    return mapper({
      item,
      index,
      columnIndex: index % rowSize,
      isIncompleteRow: hasIncompleteRow && index >= incompleteRowStart,
    });
  });
}
