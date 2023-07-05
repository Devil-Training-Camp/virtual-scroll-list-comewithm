const descriptionStr =
  'Voluptatem quia minima rerum culpa culpa ratione vel natus dolor. Voluptatem aut quae incidunt esse ipsum voluptates ratione perferendis qui. Beatae at aspernatur odio suscipit quidem odit.';

/**数据生成器 */
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
      desc: descriptionStr.substring(0, ~~(Math.random() * 80) + 40)
      // desc: descriptionStr.substring(0, 20)
    };
  }, length);
