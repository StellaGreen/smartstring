/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { expect } = require('chai');
const SENTENCE = 'monster';

describe('SmartString', function () {
  let SmartString, dev, alice, bob, eve;

  this.beforeEach(async function () {
    [dev, alice, bob, eve] = await ethers.getSigners();
    SmartString = await ethers.getContractFactory('SmartString');
    smartString = await SmartString.connect(dev).deploy();
    await smartString.deployed();
  });

  describe('Functions', function () {
    describe('theString', function () {
      it('Should emit Ok', async function () {
        await expect(smartString.connect(dev).theString())
          .to.emit(smartString, 'Ok')
          .withArgs(dev.address);
      });
    });

    describe('getStringById', function () {
      it('Should return the sentence with hes id', async function () {
        await smartString.connect(dev).theString(1, SENTENCE);
        expect(await smartString.getStringById(1)).to.equal('monster');
      });
    });
  });
});
