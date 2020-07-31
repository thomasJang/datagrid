import { IData, IDataItem } from "../@interface";

export default function getDataItem(
  data: IData,
  key: number
): IDataItem | undefined {
  return (data instanceof Map ? data.get(key) : data[key]) || undefined;
}
