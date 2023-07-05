import {
  CompareResult,
  MemoizedScrollItemPosition
} from '../interface/virtualScrollList';

/**
 * 初始化ScrollList列表位置信息(初始化缓存数组)&可显示item数
 * @param scrollList 数据列表
 * @param estimatedScrollHeight 预估行高值
 * @returns `[itemList, scrollViewNumber]`
 */
export const initMemoizedPosition = <T>(
  scrollList: T[],
  estimatedScrollHeight: number,
  scrollHeight: number
) => {
  const memoizedItemList: MemoizedScrollItemPosition[] = [];

  scrollList.forEach((item: T, index: number) => {
    memoizedItemList.push({
      index,
      top: estimatedScrollHeight * index,
      bottom: estimatedScrollHeight * (index + 1),
      height: estimatedScrollHeight,
      differHeight: 0
    });
  });

  let scrollViewNum = Math.ceil(scrollHeight / estimatedScrollHeight);

  return [memoizedItemList, scrollViewNum] as const;
};

/**
 * 更新ScrollList列表的位置信息(更新缓存数组)
 * @param listContainerRef 渲染ScrollList父元素
 * @param memoizedItemList 缓存数组
 */
export const updateMemoizedPosition = (
  listContainer: HTMLDivElement,
  memoizedItemList: MemoizedScrollItemPosition[]
) => {
  const nodeList = listContainer.childNodes;
  const startNode = nodeList[0];

  // 遍历计算真实的行高
  nodeList.forEach((node: any) => {
    if (!node) {
      return;
    }
    const index = +node.id.split('_')[1];
    const { height } = (node as HTMLDivElement).getBoundingClientRect();
    const { height: oldHeight, bottom } = memoizedItemList[index];
    const startDifferHeight = oldHeight - height;
    memoizedItemList[index] = {
      ...memoizedItemList[index],
      bottom: bottom - startDifferHeight,
      height
    };
    // 开始索引值 调整偏移值
    let startIndex = 0;
    if (startNode) {
      startIndex = +(startNode as HTMLDivElement).id.split('_')[1];
    }
    // ScrollList length
    const listLength = memoizedItemList.length;
    let differHeight = memoizedItemList[startIndex].differHeight;
    // 第一项差值重置为0
    memoizedItemList[startIndex].differHeight = 0;

    let k = startIndex + 1;
    while (k < listLength) {
      const {
        top,
        bottom,
        height,
        differHeight: kDiffer
      } = memoizedItemList[k];
      memoizedItemList[k] = {
        ...memoizedItemList[k],
        top: top + height,
        bottom: bottom - differHeight,
        differHeight: 0
      };
      // 计算下一项时累计的偏移量
      differHeight += kDiffer;
      k++;
    }
  });
};

/**
 * 二分查找(有序列表查找)
 * @param list 有序列表
 * @param value 查找值
 * @param compareFn 比较函数
 * @returns
 */
export const binarySearch = <T, F>(
  list: T[],
  value: F,
  compareFn: (currentValue: T, value: F) => CompareResult
) => {
  const length = list.length;
  let start = 0;
  let end = length - 1;
  let currentIndex = 0;
  while (start < end) {
    currentIndex = ~~((start + end) / 2);
    const midValue = list[currentIndex];

    const result = compareFn(midValue, value);
    if (result === CompareResult.EQUAL) {
      return currentIndex;
    } else if (result === CompareResult.LESS) {
      start = currentIndex + 1;
    } else if (result === CompareResult.LARGE) {
      end = currentIndex - 1;
    }
  }

  return currentIndex;
};

/**
 * 查找对应的索引值
 * @param memoizedScrollListPosition
 * @param scrollTop 滚动偏移量
 */
export const getScrollStartIndex = (
  memoizedScrollListPosition: MemoizedScrollItemPosition[],
  scrollTop: number = 0
) => {
  let scrollIndex = binarySearch<MemoizedScrollItemPosition, number>(
    memoizedScrollListPosition,
    scrollTop,
    (currentPosition: MemoizedScrollItemPosition, targetValue: number) => {
      const { bottom } = currentPosition;
      if (bottom === targetValue) {
        return CompareResult.EQUAL;
      } else if (bottom < targetValue) {
        return CompareResult.LESS;
      } else if (bottom > targetValue) {
        return CompareResult.LARGE;
      }
      return CompareResult.EQUAL;
    }
  );

  const target = memoizedScrollListPosition[scrollIndex];

  if (target.bottom < scrollTop) {
    scrollIndex += 1;
  }

  return scrollIndex;
};
