/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (propertyList, objectList) => {
  objectList.forEach((o) =>
    propertyList.forEach((property) => delete o[property])
  );
  return objectList;
};
exports.excludeByProperty = (property, objectList) => {
  return objectList.filter((o) => !o.hasOwnProperty(property));
};
exports.sumDeep = (list) => {
  return list.map((item) => ({
    objects: item.objects.reduce((sum, object) => sum + object.val, 0),
  }));
};
exports.applyStatusColor = (ruleMap, statusList) => {
  const getStatusColor = (status) => {
    for (let color in ruleMap) {
      if (ruleMap[color].includes(status)) {
        return color;
      }
    }
    return '';
  };
  return statusList
    .map((item) => ({
      ...item,
      color: getStatusColor(item.status),
    }))
    .filter((item) => item.color);
};
exports.createGreeting = (greet, greeting) => {
  return (name) => greet(greeting, name);
};
exports.setDefaults = (defaultObject) => {
  return (object) => {
    for (let key in defaultObject) {
      if (!object.hasOwnProperty(key)) {
        // TODO: use deep clone to avoid same defaultObject value if value is a object
        object[key] = defaultObject[key];
      }
    }
    return object;
  };
};
exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
  const getUserAndCompany = async () => {
    let user = null;
    let company = null;
    const users = await services.fetchUsers();
    if (!users) {
      return [user, company];
    }
    user = users.find((item) => item.name === userName);
    if (user) {
      company = await services.fetchCompanyById(user.companyId);
    }
    return [user, company];
  };
  const [[user, company], status] = await Promise.all([
    getUserAndCompany(),
    services.fetchStatus(),
  ]);
  return {
    company,
    status,
    user,
  };
};
