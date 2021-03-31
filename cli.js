var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __assign = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/mri/lib/index.js
var require_lib = __commonJS((exports, module2) => {
  function toArr(any) {
    return any == null ? [] : Array.isArray(any) ? any : [any];
  }
  function toVal(out, key, val, opts) {
    var x, old = out[key], nxt = !!~opts.string.indexOf(key) ? val == null || val === true ? "" : String(val) : typeof val === "boolean" ? val : !!~opts.boolean.indexOf(key) ? val === "false" ? false : val === "true" || (out._.push((x = +val, x * 0 === 0) ? x : val), !!val) : (x = +val, x * 0 === 0) ? x : val;
    out[key] = old == null ? nxt : Array.isArray(old) ? old.concat(nxt) : [old, nxt];
  }
  module2.exports = function(args, opts) {
    args = args || [];
    opts = opts || {};
    var k, arr, arg, name, val, out = {_: []};
    var i = 0, j = 0, idx = 0, len = args.length;
    const alibi = opts.alias !== void 0;
    const strict = opts.unknown !== void 0;
    const defaults = opts.default !== void 0;
    opts.alias = opts.alias || {};
    opts.string = toArr(opts.string);
    opts.boolean = toArr(opts.boolean);
    if (alibi) {
      for (k in opts.alias) {
        arr = opts.alias[k] = toArr(opts.alias[k]);
        for (i = 0; i < arr.length; i++) {
          (opts.alias[arr[i]] = arr.concat(k)).splice(i, 1);
        }
      }
    }
    for (i = opts.boolean.length; i-- > 0; ) {
      arr = opts.alias[opts.boolean[i]] || [];
      for (j = arr.length; j-- > 0; )
        opts.boolean.push(arr[j]);
    }
    for (i = opts.string.length; i-- > 0; ) {
      arr = opts.alias[opts.string[i]] || [];
      for (j = arr.length; j-- > 0; )
        opts.string.push(arr[j]);
    }
    if (defaults) {
      for (k in opts.default) {
        name = typeof opts.default[k];
        arr = opts.alias[k] = opts.alias[k] || [];
        if (opts[name] !== void 0) {
          opts[name].push(k);
          for (i = 0; i < arr.length; i++) {
            opts[name].push(arr[i]);
          }
        }
      }
    }
    const keys = strict ? Object.keys(opts.alias) : [];
    for (i = 0; i < len; i++) {
      arg = args[i];
      if (arg === "--") {
        out._ = out._.concat(args.slice(++i));
        break;
      }
      for (j = 0; j < arg.length; j++) {
        if (arg.charCodeAt(j) !== 45)
          break;
      }
      if (j === 0) {
        out._.push(arg);
      } else if (arg.substring(j, j + 3) === "no-") {
        name = arg.substring(j + 3);
        if (strict && !~keys.indexOf(name)) {
          return opts.unknown(arg);
        }
        out[name] = false;
      } else {
        for (idx = j + 1; idx < arg.length; idx++) {
          if (arg.charCodeAt(idx) === 61)
            break;
        }
        name = arg.substring(j, idx);
        val = arg.substring(++idx) || (i + 1 === len || ("" + args[i + 1]).charCodeAt(0) === 45 || args[++i]);
        arr = j === 2 ? [name] : name;
        for (idx = 0; idx < arr.length; idx++) {
          name = arr[idx];
          if (strict && !~keys.indexOf(name))
            return opts.unknown("-".repeat(j) + name);
          toVal(out, name, idx + 1 < arr.length || val, opts);
        }
      }
    }
    if (defaults) {
      for (k in opts.default) {
        if (out[k] === void 0) {
          out[k] = opts.default[k];
        }
      }
    }
    if (alibi) {
      for (k in out) {
        arr = opts.alias[k] || [];
        while (arr.length > 0) {
          out[arr.shift()] = out[k];
        }
      }
    }
    return out;
  };
});

// node_modules/sade/lib/utils.js
var require_utils = __commonJS((exports) => {
  var GAP = 4;
  var __ = "  ";
  var ALL = "__all__";
  var DEF = "__default__";
  var NL = "\n";
  function format(arr) {
    if (!arr.length)
      return "";
    let len = maxLen(arr.map((x) => x[0])) + GAP;
    let join = (a) => a[0] + " ".repeat(len - a[0].length) + a[1] + (a[2] == null ? "" : `  (default ${a[2]})`);
    return arr.map(join);
  }
  function maxLen(arr) {
    let c = 0, d = 0, l = 0, i = arr.length;
    if (i)
      while (i--) {
        d = arr[i].length;
        if (d > c) {
          l = i;
          c = d;
        }
      }
    return arr[l].length;
  }
  function noop(s) {
    return s;
  }
  function section(str, arr, fn) {
    if (!arr || !arr.length)
      return "";
    let i = 0, out = "";
    out += NL + __ + str;
    for (; i < arr.length; i++) {
      out += NL + __ + __ + fn(arr[i]);
    }
    return out + NL;
  }
  exports.help = function(bin, tree, key, single) {
    let out = "", cmd = tree[key], pfx = `$ ${bin}`, all = tree[ALL];
    let prefix = (s) => `${pfx} ${s}`.replace(/\s+/g, " ");
    let tail = [["-h, --help", "Displays this message"]];
    if (key === DEF)
      tail.unshift(["-v, --version", "Displays current version"]);
    cmd.options = (cmd.options || []).concat(all.options, tail);
    if (cmd.options.length > 0)
      cmd.usage += " [options]";
    out += section("Description", cmd.describe, noop);
    out += section("Usage", [cmd.usage], prefix);
    if (!single && key === DEF) {
      let key2, rgx = /^__/, help = "", cmds = [];
      for (key2 in tree) {
        if (typeof tree[key2] == "string" || rgx.test(key2))
          continue;
        if (cmds.push([key2, (tree[key2].describe || [""])[0]]) < 3) {
          help += NL + __ + __ + `${pfx} ${key2} --help`;
        }
      }
      out += section("Available Commands", format(cmds), noop);
      out += NL + __ + "For more info, run any command with the `--help` flag" + help + NL;
    } else if (!single && key !== DEF) {
      out += section("Aliases", cmd.alibi, prefix);
    }
    out += section("Options", format(cmd.options), noop);
    out += section("Examples", cmd.examples.map(prefix), noop);
    return out;
  };
  exports.error = function(bin, str, num = 1) {
    let out = section("ERROR", [str], noop);
    out += NL + __ + `Run \`$ ${bin} --help\` for more info.` + NL;
    console.error(out);
    process.exit(num);
  };
  exports.parse = function(str) {
    return (str || "").split(/^-{1,2}|,|\s+-{1,2}|\s+/).filter(Boolean);
  };
  exports.sentences = function(str) {
    return (str || "").replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  };
});

// node_modules/sade/lib/index.js
var require_lib2 = __commonJS((exports, module2) => {
  var mri = require_lib();
  var $ = require_utils();
  var ALL = "__all__";
  var DEF = "__default__";
  var Sade = class {
    constructor(name, isOne) {
      let [bin, ...rest] = name.split(/\s+/);
      isOne = isOne || rest.length > 0;
      this.bin = bin;
      this.ver = "0.0.0";
      this.default = "";
      this.tree = {};
      this.command(ALL);
      this.command([DEF].concat(isOne ? rest : "<command>").join(" "));
      this.single = isOne;
      this.curr = "";
    }
    command(str, desc, opts = {}) {
      if (this.single) {
        throw new Error('Disable "single" mode to add commands');
      }
      let cmd = [], usage = [], rgx = /(\[|<)/;
      str.split(/\s+/).forEach((x) => {
        (rgx.test(x.charAt(0)) ? usage : cmd).push(x);
      });
      cmd = cmd.join(" ");
      if (cmd in this.tree) {
        throw new Error(`Command already exists: ${cmd}`);
      }
      cmd.includes("__") || usage.unshift(cmd);
      usage = usage.join(" ");
      this.curr = cmd;
      if (opts.default)
        this.default = cmd;
      this.tree[cmd] = {usage, alibi: [], options: [], alias: {}, default: {}, examples: []};
      if (opts.alias)
        this.alias(opts.alias);
      if (desc)
        this.describe(desc);
      return this;
    }
    describe(str) {
      this.tree[this.curr || DEF].describe = Array.isArray(str) ? str : $.sentences(str);
      return this;
    }
    alias(...names) {
      if (this.single)
        throw new Error('Cannot call `alias()` in "single" mode');
      if (!this.curr)
        throw new Error("Cannot call `alias()` before defining a command");
      let arr = this.tree[this.curr].alibi = this.tree[this.curr].alibi.concat(...names);
      arr.forEach((key) => this.tree[key] = this.curr);
      return this;
    }
    option(str, desc, val) {
      let cmd = this.tree[this.curr || ALL];
      let [flag, alias] = $.parse(str);
      if (alias && alias.length > 1)
        [flag, alias] = [alias, flag];
      str = `--${flag}`;
      if (alias && alias.length > 0) {
        str = `-${alias}, ${str}`;
        let old = cmd.alias[alias];
        cmd.alias[alias] = (old || []).concat(flag);
      }
      let arr = [str, desc || ""];
      if (val !== void 0) {
        arr.push(val);
        cmd.default[flag] = val;
      } else if (!alias) {
        cmd.default[flag] = void 0;
      }
      cmd.options.push(arr);
      return this;
    }
    action(handler) {
      this.tree[this.curr || DEF].handler = handler;
      return this;
    }
    example(str) {
      this.tree[this.curr || DEF].examples.push(str);
      return this;
    }
    version(str) {
      this.ver = str;
      return this;
    }
    parse(arr, opts = {}) {
      arr = arr.slice();
      let offset = 2, tmp, idx, isVoid, cmd;
      let alias = {h: "help", v: "version"};
      let argv = mri(arr.slice(offset), {alias});
      let isSingle = this.single;
      let bin = this.bin;
      let name = "";
      if (isSingle) {
        cmd = this.tree[DEF];
      } else {
        let i = 1, xyz, len = argv._.length + 1;
        for (; i < len; i++) {
          tmp = argv._.slice(0, i).join(" ");
          xyz = this.tree[tmp];
          if (typeof xyz === "string") {
            idx = (name = xyz).split(" ");
            arr.splice(arr.indexOf(argv._[0]), i, ...idx);
            i += idx.length - i;
          } else if (xyz) {
            name = tmp;
          } else if (name) {
            break;
          }
        }
        cmd = this.tree[name];
        isVoid = cmd === void 0;
        if (isVoid) {
          if (this.default) {
            name = this.default;
            cmd = this.tree[name];
            arr.unshift(name);
            offset++;
          } else if (tmp) {
            return $.error(bin, `Invalid command: ${tmp}`);
          }
        }
      }
      if (argv.help)
        return this.help(!isSingle && !isVoid && name);
      if (argv.version)
        return this._version();
      if (!isSingle && cmd === void 0) {
        return $.error(bin, "No command specified.");
      }
      let all = this.tree[ALL];
      opts.alias = Object.assign(all.alias, cmd.alias, opts.alias);
      opts.default = Object.assign(all.default, cmd.default, opts.default);
      tmp = name.split(" ");
      idx = arr.indexOf(tmp[0], 2);
      if (!!~idx)
        arr.splice(idx, tmp.length);
      let vals = mri(arr.slice(offset), opts);
      if (!vals || typeof vals === "string") {
        return $.error(bin, vals || "Parsed unknown option flag(s)!");
      }
      let segs = cmd.usage.split(/\s+/);
      let reqs = segs.filter((x) => x.charAt(0) === "<");
      let args = vals._.splice(0, reqs.length);
      if (args.length < reqs.length) {
        if (name)
          bin += ` ${name}`;
        return $.error(bin, "Insufficient arguments!");
      }
      segs.filter((x) => x.charAt(0) === "[").forEach((_) => {
        args.push(vals._.shift());
      });
      args.push(vals);
      let handler = cmd.handler;
      return opts.lazy ? {args, name, handler} : handler.apply(null, args);
    }
    help(str) {
      console.log($.help(this.bin, this.tree, str || DEF, this.single));
    }
    _version() {
      console.log(`${this.bin}, ${this.ver}`);
    }
  };
  module2.exports = (str, isOne) => new Sade(str, isOne);
});

// node_modules/is-docker/index.js
var require_is_docker = __commonJS((exports, module2) => {
  "use strict";
  var fs = require("fs");
  var isDocker;
  function hasDockerEnv() {
    try {
      fs.statSync("/.dockerenv");
      return true;
    } catch (_) {
      return false;
    }
  }
  function hasDockerCGroup() {
    try {
      return fs.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
    } catch (_) {
      return false;
    }
  }
  module2.exports = () => {
    if (isDocker === void 0) {
      isDocker = hasDockerEnv() || hasDockerCGroup();
    }
    return isDocker;
  };
});

// node_modules/is-wsl/index.js
var require_is_wsl = __commonJS((exports, module2) => {
  "use strict";
  var os = require("os");
  var fs = require("fs");
  var isDocker = require_is_docker();
  var isWsl = () => {
    if (process.platform !== "linux") {
      return false;
    }
    if (os.release().toLowerCase().includes("microsoft")) {
      if (isDocker()) {
        return false;
      }
      return true;
    }
    try {
      return fs.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !isDocker() : false;
    } catch (_) {
      return false;
    }
  };
  if (process.env.__IS_WSL_TEST__) {
    module2.exports = isWsl;
  } else {
    module2.exports = isWsl();
  }
});

// node_modules/define-lazy-prop/index.js
var require_define_lazy_prop = __commonJS((exports, module2) => {
  "use strict";
  module2.exports = (object, propertyName, fn) => {
    const define = (value) => Object.defineProperty(object, propertyName, {value, enumerable: true, writable: true});
    Object.defineProperty(object, propertyName, {
      configurable: true,
      enumerable: true,
      get() {
        const result = fn();
        define(result);
        return result;
      },
      set(value) {
        define(value);
      }
    });
    return object;
  };
});

// node_modules/open/index.js
var require_open = __commonJS((exports, module2) => {
  var path = require("path");
  var childProcess = require("child_process");
  var {promises: fs} = require("fs");
  var isWsl = require_is_wsl();
  var isDocker = require_is_docker();
  var defineLazyProperty = require_define_lazy_prop();
  var localXdgOpenPath = path.join(__dirname, "xdg-open");
  var {platform, arch} = process;
  var getWslDrivesMountPoint = (() => {
    const defaultMountPoint = "/mnt/";
    let mountPoint;
    return async function() {
      if (mountPoint) {
        return mountPoint;
      }
      const configFilePath = "/etc/wsl.conf";
      let isConfigFileExists = false;
      try {
        await fs.access(configFilePath, fs.constants.F_OK);
        isConfigFileExists = true;
      } catch (e) {
      }
      if (!isConfigFileExists) {
        return defaultMountPoint;
      }
      const configContent = await fs.readFile(configFilePath, {encoding: "utf8"});
      const configMountPoint = /root\s*=\s*(?<mountPoint>.*)/g.exec(configContent);
      if (!configMountPoint) {
        return defaultMountPoint;
      }
      mountPoint = configMountPoint.groups.mountPoint.trim();
      mountPoint = mountPoint.endsWith("/") ? mountPoint : `${mountPoint}/`;
      return mountPoint;
    };
  })();
  var pTryEach = async (array, mapper) => {
    let latestError;
    for (const item of array) {
      try {
        return await mapper(item);
      } catch (error) {
        latestError = error;
      }
    }
    throw latestError;
  };
  var open2 = async (target, options) => {
    if (typeof target !== "string") {
      throw new TypeError("Expected a `target`");
    }
    options = __assign({
      wait: false,
      background: false,
      allowNonzeroExitCode: false
    }, options);
    if (Array.isArray(options.app)) {
      return pTryEach(options.app, (singleApp) => open2(target, __assign(__assign({}, options), {
        app: singleApp
      })));
    }
    let {name: app, arguments: appArguments = []} = options.app || {};
    if (Array.isArray(app)) {
      return pTryEach(app, (appName) => open2(target, __assign(__assign({}, options), {
        app: {
          name: appName,
          arguments: appArguments
        }
      })));
    }
    let command;
    const cliArguments = [];
    const childProcessOptions = {};
    if (platform === "darwin") {
      command = "open";
      if (options.wait) {
        cliArguments.push("--wait-apps");
      }
      if (options.background) {
        cliArguments.push("--background");
      }
      if (app) {
        cliArguments.push("-a", app);
      }
    } else if (platform === "win32" || isWsl && !isDocker()) {
      const mountPoint = await getWslDrivesMountPoint();
      command = isWsl ? `${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe` : `${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`;
      cliArguments.push("-NoProfile", "-NonInteractive", "\u2013ExecutionPolicy", "Bypass", "\u2013WindowStyle", "Hidden", "-EncodedCommand");
      if (!isWsl) {
        childProcessOptions.windowsVerbatimArguments = true;
      }
      const encodedArguments = ["Start"];
      if (options.wait) {
        encodedArguments.push("-Wait");
      }
      if (app) {
        encodedArguments.push(`"\`"${app}\`""`, "-ArgumentList");
        appArguments.unshift(target);
      } else {
        encodedArguments.push(`"${target}"`);
      }
      if (appArguments.length > 0) {
        appArguments = appArguments.map((arg) => `"\`"${arg}\`""`);
        encodedArguments.push(appArguments.join(","));
      }
      target = Buffer.from(encodedArguments.join(" "), "utf16le").toString("base64");
    } else {
      if (app) {
        command = app;
      } else {
        const isBundled = !__dirname || __dirname === "/";
        let exeLocalXdgOpen = false;
        try {
          await fs.access(localXdgOpenPath, fs.constants.X_OK);
          exeLocalXdgOpen = true;
        } catch (e) {
        }
        const useSystemXdgOpen = process.versions.electron || platform === "android" || isBundled || !exeLocalXdgOpen;
        command = useSystemXdgOpen ? "xdg-open" : localXdgOpenPath;
      }
      if (appArguments.length > 0) {
        cliArguments.push(...appArguments);
      }
      if (!options.wait) {
        childProcessOptions.stdio = "ignore";
        childProcessOptions.detached = true;
      }
    }
    cliArguments.push(target);
    if (platform === "darwin" && appArguments.length > 0) {
      cliArguments.push("--args", ...appArguments);
    }
    const subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);
    if (options.wait) {
      return new Promise((resolve, reject) => {
        subprocess.once("error", reject);
        subprocess.once("close", (exitCode) => {
          if (options.allowNonzeroExitCode && exitCode > 0) {
            reject(new Error(`Exited with code ${exitCode}`));
            return;
          }
          resolve(subprocess);
        });
      });
    }
    subprocess.unref();
    return subprocess;
  };
  function detectArchBinary(binary) {
    if (typeof binary === "string") {
      return binary;
    }
    const {[arch]: archBinary} = binary;
    if (!archBinary) {
      throw new Error(`${arch} is not supported`);
    }
    return archBinary;
  }
  function detectPlatformBinary({[platform]: platformBinary}, {wsl}) {
    if (wsl && isWsl) {
      return detectArchBinary(wsl);
    }
    if (!platformBinary) {
      throw new Error(`${platform} is not supported`);
    }
    return detectArchBinary(platformBinary);
  }
  var apps = {};
  defineLazyProperty(apps, "chrome", () => detectPlatformBinary({
    darwin: "google chrome canary",
    win32: "chrome",
    linux: ["google-chrome", "google-chrome-stable"]
  }, {
    wsl: {
      ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
      x64: ["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe", "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]
    }
  }));
  defineLazyProperty(apps, "firefox", () => detectPlatformBinary({
    darwin: "firefox",
    win32: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
    linux: "firefox"
  }, {
    wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe"
  }));
  open2.apps = apps;
  module2.exports = open2;
});

// index.ts
__markAsModule(exports);
__export(exports, {
  authenticate: () => authenticate
});
var import_sade = __toModule(require_lib2());

// src/auth.ts
var import_open = __toModule(require_open());

// src/lib/server.ts
var import_http = __toModule(require("http"));
async function getToken() {
  new Promise((resolve) => {
    const server = import_http.default.createServer((req, res) => {
      console.log("HERE 1");
      req.on("data", (data) => {
        if (req.method === "POST" && req.headers["content-type"] === "application/json") {
          console.log("HERE 2");
        }
        resolve(data);
      });
      req.on("end", () => {
        console.log("HERE 3");
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({status: "OK"}));
        server.close();
      });
    }).listen(35287);
  });
}

// src/auth.ts
var url = `https://app.vssps.visualstudio.com/oauth2/authorize
?client_id=54DC9EFD-680A-4B1E-8066-D669BC6A5D09
&response_type=Assertion
&scope=vso.packaging
&redirect_uri=https://ado-auth.vercel.app/api/auth`.trim();
async function auth() {
  (0, import_open.default)(url);
  const token = await getToken();
  console.log(token);
}

// src/readrc.ts
var import_child_process = __toModule(require("child_process"));
function getRegistry(command) {
  return JSON.stringify((0, import_child_process.execSync)(command, {
    encoding: "utf8",
    stdio: "ignore"
  }).trim());
}
function readrc() {
  let npmRegistry = "";
  let yarnRegistry = "";
  let yarn2Registry = "";
  const yarnDefaultRegex = /^(https?)?:?\/\/registry\.yarnpkg\.com.*/i;
  const npmDefaultRegex = /^(https?)?:?\/\/registry\.npmjs\.org.*/i;
  try {
    yarn2Registry = getRegistry("yarn config get npmRegistryServer");
    if (yarnDefaultRegex.test(yarn2Registry)) {
      yarn2Registry = void 0;
    }
  } catch (error) {
  }
  try {
    yarnRegistry = getRegistry("yarn config get registry");
    if (yarnDefaultRegex.test(yarnRegistry)) {
      yarnRegistry = void 0;
    }
  } catch (error) {
  }
  try {
    npmRegistry = getRegistry("npm config get registry");
  } catch (error) {
    if (npmDefaultRegex.test(npmRegistry)) {
      npmRegistry = void 0;
    }
  }
  if (!npmRegistry) {
    console.log("No custom npm registries found.");
  } else {
    console.log("Npmrc contains - ", npmRegistry);
  }
  if (!yarnRegistry) {
    console.log("No custom yarn registries found.");
  } else {
    console.log("Npmrc contains - ", yarnRegistry);
  }
  if (!yarn2Registry) {
    console.log("No custom yarn2 registries found.");
  } else {
    console.log("Npmrc contains - ", yarn2Registry);
  }
  console.log(npmRegistry, yarnRegistry, yarn2Registry);
}

// index.ts
var authenticate = async () => {
  console.debug("Trying to get registry settings from npm and yarn");
  readrc();
  console.debug("Trying to get get auth token");
  auth();
};
var cli = (0, import_sade.default)("ado-auth", true).version("0.0.14");
cli.action(authenticate);
if (require.main === module) {
  cli.parse(process.argv);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticate
});
