function enviromentPath() {
  if (process.env.REACT_APP_STAGE === undefined ||
    (
      process.env.REACT_APP_STAGE !== 'development' &&
      process.env.REACT_APP_STAGE !== 'production' &&
      process.env.REACT_APP_STAGE !== 'test'
    )
  ) {
    return './config/enviroments/.development';
  }
  return `./config/enviroments/.${process.env.REACT_APP_STAGE}`;
}

module.exports = enviromentPath;
