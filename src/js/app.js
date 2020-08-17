import Character from './character';

const types = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];

export default function typeFabric(type, parent) {
  return class extends parent {
    constructor(name) {
      super(name);
      this.type = type;
      this.setStats();
    }
  };
}

export function characterFabric(typeList) {
  typeList.forEach((type) => {
    window[type] = typeFabric(type, Character);
  });
}

characterFabric(types);
