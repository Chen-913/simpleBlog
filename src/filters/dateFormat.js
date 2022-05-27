/**
 * 根据传入的格式，将时间戳转换为指定格式的字符串
 * @param {String|Number} timeStamp 时间戳
 * @param {String} patten 需要转换的格式
 * @returns 指定的时间格式字符串
 */
export default function (timeStamp, patten = 'YYYY-MM-DD') {
  const date = new Date(+timeStamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  // xxxx年-xx月-xx日 格式
  if (patten === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  }
  // xxxx年-xx月-xx日 xx时-xx分-xx秒 格式
  if (patten === 'YYYY-MM-DD hh-mm-ss') {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  if (patten === 'YYYY/MM/DD') {
    return `${year}/${month}/${day}`;
  }
  return '日期格式错误';
}
