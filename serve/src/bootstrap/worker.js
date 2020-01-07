const constant = require('iuo_blog_constant')
think.beforeStartServer(async() => {
  const hooks = [];
  think.CONST = constant;
  for (const Service of Object.values(think.app.services)) {
    const isHookService = think.isFunction(Service.registerHook);
    if (!isHookService) {
      continue;
    }

    const service = new Service();
    const serviceHooks = Service.registerHook();
    for (const hookFuncName in serviceHooks) {
      if (!think.isFunction(service[hookFuncName])) {
        continue;
      }
      let funcForHooks = serviceHooks[hookFuncName];
      if (think.isString(funcForHooks)) {
        funcForHooks = [funcForHooks];
      }
      if (!think.isArray(funcForHooks)) {
        continue;
      }
      for (const hookName of funcForHooks) {
        if (!hooks[hookName]) {
          hooks[hookName] = [];
        }
        hooks[hookName].push({ service, method: hookFuncName });
      }
    }
  }
  think.config('hooks', hooks);
});
