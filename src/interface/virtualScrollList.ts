import React, { UIEvent } from 'react';

export interface VirtualListProps<T> {
  scrollList: T[];
  renderItem: (item: T, index: number) => React.JSX.Element;
  estimatedHeight: number;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  onScrollBottom?: () => void;
  offset?: number;
}

export interface MemoizedScrollItemPosition {
  /**在scrollList中的索引值 */
  index: number;
  /**在scrollList中的top值 */
  top: number;
  /**在scrollList中的bottom值 */
  bottom: number;
  /**scrollList单项的行高 */
  height: number;
  /**不同索引对应Item之间的偏移量差值 */
  differHeight: number;
}

export enum CompareResult {
  EQUAL,
  LESS,
  LARGE
}
