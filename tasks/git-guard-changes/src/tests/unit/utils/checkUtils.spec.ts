/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';

import { isNullArray, isNullValue } from '../../../utils/checkUtils';

describe('checkUtils > ', () => {
  describe('isNullValue > ', () => {
    it('should be true on empty string', () => {
      expect(isNullValue('')).to.be.true;
    });
    it('should be true on null', () => {
      expect(isNullValue(null)).to.be.true;
    });
    it('should be true on undefined', () => {
      expect(isNullValue(undefined)).to.be.true;
    });
    it('should be false on value', () => {
      expect(isNullValue('My value')).to.be.false;
    });
  });
  describe('isNullArray > ', () => {
    it('should be true on null', () => {
      expect(isNullArray(null)).to.be.true;
    });
    it('should be true on undefined', () => {
      expect(isNullArray(undefined)).to.be.true;
    });
    it('should be true on empty array', () => {
      expect(isNullArray([])).to.be.true;
    });

    it('should be false on value', () => {
      expect(isNullArray(['one', 'two', 'three'])).to.be.false;
    });
  });
});
