export const dateControl = (start: string, finish: string) => {
  const startArray = start.split("/");
  const finishArray = finish.split("/");
  if (parseInt(startArray[2]) > parseInt(finishArray[2])) {
    return true;
  } else if (parseInt(startArray[2]) <= parseInt(finishArray[2])) {
    if (parseInt(startArray[0]) > parseInt(finishArray[0])) {
      return true;
    } else if (parseInt(startArray[0]) <= parseInt(finishArray[0])) {
      if (parseInt(startArray[1]) > parseInt(finishArray[1])) {
        return true;
      }
    }
  }
  return false;
};
