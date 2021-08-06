const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.some((id) => id === specie.id));
}

function getAnimalsOlderThan(animal, age) {
  const findAnimal = data.species.find(({ name }) => name === animal);
  return findAnimal.residents.every((resident) => age <= resident.age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(
    (employee) =>
      employeeName === employee.firstName || employeeName === employee.lastName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(species) {
  if (!species) {
    return data.species.reduce((acc, actual) => {
      acc[actual.name] = actual.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  // Acessar as chaves dos entrantes, e para cada uma delas, buscar o seu respectivo preço no 'data', retornando num array os valores para somá-los.
  return Object.keys(entrants)
    .map((key) => {
      const price = data.prices[key];
      const qtyEntrants = entrants[key];
      return price * qtyEntrants;
    })
    .reduce((acc, next) => acc + next, 0);
}

function getAnimalMap(options) {
  //
}

function getSchedule(dayName) {
  const bsnsHours = data.hours;
  const schedule = Object.keys(bsnsHours).reduce((acc, next) => {
    if (next === 'Monday') {
      acc[next] = 'CLOSED';
      return acc;
    }
    acc[next] = `Open from ${bsnsHours[next].open}am until ${bsnsHours[next].close - 12}pm`;
    return acc;
  }, {});
  return dayName ? { [dayName]: schedule[dayName] } : schedule;
}

function getOldestFromFirstSpecies(id) {
  const firstAnimalId = data.employees
    .find(({ id: employeeId }) => id === employeeId).responsibleFor[0];
  const residentsList = data.species
    .find(({ id: specieId }) => specieId === firstAnimalId).residents;
  const { name, sex, age } = residentsList
    .reduce((acc, curr) => (acc.age < curr.age ? curr : acc));
  return [name, sex, age];
}

function increasePrices(percentage) {
  const newPrice = Object.keys(data.prices)
    .forEach((price) => {
      data.prices[price] = Math.ceil(data.prices[price] * (percentage + 100)) / 100;
    });
  return newPrice;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
