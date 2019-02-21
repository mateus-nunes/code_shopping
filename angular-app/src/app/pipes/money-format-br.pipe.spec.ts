import { MoneyFormatBrPipe } from './money-format-br.pipe';

describe('MoneyFormatBrPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyFormatBrPipe();
    expect(pipe).toBeTruthy();
  });
});
