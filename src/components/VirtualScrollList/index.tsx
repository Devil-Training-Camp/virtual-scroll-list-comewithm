import { useEffect, useRef, useState, UIEvent } from 'react';
import {
  getScrollStartIndex,
  initMemoizedPosition,
  updateMemoizedPosition
} from '../../utils/util';
import { VirtualListProps } from '../../interface/virtualScrollList';
import './index.less';

const prefixCls = 'virtual-list';
/**默认可滚动数量 */
const DEFAULT_SCROLL_NUM = 2;
let originalStartIndex = 0;
let startIndex = 0;

export function VirtualScrollList<T>(props: VirtualListProps<T>) {
  /**
   * (固定高度)
   * 1. 获取外层容器(wrapper)可视区域的高度 wrapperHeight
   * 2. 获取内层元素(body)单个元素项的高度和总高度
   * 3. 计算出外层容器可供显示的元素项个数(得到对应的索引值)
   * 4. 根据索引值渲染对应的元素项 实现虚拟滚动
   *
   * (不定高度)
   * 1. 传入一个高度预估值estimateHeight,先对行高进行渲染
   *    然后获取真实行高，进行更新，并缓存对应的行高。
   * 2. 为避免重复计算行高，需要一个数组缓存
   * 3. 获取到真实的行高和位置后，滚动的scrollTop来计算的滚动索引值startIndex
   *    可以通过缓存数组中数据获取。(查找索引对应的ScrollList列表)
   */
  const {
    scrollList,
    renderItem,
    scrollHeight,
    estimatedHeight,
    onScroll,
    onScrollBottom
  } = props;
  const [renderList, setRenderList] = useState<T[]>([]);
  const [offsetY, setOffsetY] = useState(0);

  const virtualWrapperRef = useRef<HTMLDivElement>(null);
  const virtualBodyRef = useRef<HTMLDivElement>(null);
  // 初始化缓存数组
  const [memoizedScrollListPosition, scrollViewNumber] = initMemoizedPosition(
    scrollList,
    estimatedHeight,
    scrollHeight
  );

  let endIndex = Math.min(
    originalStartIndex + scrollViewNumber,
    scrollList.length - 1
  );
  /**更新索引和滚动距离 */
  const renderScrollIndex = () => {
    // 可视区开始索引
    startIndex = Math.max(0, originalStartIndex);
    // 可视区结束索引
    endIndex = Math.min(
      originalStartIndex + scrollViewNumber + DEFAULT_SCROLL_NUM,
      scrollList.length - 1
    );
  };

  /**根据开始和结束索引渲染列表 */
  const renderVisibleItemList = () => {
    const offsetY =
      startIndex >= 1 ? memoizedScrollListPosition[startIndex - 1].bottom : 0;
    const renderList: T[] = [];
    while (startIndex <= endIndex) {
      renderList.push(scrollList[startIndex]);
      startIndex++;
    }
    setOffsetY(offsetY);
    setRenderList(renderList);
  };

  /**初始化渲染scroll view list */
  useEffect(() => {
    renderScrollIndex();
    renderVisibleItemList();
  }, []);

  /**缓存列表数据相关的滚动位置信息 */
  useEffect(() => {
    if (virtualBodyRef.current) {
      updateMemoizedPosition(
        virtualBodyRef.current,
        memoizedScrollListPosition
      );
    }
  }, [startIndex]);

  /**scroll 更新开始索引 */
  const onVirtualListScroll = (e: UIEvent<HTMLDivElement>) => {
    const scrollTop = virtualWrapperRef.current?.scrollTop;

    const currentStartIndex = getScrollStartIndex(
      memoizedScrollListPosition,
      scrollTop
    );

    if (currentStartIndex !== originalStartIndex) {
      // update scroll view list
      originalStartIndex = currentStartIndex;
      renderScrollIndex();
      renderVisibleItemList();

      if (currentStartIndex + scrollViewNumber >= scrollList.length) {
        onScrollBottom?.();
      }
      onScroll?.(e);
    }
  };

  return (
    <div
      className={`${prefixCls}-wrapper`}
      onScroll={onVirtualListScroll}
      ref={virtualWrapperRef}
      style={{ height: scrollHeight }}
    >
      <div
        className={`${prefixCls}__body`}
        ref={virtualBodyRef}
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        {renderList.map((obj, i) => (
          <div
            className={`${prefixCls}__item`}
            id={`item_${i}`}
            key={`virtual_item_${i}`}
          >
            {renderItem(obj, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
