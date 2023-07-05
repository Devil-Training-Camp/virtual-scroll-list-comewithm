import React, { UIEvent } from 'react';

export interface VirtualListProps<T> {
  /**滚动列表 */
  scrollList: T[];
  /**渲染单项函数 */
  renderItem: (item: T, index: number) => React.JSX.Element;
  /**滚动列表的高度 */
  scrollHeight: number;
  /**滚动列表每项行高的预估值 */
  estimatedHeight: number;
  /**滚动时触发的回调 */
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  /**滚动到底部触发的回调 */
  onScrollBottom?: () => void;
  /**滚动到底部的阈值 */
  // offset?: number;
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
