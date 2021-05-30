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
  describe('createFunder', () => {
    const endDate = Date.parse(new Date('10-10-2021')) / 1000;
    const funderArgs = ['fund title', 1000, 'fund description', endDate];
    it('should create a funder with the correct data', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const userAddress = accounts[1];
      const userId = await pleaseFundMeInstance.getUserId({ from: userAddress });
      await pleaseFundMeInstance.createFunder(...funderArgs, { from: userAddress });
      const userFunders = await pleaseFundMeInstance.getUserFunders(userId);
      const actual = userFunders[0];
      const createdTime = actual.startDate;
      const funderId = actual.id;
      const expected = [userAddress, funderId, createdTime, endDate.toString(), createdTime, 'fund title', 'fund description', '1000', '0', '0'];
      assert.deepEqual(actual, expected);
    });
    it('should fail if user does not have a homepage', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const userAddress = accounts[9];
      try {
        await pleaseFundMeInstance.createFunder(...funderArgs, { from: userAddress });
      } catch (error) {
        expect(error.reason).equal('must create home page before creating funder');
      };
    });
  });
  describe('updateFunder', () => {
    const initialEndDate = Date.parse(new Date('10-10-2021')) / 1000;
    const updatedEndDate = Date.parse(new Date('12-25-2021')) / 1000;
    const updatedFunderArgs = ['new fund title', 1001, 'new fund description', updatedEndDate];
    it('should update funder with correct data', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const userAddress = accounts[1];
      const userId = await pleaseFundMeInstance.getUserId({ from: userAddress });
      const initialUserFunders = await pleaseFundMeInstance.getUserFunders(userId);
      const initialFunder = initialUserFunders[0];
      const funderId = initialFunder.id;
      const createdTime = initialFunder.startDate;
      const expectedInitial = [userAddress, funderId, createdTime, initialEndDate.toString(), createdTime, 'fund title', 'fund description', '1000', '0', '0'];
      assert.deepEqual(initialFunder, expectedInitial)

      await pleaseFundMeInstance.updateFunder(funderId, ...updatedFunderArgs, { from: userAddress });
      const updatedUserFunders = await pleaseFundMeInstance.getUserFunders(userId);
      const updatedFunder = updatedUserFunders[0];
      const updatedTime = updatedFunder.updatedAt;
      const expectedUpdated = [userAddress, funderId, createdTime, updatedEndDate.toString(), updatedTime, 'new fund title', 'new fund description', '1001', '0', '0'];
      assert.deepEqual(updatedFunder, expectedUpdated);
    });
    it('should fail if address is not the owner of the funder', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const ownerAddress = accounts[1];
      const nonOwnerAddress = accounts[2];
      const ownerUserId = await pleaseFundMeInstance.getUserId({ from: ownerAddress });
      const userFunders = await pleaseFundMeInstance.getUserFunders(ownerUserId);
      const funderId = userFunders[0].id;
      try {
        await pleaseFundMeInstance.updateFunder(funderId, ...updatedFunderArgs, { from: nonOwnerAddress });
        throw new Error();
      } catch (error) {
        expect(error.reason).equal('must be owner to update');
      };
    });
  });
  describe('contribute', () => {
    it('should create a contribution and update fund balance', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const allFunders = await pleaseFundMeInstance.getAllFunders();
      const funder = allFunders[0];
      const funderId = funder.id;
      const initialFundBalance = funder.fundBalance;
      assert.equal(initialFundBalance, '0');
      const contributer = accounts[3];
      const contributionValue = web3.utils.toWei('3', 'ether');
      const contributionMessage = 'please accept this contribution'
      await pleaseFundMeInstance.contribute(funder.id, contributionMessage, {
        from: contributer,
        value: contributionValue,
      });
      const funderPostContribution = await pleaseFundMeInstance.getFunderById(funderId);
      const updatedBalance = funderPostContribution.fundBalance;
      assert.equal(updatedBalance, contributionValue);
      const funderContributions = await pleaseFundMeInstance.getFunderContributions(funderId);
      const contribution = funderContributions[0];
      const expectedContribution = [contribution.id, contribution.timeCreated, contributer, contributionValue, contributionMessage ]
      assert.deepEqual(contribution, expectedContribution);
    });
  });
  describe('withdraw', () => {
    it('should reject withdrawal to address that is not owner', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const allFunders = await pleaseFundMeInstance.getAllFunders();
      const funder = allFunders[0];
      const funderId = funder.id;
      const owner = funder.owner;
      const nonOwnerAddress = accounts[9];
      assert.notEqual(owner, nonOwnerAddress);
      try {
        await pleaseFundMeInstance.withdraw(funderId, { from: nonOwnerAddress });
        console.log('fail')
        throw new Error();
      } catch (error) {
        assert.equal(error.reason, 'unauthorized');
      };
    });
    it('should correctly distribute funds when called by owner', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const devAddress = accounts[0];
      const initialDevBalance = await web3.eth.getBalance(devAddress)
      const allFunders = await pleaseFundMeInstance.getAllFunders();
      const funder = allFunders[0];
      const funderId = funder.id;
      const owner = funder.owner;
      const initialFundBalance = parseInt(funder.fundBalance);
      const withdrawalInteraction = await pleaseFundMeInstance.withdraw(funderId, { from: owner });
      const withdrawalAmountReceived = parseInt(withdrawalInteraction.receipt.logs[0].args['2']);
      const postWithdrawalDevBalance = await web3.eth.getBalance(devAddress)
      const devAmountReceived = parseInt(postWithdrawalDevBalance) - parseInt(initialDevBalance);
      assert.equal(withdrawalAmountReceived, initialFundBalance * .999)
      assert.equal(devAmountReceived, initialFundBalance * .001);
      const postWithdrawalFunder = await pleaseFundMeInstance.getFunderById(funderId);
      const postWithdrawalFundBalance = postWithdrawalFunder.fundBalance;
      assert.equal(postWithdrawalFundBalance, '0');
    });
    it('should reject withdrawal if fund balance is zero', async () => {
      const pleaseFundMeInstance = await PleaseFundMe.deployed();
      const allFunders = await pleaseFundMeInstance.getAllFunders();
      const funder = allFunders[0];
      const funderId = funder.id;
      const owner = funder.owner;
      const fundBalance = funder.fundBalance;
      assert.equal(fundBalance, '0');
      try {
        await pleaseFundMeInstance.withdraw(funderId, { from: owner });
        throw new Error();
      } catch (error) {
        assert.equal(error.reason, 'no funds to withdraw,');
      };
    });
  });

});
