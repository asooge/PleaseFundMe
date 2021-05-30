const PleaseFundMe = artifacts.require('PleaseFundMe');

contract('PleaseFundMe', async (accounts) => {
  describe('constructor', () => {
    it('should create dev homepage on contract deploy', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const devAddress = accounts[0];
      const userId = await pleaseFundMeInstance.getUserId({ from: devAddress });
      const devAccount = await pleaseFundMeInstance.getAccountById(userId);
      const expected = [devAddress, userId, 'dev', 'developer page', 'blue'];
      assert.deepEqual(devAccount, expected);
    });
  });
  describe('createHomePage', () => {
    const homepageArgs = ['test user', 'testing contract', 'green'];
    it('should fail if dev address tries to create a homepage', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      devAddress = accounts[0];
      try {
        await pleaseFundMeInstance.createHomePage(...homepageArgs, { from: devAddress });
      } catch (error) {
        expect(error.reason).equal('dev already has a home page')
      };
    });
    it('should successfully create a homepage with correct data', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      userAddress = accounts[1];
      await pleaseFundMeInstance.createHomePage(...homepageArgs, { from: userAddress });
      const userId = await pleaseFundMeInstance.getUserId({ from: userAddress });
      const actual = await pleaseFundMeInstance.getAccountById(userId);
      expected = [userAddress, userId, ...homepageArgs];
      assert.deepEqual(actual, expected);
    });
    it('should fail if user tries to create a second homepage', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      userAddress = accounts[1];
      try {
        await pleaseFundMeInstance.createHomePage(...homepageArgs, { from: userAddress });
      } catch (error) {
        expect(error.reason).equal('user already has a home page')
      };
    });
  });
  describe('updateHomePage', () => {
    const initialArgs = ['user2', 'initial description', 'orange'];
    const updatedArgs = ['user2', 'updated description', 'red'];
    it('should successfully update user homepage with correct data', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const userAddress = accounts[2];
      await pleaseFundMeInstance.createHomePage(...initialArgs, { from: userAddress });
      const userId = await pleaseFundMeInstance.getUserId({ from: userAddress });
      const initialHomepage = await pleaseFundMeInstance.getAccountById(userId);
      assert.deepEqual(initialHomepage, [userAddress, userId, ...initialArgs]);

      await pleaseFundMeInstance.updateHomePage(...updatedArgs, { from: userAddress });
      const updatedHomePage = await pleaseFundMeInstance.getAccountById(userId);
      assert.deepEqual(updatedHomePage, [userAddress, userId, ...updatedArgs]);
    });
  });
});
