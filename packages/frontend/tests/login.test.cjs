module.exports = {
  'Check ui check is active': function (browser) {
    browser
      .url('http://127.0.0.1:8080')
      .waitForElementVisible('body')
      .assert.visible('.dang-nhap')
      .end();
  },

  'login with google': function (browser) {
    browser.windowRect({ width: 1519, height: 1000 })
      .navigateTo('http://localhost:8080/')
      .click('#app > div.grid.gap-x-8.gap-y-4.grid-cols-4 > div.flex.h-\\[60px\\].shadow-2xl.rounded.col-span-4 > div > div.h-\\[40px\\].dang-nhap.my-auto.font-sans.font-semibold.mr-5.align-middle.rounded-lg.bg-blue-800.text-white.px-3.text-center.pt-2')
      .windowHandles((result) => {
        const handle = result.value[1];
        const handle1 = result.value[0];
        browser.switchWindow(handle);
        browser.click('#identifierId')
          .setValue('#identifierId', '19110327@student.hcmute.edu.vn')
          .click('#identifierNext > div > button > span')
          .setValue('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', '138200113ltnd')
          .click('#passwordNext > div > button > span');
        browser.switchWindow(handle1);
      })
      .pause(5000)
      .assert.visible('.add-topic-admin')
      .end();
  },
  'Add topic': function (browser) {
    browser.windowRect({ width: 1519, height: 1000 })
      .navigateTo('http://localhost:8080/')
      .click('#app > div.grid.gap-x-8.gap-y-4.grid-cols-4 > div.flex.h-\\[60px\\].shadow-2xl.rounded.col-span-4 > div > div.h-\\[40px\\].dang-nhap.my-auto.font-sans.font-semibold.mr-5.align-middle.rounded-lg.bg-blue-800.text-white.px-3.text-center.pt-2')
      .windowHandles((result) => {
        const handle = result.value[1];
        const handle1 = result.value[0];
        browser.switchWindow(handle);
        browser.click('#identifierId')
          .setValue('#identifierId', '19110327@student.hcmute.edu.vn')
          .click('#identifierNext > div > button > span')
          .setValue('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', '138200113ltnd')
          .click('#passwordNext > div > button > span');
        browser.switchWindow(handle1);
      })
      .pause(5000)
      .click('.add-topic-admin')
      .end();
  },
  'Add info for topic': function (browser) {
    browser.windowRect({ width: 1519, height: 1000 })
      .navigateTo('http://localhost:8080/')
      .click('#app > div.grid.gap-x-8.gap-y-4.grid-cols-4 > div.flex.h-\\[60px\\].shadow-2xl.rounded.col-span-4 > div > div.h-\\[40px\\].dang-nhap.my-auto.font-sans.font-semibold.mr-5.align-middle.rounded-lg.bg-blue-800.text-white.px-3.text-center.pt-2')
      .windowHandles((result) => {
        const handle = result.value[1];
        const handle1 = result.value[0];
        browser.switchWindow(handle);
        browser.click('#identifierId')
          .setValue('#identifierId', '19110327@student.hcmute.edu.vn')
          .click('#identifierNext > div > button > span')
          .setValue('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', '138200113ltnd')
          .click('#passwordNext > div > button > span');
        browser.switchWindow(handle1);
      })
      .pause(5000)
      .click('.add-topic-admin')
      .pause(1000)
      .click('#username')
      .setValue('#username', 'CNPM')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(2) > textarea')
      .click('#username')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(2) > textarea')
      .setValue('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(2) > textarea', 'CNPM')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(3) > select')
      .setValue('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(3) > select', '6386b40ee812641c9904e976')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(4) > select')
      .setValue('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(4) > select', '6373a8a1a00c262d5c282b05')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(5) > input')
      .setValue('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(5) > input', '011')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div.flex.items-center.p-6.space-x-2.rounded-b.border-t.border-gray-200.dark\\:border-gray-600 > button')
      .end();
  },
  'Add info for topic for button red': function (browser) {
    browser.windowRect({ width: 1519, height: 1000 })
      .navigateTo('http://localhost:8080/')
      .click('#app > div.grid.gap-x-8.gap-y-4.grid-cols-4 > div.flex.h-\\[60px\\].shadow-2xl.rounded.col-span-4 > div > div.h-\\[40px\\].dang-nhap.my-auto.font-sans.font-semibold.mr-5.align-middle.rounded-lg.bg-blue-800.text-white.px-3.text-center.pt-2')
      .windowHandles((result) => {
        const handle = result.value[1];
        const handle1 = result.value[0];
        browser.switchWindow(handle);
        browser.click('#identifierId')
          .setValue('#identifierId', '19110327@student.hcmute.edu.vn')
          .click('#identifierNext > div > button > span')
          .setValue('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', '138200113ltnd')
          .click('#passwordNext > div > button > span');
        browser.switchWindow(handle1);
      })
      .pause(5000)
      .click('.add-topic-admin')
      .pause(1000)
      .click('#username')
      .setValue('#username', 'CNPM')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(2) > textarea')
      .click('#username')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(2) > textarea')
      .setValue('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(2) > textarea', 'CNPM')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(3) > select')
      .setValue('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(3) > select', '6386b40ee812641c9904e976')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(4) > select')
      .setValue('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(4) > select', '6373a8a1a00c262d5c282b05')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(5) > input')
      .setValue('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div:nth-child(5) > input', '011')
      .assert.attributeContains('.button-add-topic-admin', 'class', 'bg-red-500')
      .click('#app > div.flex.bg-slate-300 > div.flex.flex-col.w-full > div.h-full.bg-white.m-2.rounded-xl > div:nth-child(3) > div.vfm__container.vfm--absolute.vfm--inset.vfm--outline-none > div > div > div > div.p-6.space-y-6 > div.flex.items-center.p-6.space-x-2.rounded-b.border-t.border-gray-200.dark\\:border-gray-600 > button')
      .end();
  },

};
