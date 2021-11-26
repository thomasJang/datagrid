const predefinedFormatter = {
  date: (args: any) => {
    let month = args.getMonth() + 1;
    let day = args.getDate();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;

    return args.getFullYear() + "-" + month + "-" + day;
  },
  double: (args: any) => {
    return args * 2;
  },
};

export default predefinedFormatter;
