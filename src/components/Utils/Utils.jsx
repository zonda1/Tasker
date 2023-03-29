class Utils {
   
  static isEqual(obj1, obj2) {
    const props1 = Object.getOwnPropertyNames(obj1);
    const props2 = Object.getOwnPropertyNames(obj2);

    if (props1.length !== props2.length) {
      return false;
    }

    for (let i = 0; i < props1.length; i += 1) {
      const prop = props1[i];

      if (obj1[prop] !== obj2[prop]) {
        return false;
      }
    }
    return true;
  }

  static checkTask = (task, buttonsArr) => {
    if (task.isDone === true && task.isArchived === false) {
      return [...buttonsArr.slice(0, 2), ...buttonsArr.slice(-1)];
    } else if (task.isArchived === true) {
      return [...buttonsArr.slice(0, 2), 'Unarchive'];
    } else {
      return buttonsArr;
    }
  };

};

export default Utils;