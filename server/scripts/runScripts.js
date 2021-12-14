(async () => {
  await require('./createCompany');
  await require('./createBuyer');
  await require('./createEmail');
})();
setTimeout(() => {
  return process.exit();
}, 5000)
