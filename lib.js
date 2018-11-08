const clean = fileName => {
  const regex = /^.*\.env.*$|^.*\.yml.*$|^.*\.prisma.*$|^.*\.graphql/;
  const flag = /(^server\.|^config\.|^resolver\.).+/g;
  fileName = fileName.match(regex) ? fileName.replace(".js", "") : fileName;
  // grab the first capturing group
  fileName = fileName.match(flag)
    ? fileName.replace(flag.exec(fileName)[1], "")
    : fileName;

  return fileName;
};

module.exports = clean;
