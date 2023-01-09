import { isSvg } from '../isSvg';

describe('isSvg', () => {
  it('should return true for .svg extension', () => {
    expect(isSvg('.svg')).toBeTruthy();
  });

  it('should return true for svg extension', () => {
    expect(isSvg('svg')).toBeTruthy();
  });

  it('should return true for .path.svg extension', () => {
    expect(isSvg('.path.svg')).toBeTruthy();
  });

  it('should return false for .svgt extension', () => {
    expect(isSvg('.svgt')).toBeFalsy();
  });
});
