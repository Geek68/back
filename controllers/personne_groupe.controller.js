const { Groupe, Personne, Personne_Groupe } = require("../models");

const addPersonToGroup = async (req, res) => {
  const { personneId, groupeId } = req.body;
  const person = await Personne.findByPk(personneId);
  const group = await Groupe.findByPk(groupeId);

  if (person && group) {
    await Personne_Groupe.create({ personneId, groupeId });
    res.status(200).json({ message: "person added to group" });
  } else res.status(404).json({ message: "Person or group not found" });
};

const getPersonsByGroup = async (req, res) => {
  const { groupeId } = req.params;
  const items = await Personne_Groupe.findAll({
    where: { groupeId },
  });
  if (items.length) {
    const persons = [];
    const promise = items.map(async (item) => {
      const person = await Personne.findByPk(item.personneId);
      persons.push(person);
      return person;
    });
    await Promise.all(promise);
    res.json(persons);
  } else res.status(404).json({ message: "Group not found" });
};

const deletePersonGroupe = async (res, res) => {
  const { id } = req.params;
  const persongroupe = await Personne_Groupe.findByPk(id);
  if (persongroupe) {
    res.status(400).json({ message: "Personne_groupe not found" });
  } else {
    await Personne_Groupe.destroy({ id });
    res.status(200).json({ message: "Personne_group deleted" });
  }
};

module.exports = {
  addPersonToGroup,
  getPersonsByGroup,
  deletePersonGroupe,
};
