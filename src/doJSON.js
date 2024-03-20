function replace(objToJson) {
  const json = JSON.stringify(objToJson, function (key, value) {
    if (typeof value === "function") {
      return "/Function(" + value.toString() + ")/";
    }
    return value;
  });

  return json;
}

function revive(jsonToObj) {
    const revived = JSON.parse(jsonToObj, function(key, value) {
        if (typeof value === "string" &&
            value.startsWith("/Function(") &&
            value.endsWith(")/")) {
          value = value.substring(10, value.length - 2);
          return (0, eval)("(" + value + ")");
        }
        return value;
      });

      return revived;
}

export {replace, revive};
