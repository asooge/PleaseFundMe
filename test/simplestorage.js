const PleaseFundMe = artifacts.require('PleaseFundMe');

contract('PleaseFundMe', (accounts) => {
  it('...should store the value 89.', async () => {
    const pleaseFundMeInstance = await PleaseFundMe.deployed();

    // Set value of 89
    await pleaseFundMeInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await pleaseFundMeInstance.storedData.call();

    assert.equal(storedData, 89, 'The value 89 was not stored.');
  });
});
