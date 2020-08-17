import Character, { params } from '../character';
import typeFabric, { characterFabric } from '../app';

test.each(Object.entries(params))(('check params generated of class instance: type=%s, expects: %s'), (type, param) => {
  const SpecCharacter = typeFabric(type, Character);
  const character = new SpecCharacter('John');
  const expected = {
    attack: character.attack,
    defense: character.defense,
    level: character.level,
    health: character.health,
  };
  expect(expected).toEqual({ ...param, ...{ level: 1, health: 100 } });
});

test.each(Object.entries(params))(('check params of class instance: type=%s, expects: %s'), (type, param) => {
  characterFabric(Object.keys(params));
  const character = new window[type]('John');
  const expected = {
    attack: character.attack,
    defense: character.defense,
    level: character.level,
    health: character.health,
  };
  expect(expected).toEqual({ ...param, ...{ level: 1, health: 100 } });
});

test('checking set of unregistered types', () => {
  expect(() => {
    const SpecCharacter = typeFabric('Warrior', Character);
    const character = new SpecCharacter('John');
  }).toThrow('the type must be from Bowman, Swordsman, Wizard, Daemon, Undead, Zombie');
});

test('checking the name is too short', () => {
  expect(() => {
    const SpecCharacter = typeFabric('Zombie', Character);
    const character = new SpecCharacter('J');
  }).toThrow('the name must not be shorter than 2 characters!');
});

test('checking a name that is too long', () => {
  expect(() => {
    const SpecCharacter = typeFabric('Zombie', Character);
    const character = new SpecCharacter('Jhon Lennon');
  }).toThrow('the name must not be longer than 10 characters!');
});

test('checking a name that is no string', () => {
  expect(() => {
    const SpecCharacter = typeFabric('Zombie', Character);
    const character = new SpecCharacter(1);
  }).toThrow('the name must be of the string type!');
});
