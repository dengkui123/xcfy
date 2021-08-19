import uuidv5 from 'uuid/dist/v5';

// 默认namespace
const NAMESPACE = 'a916f966-4866-4d0a-a1fa-10f1e2f5d914';
const uuid = (name, namespace) => {
  let newName = name;
  let newNamespace = namespace;
  if (String.isEmpty(newName)) {
    newName = Date.randomString();
  }
  if (String.isEmpty(newNamespace)) {
    newNamespace = NAMESPACE;
  }
  return uuidv5(newName, newNamespace);
};
export default uuid;
