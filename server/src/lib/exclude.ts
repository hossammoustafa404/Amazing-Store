const exclude = (toExclude: string[], Obj: any) => {
  toExclude.forEach((item) => {
    if (Obj.hasOwnProperty(item)) {
      delete Obj[item];
    }
  });

  return Obj;
};

export default exclude;
