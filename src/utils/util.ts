const descriptionStr =
  'Voluptatem quia minima rerum culpa culpa ratione vel natus dolor. Voluptatem aut quae incidunt esse ipsum voluptates ratione perferendis qui. Beatae at aspernatur odio suscipit quidem odit.';

const createValues = (
  creator: (v: unknown, k: number) => object,
  length: number = 50
) => {
  return Array.from({ length }, creator);
};

export const createDatas = (length = 20) =>
  createValues((v, idx) => {
    return {
      user: `user_${idx}`,
      // desc: descriptionStr.substring(0, ~~(Math.random() * 80) + 20)
      desc: descriptionStr.substring(0, 20)
    };
  }, length);

/**
 *
 * @param list 数据列表
 * @param renderLength 渲染数量
 * @param startIndex 渲染开始索引值
 */
export const getRenderList: <T>(
  list: T[],
  renderLength: number,
  startIndex?: number
) => T[] = (list, renderLength, startIndex = 0) => {
  return list.slice(startIndex, startIndex + renderLength);
};

/**
 *
 * @param containerNode 容器元素
 * @param offset 偏移阈值
 */
export const isScrollToBottom = (
  containerNode: Element,
  offset: number = 50
) => {
  const { scrollHeight, scrollTop, clientHeight } = containerNode;
  const offsetToBottom = scrollHeight - clientHeight - scrollTop;
  return offsetToBottom < offset;
};
