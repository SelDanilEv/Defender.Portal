function build<T>(u: any, obj: T): any {
  let paramsObject: any = {};

  for (let key in obj) {
    paramsObject[key] = key;
  }

  return paramsObject;
}

const ParamsObjectBuilder = {
  Build: build,
};

export default ParamsObjectBuilder;
