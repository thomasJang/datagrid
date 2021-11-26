interface Iformatter {
  [key: string]: (args: any) => any;
}

const predefinedFormatter: Iformatter = {
  double: (args: any) => {
    return args * 2;
  },
};

export default predefinedFormatter;
