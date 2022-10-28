module.exports = {
  'Check UI have login page': function (browser) {
    browser
      .url('http://127.0.0.1:5173/login')
      .waitForElementVisible('body')
      .assert.visible('input[placeholder="Email"]')
      .end();
  },
};
