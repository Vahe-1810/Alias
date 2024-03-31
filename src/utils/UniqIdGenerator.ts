class UniqueIdGenerator {
  count: number;
  constructor() {
    this.count = Math.random() * 10;
  }

  uid(name: string = 'id') {
    return `${name}::${this.count++}`;
  }
}

const idGen = new UniqueIdGenerator();

export const uid = idGen.uid.bind(idGen);
