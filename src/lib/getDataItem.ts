import { IData } from "../@interface";

export default function getDataItem(data: IData, key: number) {
  return (data instanceof Map ? data.get(key) : data[key]) || undefined;
}
