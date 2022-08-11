import { Personne } from 'src/app/model/personne.model';

describe('Personne', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Personne()).toBeTruthy();
  });
});
