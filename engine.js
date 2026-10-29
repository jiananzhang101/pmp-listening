(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.Engine = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  var KEY = "pmp-listening-v1";
  var ACCOUNT_KEY = "pmp-accounts-v1";
  var BANKS = [
    { id: "前面", title: "项目日常", detail: "项目、干系人、范围、风险。做任何项目每天都会听到。" },
    { id: "敏捷", title: "敏捷日常", detail: "冲刺、待办、站会、完成定义。做敏捷项目时最常听到。" },
    { id: "流动", title: "发布与度量", detail: "版本怎么发出去，以及用速度、流动和延迟成本看交付。" },
    { id: "规划", title: "章程与进度", detail: "章程、工作分解、网络图和估算。排期时会用到。" },
    { id: "治理", title: "变更、风险与质量", detail: "变更控制、风险应对，以及质量怎么量。" },
    { id: "组织", title: "组织与原则", detail: "组织类型、生命周期，和第 7 版的原则。" },
    { id: "协作", title: "团队与干系人", detail: "团队怎么协作，沟通怎么进行，干系人怎么参与。" },
    { id: "过程", title: "过程名称", detail: "过程组和各个过程的名字。备考时再集中听。" },
    { id: "后面", title: "挣值与采购", detail: "挣值、合同和采购。" },
    { id: "最后", title: "少见模型", detail: "平时较少听到的模型和框架。" }
  ];

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function iso(date) {
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  }

  function todayISO() {
    var n = new Date();
    return iso(new Date(n.getFullYear(), n.getMonth(), n.getDate()));
  }

  function parseISO(value) {
    var p = value.split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function addDays(value, days) {
    var d = parseISO(value);
    d.setDate(d.getDate() + days);
    return iso(d);
  }

  function dayIndex(startDate, totalDays, today) {
    var diff = Math.round((parseISO(today) - parseISO(startDate)) / 86400000);
    if (diff < 0) diff = 0;
    if (diff > totalDays - 1) diff = totalDays - 1;
    return diff;
  }

  function planFromDays(totalDays, wordCount) {
    var days = Math.max(7, Math.min(180, Math.round(totalDays) || 7));
    var daily = Math.ceil(wordCount / days);
    var used = Math.ceil(wordCount / daily);
    return { totalDays: used, dailyNew: daily };
  }

  function planFromCount(dailyNew, wordCount) {
    var count = Math.max(5, Math.min(80, Math.round(dailyNew)));
    return { dailyNew: count, totalDays: Math.ceil(wordCount / count) };
  }

  function defaultStore(wordCount) {
    var plan = planFromDays(45, wordCount || 923);
    return {
      planned: false,
      startDate: todayISO(),
      totalDays: plan.totalDays,
      dailyNew: plan.dailyNew,
      bank: "前面",
      grades: {},
      mistakes: {},
      sessionDay: "",
      sessionKey: "",
      sessionBase: [],
      sessionQueue: [],
      bookQueue: [],
      bookIndex: 0,
      bookKind: "",
      bookSpeakDone: [],
      bookSpeakLead: null,
      bookSpeakDay: "",
      hidden: {},
      favorites: {},
      log: {},
      listenDay: "",
      listenIndex: 0,
      speakDay: "",
      speakIndex: 0
    };
  }

  function hydrate(saved, wordCount) {
    var base = defaultStore(wordCount);
    if (!saved) return base;
    var knownBank = {};
    BANKS.forEach(function (item) { knownBank[item.id] = true; });
    return {
      planned: !!saved.planned,
      bank: knownBank[saved.bank] ? saved.bank : "前面",
      startDate: saved.startDate || base.startDate,
      totalDays: saved.totalDays || base.totalDays,
      dailyNew: saved.dailyNew || base.dailyNew,
      grades: saved.grades || {},
      mistakes: saved.mistakes || {},
      sessionDay: saved.sessionDay || "",
      sessionKey: saved.sessionKey || "",
      sessionBase: saved.sessionBase || [],
      sessionQueue: saved.sessionQueue || [],
      bookQueue: saved.bookQueue || [],
      bookIndex: saved.bookIndex || 0,
      bookKind: saved.bookKind || "",
      bookSpeakDone: saved.bookSpeakDone || [],
      bookSpeakLead: typeof saved.bookSpeakLead === "number" ? saved.bookSpeakLead : null,
      bookSpeakDay: saved.bookSpeakDay || "",
      hidden: saved.hidden || {},
      favorites: saved.favorites || {},
      log: saved.log ? saved.log : seedLog(saved.grades),
      listenDay: saved.listenDay || "",
      listenIndex: saved.listenIndex || 0,
      speakDay: saved.speakDay || "",
      speakIndex: saved.speakIndex || 0
    };
  }

  function readAccounts() {
    try {
      var raw = localStorage.getItem(ACCOUNT_KEY);
      var data = raw ? JSON.parse(raw) : null;
      if (!data || typeof data !== "object") return { current: "", users: {} };
      if (!data.users) data.users = {};
      return data;
    } catch (err) {
      return { current: "", users: {} };
    }
  }

  function writeAccounts(data) {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(data));
  }

  function hashPass(salt, password) {
    var str = salt + "\n" + password;
    var h = 2166136261;
    var i;
    for (i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
  }

  function makeSalt() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function load(wordCount) {
    var accounts = readAccounts();
    if (accounts.current && accounts.users[accounts.current]) {
      return hydrate(accounts.users[accounts.current].store, wordCount);
    }
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return hydrate(null, wordCount);
      return hydrate(JSON.parse(raw), wordCount);
    } catch (err) {
      return hydrate(null, wordCount);
    }
  }

  function save(store) {
    var accounts = readAccounts();
    if (accounts.current && accounts.users[accounts.current]) {
      accounts.users[accounts.current].store = store;
      writeAccounts(accounts);
      return;
    }
    localStorage.setItem(KEY, JSON.stringify(store));
  }

  function currentName() {
    return readAccounts().current || "";
  }

  function register(name, password, store) {
    var user = String(name || "").trim();
    if (user.length < 2) return { ok: false, error: "名字至少 2 个字" };
    if (user.length > 20) return { ok: false, error: "名字不要超过 20 个字" };
    if (String(password || "").length < 4) return { ok: false, error: "密码至少 4 位" };
    var accounts = readAccounts();
    if (accounts.users[user]) return { ok: false, error: "这个名字已经有人用了" };
    var salt = makeSalt();
    accounts.users[user] = {
      salt: salt,
      hash: hashPass(salt, password),
      created: todayISO(),
      store: store
    };
    accounts.current = user;
    writeAccounts(accounts);
    localStorage.removeItem(KEY);
    return { ok: true, name: user, store: store };
  }

  function login(name, password, wordCount) {
    var user = String(name || "").trim();
    var accounts = readAccounts();
    var row = accounts.users[user];
    if (!row || hashPass(row.salt, String(password || "")) !== row.hash) {
      return { ok: false, error: "名字或密码不对" };
    }
    accounts.current = user;
    writeAccounts(accounts);
    return { ok: true, name: user, store: hydrate(row.store, wordCount) };
  }

  function logout(wordCount) {
    var accounts = readAccounts();
    accounts.current = "";
    writeAccounts(accounts);
    try {
      var raw = localStorage.getItem(KEY);
      return { name: "", store: hydrate(raw ? JSON.parse(raw) : null, wordCount) };
    } catch (err) {
      return { name: "", store: hydrate(null, wordCount) };
    }
  }

  function sessionSignature(store, extra) {
    return (store.bank || "前面") + "|" + store.startDate + "|" + store.dailyNew + "|" + store.totalDays + "|" + (extra || 0);
  }

  function inBank(words, bank) {
    var id = bank || "前面";
    return words.filter(function (word) { return word.band === id; });
  }

  function bankStat(words, bank, grades, mistakes) {
    var list = inBank(words, bank);
    var known = 0;
    var open = 0;
    list.forEach(function (word) {
      var grade = (grades || {})[String(word.id)];
      if (grade && grade.grade === "know") known += 1;
      var mark = (mistakes || {})[String(word.id)];
      if (mark && mark.open) open += 1;
    });
    return {
      total: list.length,
      known: known,
      open: open,
      ready: list.length > 0 && known === list.length && open === 0
    };
  }

  function bankStates(words, bank, grades, mistakes) {
    return BANKS.map(function (item, index) {
      var stat = bankStat(words, item.id, grades, mistakes);
      var prevReady = index === 0 || bankStat(words, BANKS[index - 1].id, grades, mistakes).ready;
      var status = "未解锁";
      if (stat.ready) status = "已练熟";
      else if (item.id === (bank || "前面")) status = "正在练";
      else if (prevReady) status = "可以开始";
      return {
        id: item.id,
        title: item.title,
        detail: item.detail,
        status: status,
        unlocked: prevReady || stat.ready,
        current: item.id === (bank || "前面"),
        total: stat.total,
        known: stat.known,
        open: stat.open,
        ready: stat.ready
      };
    });
  }

  function emptyDay() {
    return { listen: 0, know: 0, miss: 0, speak: 0, speakOk: 0, speakNear: 0, speakMiss: 0, words: {} };
  }

  function bumpDay(log, date, patch, wordId) {
    if (!date) return log || {};
    var prev = (log && log[date]) || emptyDay();
    var words = Object.assign({}, prev.words || {});
    if (wordId != null) words[String(wordId)] = 1;
    var next = {
      listen: prev.listen || 0,
      know: prev.know || 0,
      miss: prev.miss || 0,
      speak: prev.speak || 0,
      speakOk: prev.speakOk || 0,
      speakNear: prev.speakNear || 0,
      speakMiss: prev.speakMiss || 0,
      words: words
    };
    Object.keys(patch || {}).forEach(function (key) {
      if (key === "words") return;
      next[key] = (next[key] || 0) + (patch[key] || 0);
    });
    var copy = Object.assign({}, log || {});
    copy[date] = next;
    return copy;
  }

  function seedLog(grades) {
    var log = {};
    Object.keys(grades || {}).forEach(function (id) {
      var grade = grades[id];
      if (!grade || !grade.at) return;
      var patch = grade.grade === "know" ? { listen: 1, know: 1 } : { listen: 1, miss: 1 };
      log = bumpDay(log, grade.at, patch, id);
    });
    return log;
  }

  function dayActive(entry) {
    return !!entry && ((entry.listen || 0) + (entry.speak || 0) > 0);
  }

  function streakCount(log, today) {
    var cursor = today;
    if (!dayActive(log && log[cursor])) cursor = addDays(today, -1);
    var n = 0;
    while (dayActive(log && log[cursor])) {
      n += 1;
      cursor = addDays(cursor, -1);
      if (n > 4000) break;
    }
    return n;
  }

  function monthCells(year, month) {
    var first = new Date(year, month, 1);
    var pad = (first.getDay() + 6) % 7;
    var count = new Date(year, month + 1, 0).getDate();
    var cells = [];
    var i;
    for (i = 0; i < pad; i++) cells.push("");
    for (i = 1; i <= count; i++) cells.push(iso(new Date(year, month, i)));
    while (cells.length % 7) cells.push("");
    return cells;
  }

  function noteMistake(mistakes, id, kind, today) {
    var prev = (mistakes || {})[String(id)] || { vague: 0, forgot: 0, unfamiliar: 0, speak: 0, last: "", lastGrade: "", open: true };
    var next = Object.assign({}, prev);
    next[kind] = (next[kind] || 0) + 1;
    next.last = today;
    next.lastGrade = kind;
    next.open = true;
    var copy = Object.assign({}, mistakes || {});
    copy[String(id)] = next;
    return copy;
  }

  function closeMistake(mistakes, id) {
    var copy = Object.assign({}, mistakes || {});
    if (!copy[String(id)]) return copy;
    copy[String(id)] = Object.assign({}, copy[String(id)], { open: false });
    return copy;
  }

  function openIds(mistakes) {
    return Object.keys(mistakes || {}).map(Number).filter(function (id) {
      return mistakes[String(id)] && mistakes[String(id)].open;
    }).sort(function (a, b) {
      var ma = mistakes[String(a)];
      var mb = mistakes[String(b)];
      var sa = (ma.forgot || 0) * 3 + (ma.unfamiliar || 0) * 3 + (ma.vague || 0) * 2 + (ma.speak || 0);
      var sb = (mb.forgot || 0) * 3 + (mb.unfamiliar || 0) * 3 + (mb.vague || 0) * 2 + (mb.speak || 0);
      return sb - sa;
    });
  }

  function insertAgain(queue, index, id, gap) {
    var i;
    for (i = index + 1; i < queue.length; i++) {
      if (queue[i] === id) return queue.slice();
    }
    var at = Math.min(queue.length, index + 1 + (gap || 3));
    var next = queue.slice();
    next.splice(at, 0, id);
    return next;
  }

  function nextReview(grade, today) {
    if (grade === "forgot") return addDays(today, 1);
    if (grade === "vague") return addDays(today, 2);
    return addDays(today, 5);
  }

  function reviews(words, grades, today, skipIds, cap) {
    var forgot = [];
    var vague = [];
    var know = [];
    words.forEach(function (word) {
      if (skipIds[word.id]) return;
      var grade = grades[String(word.id)];
      if (!grade) return;
      if (grade.grade === "forgot" || grade.grade === "unfamiliar") forgot.push(word);
      else if (grade.next <= today && grade.grade === "vague") vague.push(word);
      else if (grade.next <= today && grade.grade === "know") know.push(word);
    });
    return forgot.concat(vague).concat(know).slice(0, cap);
  }

  function dayQueue(words, store, today) {
    var day = dayIndex(store.startDate, store.totalDays, today);
    var start = day * store.dailyNew;
    var fresh = words.slice(start, Math.min(words.length, start + store.dailyNew));
    var skip = {};
    fresh.forEach(function (word) { skip[word.id] = true; });
    var review = reviews(words, store.grades, today, skip, fresh.length || store.dailyNew);
    return {
      day: day,
      fresh: fresh,
      review: review,
      queue: fresh.concat(review)
    };
  }

  function norm(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/\([^)]*\)/g, " ")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function squash(value) {
    var parts = value.split(" ").filter(Boolean);
    if (parts.length > 1 && parts.every(function (part) { return part.length === 1; })) {
      return parts.join("");
    }
    return value;
  }

  function levenshtein(a, b) {
    var m = a.length;
    var n = b.length;
    if (!m) return n;
    if (!n) return m;
    var row = [];
    var j;
    for (j = 0; j <= n; j++) row[j] = j;
    for (var i = 1; i <= m; i++) {
      var prev = row[0];
      row[0] = i;
      for (j = 1; j <= n; j++) {
        var tmp = row[j];
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
        prev = tmp;
      }
    }
    return row[n];
  }

  function ratio(a, b) {
    if (!a && !b) return 1;
    if (!a || !b) return 0;
    return 1 - levenshtein(a, b) / Math.max(a.length, b.length);
  }

  function tokenScore(expected, heard) {
    var exp = expected.split(" ").filter(Boolean);
    var got = heard.split(" ").filter(Boolean);
    if (!exp.length || !got.length) return 0;
    var used = {};
    var hit = 0;
    exp.forEach(function (token) {
      for (var i = 0; i < got.length; i++) {
        if (used[i]) continue;
        var other = got[i];
        var close = other === token || (token.length > 3 && (other.indexOf(token) === 0 || token.indexOf(other) === 0));
        if (close) {
          used[i] = true;
          hit += 1;
          break;
        }
      }
    });
    return hit / exp.length;
  }

  function bestMatch(expected, heard) {
    var left = squash(norm(expected));
    var right = squash(norm(heard));
    if (!left || !right) return 0;
    var score = Math.max(ratio(left, right), tokenScore(left, right));
    if (left === right) score = 1;
    var short = left.length < right.length ? left : right;
    var long = left.length < right.length ? right : left;
    if (short.length >= 3 && long.indexOf(short) >= 0 && short.length / long.length >= 0.72) {
      score = Math.max(score, short.length / long.length);
    }
    return score;
  }

  function judge(word, heard, level) {
    var gates = {
      "严格": [0.9, 0.74],
      "标准": [0.82, 0.58],
      "宽松": [0.72, 0.46]
    };
    var pair = gates[level] || gates["标准"];
    if (!norm(heard)) return { label: "没听清", score: 0 };
    var candidates = [word.say].concat(word.also || []);
    var score = 0;
    candidates.forEach(function (item) {
      score = Math.max(score, bestMatch(item, heard));
    });
    var label = "未对上";
    if (score >= pair[0]) label = "正确";
    else if (score >= pair[1]) label = "接近";
    return { label: label, score: score };
  }

  return {
    KEY: KEY,
    bankList: function () { return BANKS; },
    inBank: inBank,
    bankStat: bankStat,
    bankStates: bankStates,
    currentName: currentName,
    register: register,
    login: login,
    logout: logout,
    todayISO: todayISO,
    addDays: addDays,
    sessionSignature: sessionSignature,
    noteMistake: noteMistake,
    bumpDay: bumpDay,
    dayActive: dayActive,
    streakCount: streakCount,
    monthCells: monthCells,
    closeMistake: closeMistake,
    openIds: openIds,
    insertAgain: insertAgain,
    dayIndex: dayIndex,
    planFromDays: planFromDays,
    planFromCount: planFromCount,
    defaultStore: defaultStore,
    load: load,
    save: save,
    nextReview: nextReview,
    dayQueue: dayQueue,
    judge: judge
  };
});
