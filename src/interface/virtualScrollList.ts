import React, { UIEvent } from 'react';

export interface VirtualListProps<T> {
  scrollList: T[];
  renderItem: (item: T, index: number) => React.JSX.Element;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  onScrollBottom?: () => void;
  offset?: number;
}
