import { useEffect, useRef, useState, UIEvent } from 'react';
import { getRenderList, isScrollToBottom } from '../../utils/util';
import { VirtualListProps } from '../../interface/virtualScrollList';
import './index.less';

const prefixCls = 'virtual-list';
/**默认可滚动数量 */
const DEFAULT_SCROLL_NUM = 2;

export function VirtualScrollList<T>(props: VirtualListProps<T>) {
  /**
   * (固定高度)
   * 1. 获取外层容器(wrapper)可视区域的高度 wrapperHeight
   * 2. 获取内层元素(body)单个元素项的高度和总高度
   * 3. 计算出外层容器可供显示的元素项个数(得到对应的索引值)
   * 4. 根据索引值渲染对应的元素项 实现虚拟滚动
   */
  const { scrollList, renderItem, onScroll, onScrollBottom, offset } = props;
  const [renderList, setRenderList] = useState<T[]>([]);
  const [offsetY, setOffsetY] = useState(0);
  const virtualWrapperHeightRef = useRef<number>(0);
  const renderLengthRef = useRef<number>(0);
  const virtualItemHeightRef = useRef<number>(0);
  const scrollTopRef = useRef<number>(0);

  /**计算列表渲染行数 */
  const getRenderLength = () => {
    const wrapper = document.querySelector(`.${prefixCls}-wrapper`);
    const item = document.querySelector(`.${prefixCls}__item`);
    if (wrapper && item) {
      const { clientHeight } = wrapper;
      const { height: itemHeight } = item.getBoundingClientRect();
      virtualWrapperHeightRef.current = clientHeight;
      virtualItemHeightRef.current = itemHeight;
      return Math.ceil(clientHeight / itemHeight) + DEFAULT_SCROLL_NUM;
    }
    return 0;
  };

  /**
   * 初始化渲染一行获取数据(行高, 可视区渲染数量)
   * 若存在渲染数据,根据scrollTop值设置renderList
   */
  useEffect(() => {
    if (renderLengthRef.current && virtualItemHeightRef.current) {
      const scrollTop = scrollTopRef.current;
      const scrollIndex = Math.ceil(scrollTop / virtualItemHeightRef.current);
      setRenderList(
        getRenderList(scrollList, renderLengthRef.current, scrollIndex)
      );
    } else {
      setRenderList(getRenderList(scrollList, 1));
    }
  }, [scrollList]);

  /**scroll是否到底,执行onScrollBottom回调 */
  useEffect(() => {
    if (renderList.length === 1 && renderList.length !== scrollList.length) {
      renderLengthRef.current = getRenderLength();
      setRenderList(getRenderList(scrollList, renderLengthRef.current));
    } else {
      // 判断条件：
      const wrapper = document.querySelector(
        `.${prefixCls}-wrapper`
      ) as Element;
      if (isScrollToBottom(wrapper, offset)) {
        onScrollBottom && onScrollBottom();
      }
    }
  }, [renderList]);

  /**scroll */
  const onVirtualListScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.target as HTMLDivElement;
    const offsetLength = Math.floor(scrollTop / virtualItemHeightRef.current);
    const offsetY = scrollTop - (scrollTop % virtualItemHeightRef.current);
    if (virtualWrapperHeightRef.current) {
      // 记录滚动高度
      scrollTopRef.current = scrollTop;
    }
    // 元素项偏移
    setOffsetY(offsetY);
    // 设置新的渲染数据列表
    setRenderList(
      getRenderList(scrollList, renderLengthRef.current, offsetLength)
    );
    // scroll回调
    onScroll && onScroll(e);
  };

  return (
    <div className={`${prefixCls}-wrapper`} onScroll={onVirtualListScroll}>
      <div
        className={`${prefixCls}__body`}
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        {renderList.map((obj, i) => (
          <div className={`${prefixCls}__item`} key={`virtual_item_${i}`}>
            {renderItem(obj, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
