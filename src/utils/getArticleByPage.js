// 传入指定页数，返回对应页数的文章
export default function getArticleByPage(pageIndex = 1, limit = 5, list) {
  if (pageIndex < 1 || limit < 1) return [];
  const startIndex = (pageIndex - 1) * limit;
  const endIndex = pageIndex * limit;
  return list.slice(startIndex, endIndex + 1);
}
