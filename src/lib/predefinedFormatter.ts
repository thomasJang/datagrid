import { PREDEFINED_FORMAT } from "../@interface";

const predefinedFormatter: PREDEFINED_FORMAT = {
  double: (args: any) => {
    return args * 2;
  },
};

export default predefinedFormatter;
