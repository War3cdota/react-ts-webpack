/**
 * 实现find函数
 * 1. JS基础
 * 2. 正则表达式能力
 * 3. 链式调用
 **/
interface DataType {
  // 注意：索引签名的学习！
  [key: string]: number | string | null;
  userId: number;
  title: string | null;
}
const data: DataType[] = [
  {
    userId: 8,
    title: "title1",
  },
  {
    userId: 11,
    title: "other",
  },
  {
    userId: 15,
    title: null,
  },
  {
    userId: 19,
    title: "title2",
  },
];
interface RegexData {
  title: RegExp;
}
const find = (origin: DataType[]) => {
  // TODO begin
  return {
    where: (regexData: RegexData) => {
      origin = origin.filter((item: DataType) => {
        return regexData.title.test(item.title);
      });
      return {
        orderBy: (id: string, order: string) => {
          const cmp = (a: DataType, b: DataType) => {
            if (a[`${id}`] > b[`${id}`]) {
              return order === "desc" ? -1 : 1;
            }
            if (a[`${id}`] < b[`${id}`]) {
              return order === "desc" ? 1 : -1;
            }
            return 0;
          };
          return origin.sort(cmp);
        },
      };
    },
  };
  // TODO above
};
const result = find(data).where({ title: /\d$/ }).orderBy("userId", "desc");
console.log(result); //[{userId: 19,title: "title2"},{userId: 8,title: "title1"}]