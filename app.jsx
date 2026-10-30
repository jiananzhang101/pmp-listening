function IconSpeaker() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10h4l5-4v12l-5-4H4z"></path>
      <path d="M16 9a4 4 0 0 1 0 6"></path>
      <path d="M18.5 7a7 7 0 0 1 0 10"></path>
    </svg>
  );
}

function IconMic() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3"></rect>
      <path d="M6 11a6 6 0 0 0 12 0"></path>
      <path d="M12 17v4"></path>
    </svg>
  );
}

function IconHeadphones() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 16 0"></path>
      <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2z"></path>
      <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}

function IconShuffle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 4l4 4-4 4"></path>
      <path d="M4 8h4l8 8h4"></path>
      <path d="M16 20l4-4-4-4"></path>
      <path d="M4 16h4l2.5-2.5"></path>
    </svg>
  );
}

function IconNotebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h10a2 2 0 0 1 2 2v14l-5-2.2L9 20V6a2 2 0 0 0-2-2z"></path>
    </svg>
  );
}

function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l8 4-8 4-8-4 8-4z"></path>
      <path d="M4 12l8 4 8-4"></path>
      <path d="M4 16l8 4 8-4"></path>
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3"></circle>
      <path d="M5 19c1.4-3 3.6-4.5 7-4.5s5.6 1.5 7 4.5"></path>
    </svg>
  );
}

function IconEye({ off }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"></path>
      {off ? <path d="M4 5l16 14"></path> : <circle className="pupil" cx="12" cy="12" r="2.4"></circle>}
    </svg>
  );
}

function IconStar({ on }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={on ? "is-filled" : ""}>
      <path d="M12 3.2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8 7.2 18.1l.9-5.4L4.2 8.9l5.4-.8z"></path>
    </svg>
  );
}

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 6l-6 6 6 6"></path>
      <path d="M8 12h11"></path>
    </svg>
  );
}

function IconChevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={dir === "left" ? "M14 6l-6 6 6 6" : "M10 6l6 6-6 6"}></path>
    </svg>
  );
}

function IconList() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 7h10M9 12h10M9 17h10"></path>
      <path d="M5 7h.01M5 12h.01M5 17h.01"></path>
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7l10 10M17 7L7 17"></path>
    </svg>
  );
}

function IconMinus() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8"></circle>
      <path d="M8 12h8"></path>
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8"></circle>
      <path d="M12 8v8M8 12h8"></path>
    </svg>
  );
}

function Wave({ active }) {
  const ref = React.useRef(null);
  React.useEffect(function () {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let tick = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function draw() {
      const w = canvas.width = 520;
      const h = canvas.height = 150;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#1c1e21";
      ctx.lineWidth = 3;
      ctx.beginPath();
      const amp = active && !reduce ? 26 : 7;
      for (let x = 0; x <= w; x += 5) {
        const y = h / 2 + Math.sin((x + tick) / 26) * amp * (0.35 + 0.65 * Math.abs(Math.sin(x / 80)));
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      if (active && !reduce) {
        tick += 5;
        frame = requestAnimationFrame(draw);
      }
    }
    draw();
    return function () { cancelAnimationFrame(frame); };
  }, [active]);
  return <canvas ref={ref} aria-hidden="true"></canvas>;
}

function pickVoice(voices) {
  return voices.find(function (voice) {
    return /en-US/i.test(voice.lang) && /samantha|google|natural|aria|jenny/i.test(voice.name);
  }) || voices.find(function (voice) { return /^en-US/i.test(voice.lang); })
    || voices.find(function (voice) { return /^en/i.test(voice.lang); });
}

function App() {
  const words = window.PMP_WORDS || [];
  const byId = {};
  words.forEach(function (word) { byId[word.id] = word; });
  const [tw, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const [store, setStore] = React.useState(function () { return Engine.load(words.length); });
  const [screen, setScreen] = React.useState(function () {
    return Engine.load(words.length).planned ? "listen" : "me";
  });
  const [pack, setPack] = React.useState({ day: 0, fresh: [], review: [], queue: [] });
  const [revealed, setRevealed] = React.useState(false);
  const [canChoose, setCanChoose] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [playingMark, setPlayingMark] = React.useState("");
  const [listening, setListening] = React.useState(false);
  const [heard, setHeard] = React.useState("");
  const [verdict, setVerdict] = React.useState(null);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [speechError, setSpeechError] = React.useState("");
  const [draftDays, setDraftDays] = React.useState(store.totalDays);
  const [draftCount, setDraftCount] = React.useState(store.dailyNew);
  const [draftStart, setDraftStart] = React.useState(store.startDate);
  const [userName, setUserName] = React.useState(function () { return Engine.currentName(); });
  const [authMode, setAuthMode] = React.useState("login");
  const [authName, setAuthName] = React.useState("");
  const [authPass, setAuthPass] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [seconds, setSeconds] = React.useState(5);
  const [timedOut, setTimedOut] = React.useState(false);
  const [holdLabel, setHoldLabel] = React.useState("");
  const [browseBank, setBrowseBank] = React.useState(store.bank || "前面");
  const [browseFilter, setBrowseFilter] = React.useState("all");
  const [hideEn, setHideEn] = React.useState(false);
  const [calMonth, setCalMonth] = React.useState(function () {
    const n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() };
  });
  const [calDay, setCalDay] = React.useState(function () { return Engine.todayISO(); });
  const voices = React.useRef([]);
  const recRef = React.useRef(null);
  const storeRef = React.useRef(store);
  const speakToken = React.useRef(0);
  const choiceRef = React.useRef(false);
  const revealedRef = React.useRef(false);
  const cardToken = React.useRef(0);
  storeRef.current = store;
  revealedRef.current = revealed;
  const today = Engine.todayISO();

  React.useEffect(function () {
    const synth = window.speechSynthesis;
    if (!synth) return undefined;
    const load = function () { voices.current = synth.getVoices(); };
    load();
    synth.addEventListener("voiceschanged", load);
    return function () { synth.removeEventListener("voiceschanged", load); };
  }, []);

  function persist(next) {
    Engine.save(next);
    setStore(next);
  }

  function makeSessionKey(nextStore, count) {
    return Engine.sessionSignature(nextStore, count) + "|a" + Engine.aheadBoost(nextStore, today);
  }

  const bankId = store.bank || "前面";
  const practiceWords = words.filter(function (item) { return !(store.hidden && store.hidden[String(item.id)]); });
  const bankWords = Engine.inBank(practiceWords, bankId);
  const bankInfo = Engine.bankList().filter(function (item) { return item.id === bankId; })[0] || Engine.bankList()[0];

  React.useEffect(function () {
    const daily = Math.max(1, store.dailyNew || 10);
    const expectedDays = Math.ceil((bankWords.length || 1) / daily);
    const needsFit = store.totalDays !== expectedDays;
    const fitted = needsFit
      ? Engine.planFromCount(Math.min(80, Math.max(5, daily)), bankWords.length || 1)
      : { dailyNew: store.dailyNew, totalDays: store.totalDays };
    const working = needsFit
      ? Object.assign({}, store, { bank: bankId, totalDays: fitted.totalDays, dailyNew: fitted.dailyNew })
      : store;
    const built = Engine.dayQueue(bankWords, working, today);
    setPack(built);
    if (!working.planned) {
      if (working !== store) persist(working);
      return;
    }
    const signature = makeSessionKey(working, bankWords.length);
    const freshSession = working !== store || working.sessionDay !== today || working.sessionKey !== signature || !Array.isArray(working.sessionQueue) || !working.sessionQueue.length;
    if (!freshSession) return;
    const ids = built.queue.map(function (item) { return item.id; });
    persist(Object.assign({}, working, {
      sessionDay: today,
      sessionKey: signature,
      sessionBase: ids,
      sessionQueue: ids.slice(),
      listenDay: today,
      listenIndex: 0,
      speakDay: today,
      speakIndex: 0
    }));
  }, [store.bank, store.startDate, store.dailyNew, store.totalDays, store.planned, store.bankedAhead, store.aheadPending, store.aheadDate, today, store.hidden]);

  React.useEffect(function () {
    setDraftDays(store.totalDays);
    setDraftCount(store.dailyNew);
    setDraftStart(store.startDate);
  }, [store.totalDays, store.dailyNew, store.startDate]);

  const bookMode = screen === "bookListen" || screen === "bookSpeak";
  const randomListen = screen === "randomListen";
  const randomSpeak = screen === "randomSpeak";
  const randomMode = randomListen || randomSpeak;
  const speaking = screen === "speak" || screen === "bookSpeak" || randomSpeak;
  const listeningMode = screen === "listen" || screen === "bookListen" || randomListen;
  let activeIds = store.sessionQueue || [];
  let activeIndex = store.listenIndex || 0;
  if (randomMode) {
    activeIds = store.randomQueue || [];
    activeIndex = store.randomIndex || 0;
  } else if (screen === "speak") {
    activeIds = store.sessionBase || [];
    activeIndex = store.speakIndex || 0;
  } else if (bookMode) {
    activeIds = store.bookQueue || [];
    activeIndex = store.bookIndex || 0;
  }
  const activeQueue = activeIds.map(function (id) { return byId[id]; }).filter(Boolean);
  const index = Math.min(activeIndex, activeQueue.length);
  const word = activeQueue[index];
  const openIds = Engine.openIds(store.mistakes || {});
  const remainSet = {};
  (store.sessionQueue || []).slice(store.listenIndex || 0).forEach(function (id) { remainSet[id] = true; });
  const baseIds = store.sessionBase || [];
  const mastered = baseIds.filter(function (id) { return !remainSet[id]; }).length;

  function play(text, mark) {
    const token = ++speakToken.current;
    setPlaying(true);
    setPlayingMark(mark || "");
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    window.setTimeout(function () {
      if (token !== speakToken.current) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      utter.rate = tw.rate;
      const voice = pickVoice(voices.current.length ? voices.current : synth.getVoices());
      if (voice) utter.voice = voice;
      synth.speak(utter);
    }, 60);
    window.setTimeout(function () {
      if (token === speakToken.current) {
        setPlaying(false);
        setPlayingMark("");
      }
    }, Math.max(900, String(text || "").length * 90));
  }

  React.useEffect(function () {
    if (!listeningMode || !word) return undefined;
    revealedRef.current = false;
    setCanChoose(false);
    setRevealed(false);
    setTimedOut(false);
    setHoldLabel("");
    play(word.say);
    return function () {
      speakToken.current += 1;
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [screen, word && word.id, index]);

  React.useEffect(function () {
    cardToken.current += 1;
    setHeard("");
    setVerdict(null);
    setShowAnswer(false);
    setSpeechError("");
    setListening(false);
    if (recRef.current) {
      try { recRef.current.abort(); } catch (err) {}
      recRef.current = null;
    }
  }, [screen, word && word.id, index]);

  React.useEffect(function () {
    if (!listeningMode || !word || revealed) return undefined;
    choiceRef.current = false;
    setSeconds(5);
    const started = Date.now();
    const tick = window.setInterval(function () {
      setSeconds(Math.max(0, 5 - Math.floor((Date.now() - started) / 1000)));
    }, 200);
    const timer = window.setTimeout(function () {
      if (choiceRef.current || revealedRef.current) return;
      markMiss("unfamiliar");
    }, 5000);
    return function () {
      window.clearInterval(tick);
      window.clearTimeout(timer);
    };
  }, [screen, word ? word.id : -1, index, revealed]);

  function setIndex(nextIndex) {
    if (listeningMode) {
      revealedRef.current = false;
      setCanChoose(false);
      setRevealed(false);
      setTimedOut(false);
      setHoldLabel("");
    }
    setHeard("");
    setVerdict(null);
    setShowAnswer(false);
    setSpeechError("");
    if (randomMode) persist(Object.assign({}, store, { randomIndex: nextIndex }));
    else if (bookMode) persist(Object.assign({}, store, { bookIndex: nextIndex }));
    else if (speaking) persist(Object.assign({}, store, { speakIndex: nextIndex, speakDay: today }));
    else persist(Object.assign({}, store, { listenIndex: nextIndex, listenDay: today }));
  }

  function markMiss(kind) {
    if (!word || choiceRef.current) return;
    choiceRef.current = true;
    const current = storeRef.current;
    const id = word.id;
    const inBook = screen === "bookListen";
    const inRandom = screen === "randomListen";
    const mistakes = Engine.noteMistake(current.mistakes || {}, id, kind, today);
    const grades = Object.assign({}, current.grades);
    grades[String(id)] = { grade: kind, next: Engine.addDays(today, 1), at: today };
    let queue = (inRandom ? current.randomQueue : inBook ? current.bookQueue : current.sessionQueue || []).slice();
    queue = Engine.insertAgain(queue, index, id, 3);
    const next = Object.assign({}, current, {
      mistakes: mistakes,
      grades: grades,
      listenDay: today,
      log: Engine.bumpDay(current.log, today, { listen: 1, miss: 1 }, id)
    });
    if (inRandom) next.randomQueue = queue;
    else if (inBook) next.bookQueue = queue;
    else next.sessionQueue = queue;
    setHoldLabel(kind);
    setTimedOut(kind === "unfamiliar");
    setCanChoose(false);
    revealedRef.current = true;
    setRevealed(true);
    persist(next);
  }

  function openDetail() {
    if (!word || revealedRef.current || choiceRef.current) return;
    revealedRef.current = true;
    setCanChoose(true);
    setTimedOut(false);
    setHoldLabel("");
    setRevealed(true);
  }

  function goBack() {
    choiceRef.current = true;
    const target = done ? activeQueue.length - 1 : index - 1;
    if (target < 0) return;
    setIndex(target);
  }

  function goNext() {
    choiceRef.current = true;
    setIndex(index + 1);
  }

  function rate(grade) {
    if (!word) return;
    choiceRef.current = true;
    setTimedOut(false);
    setHoldLabel("");
    setRevealed(false);
    const id = word.id;
    let mistakes = store.mistakes || {};
    const grades = Object.assign({}, store.grades);
    let queue = (randomListen ? store.randomQueue : bookMode ? store.bookQueue : store.sessionQueue).slice();
    if (grade === "know") {
      const struggled = mistakes[String(id)] && mistakes[String(id)].open;
      if (bookMode) {
        mistakes = Engine.closeMistake(mistakes, id);
        grades[String(id)] = { grade: "know", next: Engine.addDays(today, 5), at: today };
        queue = queue.filter(function (item, at) { return at <= index || item !== id; });
      } else {
        grades[String(id)] = {
          grade: "know",
          next: Engine.addDays(today, struggled ? 1 : 5),
          at: today
        };
      }
    } else {
      mistakes = Engine.noteMistake(mistakes, id, grade, today);
      grades[String(id)] = { grade: grade, next: Engine.addDays(today, 1), at: today };
      queue = Engine.insertAgain(queue, index, id, 3);
    }
    const next = Object.assign({}, store, {
      mistakes: mistakes,
      grades: grades,
      listenDay: today,
      log: Engine.bumpDay(store.log, today, grade === "know" ? { listen: 1, know: 1 } : { listen: 1, miss: 1 }, id)
    });
    if (randomListen) {
      next.randomQueue = queue;
      next.randomIndex = index + 1;
    } else if (bookMode) {
      next.bookQueue = queue;
      next.bookIndex = index + 1;
    } else {
      next.sessionQueue = queue;
      next.listenIndex = index + 1;
      if (grade === "know" && index + 1 >= queue.length && next.aheadDate === today && (next.aheadPending || 0) > (next.bankedAhead || 0)) {
        next.bankedAhead = next.aheadPending;
      }
    }
    persist(next);
    if (!bookMode && !randomListen && tw.thenSpeak && index + 1 >= queue.length) setScreen("speak");
  }

  function startMic() {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      setSpeechError("这台浏览器不能识别发音。请用 Chrome 或 Edge，并允许麦克风。");
      return;
    }
    const currentWord = word;
    const spokenIndex = index;
    const token = cardToken.current;
    const inBookSpeak = screen === "bookSpeak";
    const rec = new Rec();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.maxAlternatives = 4;
    rec.continuous = false;
    let finalText = "";
    let recorded = false;
    let settled = false;
    rec.onresult = function (event) {
      if (token !== cardToken.current) return;
      const last = event.results[event.results.length - 1];
      let best = last[0];
      for (let i = 1; i < last.length; i++) {
        const altScore = Engine.judge(currentWord, last[i].transcript, tw.strictness).score;
        const bestScore = Engine.judge(currentWord, best.transcript, tw.strictness).score;
        if (altScore > bestScore) best = last[i];
      }
      finalText = best.transcript;
      setHeard(finalText);
      if (last.isFinal) {
        settled = true;
        const judged = Engine.judge(currentWord, finalText, tw.strictness);
        setVerdict(judged);
        setShowAnswer(true);
        if (!recorded) {
          recorded = true;
          noteSpeak(currentWord.id, judged.label, spokenIndex, inBookSpeak);
        }
      }
    };
    rec.onerror = function (event) {
      if (token !== cardToken.current) return;
      if (event.error === "not-allowed") setSpeechError("麦克风被关掉了。请在浏览器地址栏允许使用麦克风。");
      else if (event.error !== "aborted") setSpeechError("没有听清。再靠近一点说一次。");
      setListening(false);
    };
    rec.onend = function () {
      if (token !== cardToken.current) return;
      setListening(false);
      if (finalText && !settled) {
        settled = true;
        const judged = Engine.judge(currentWord, finalText, tw.strictness);
        setVerdict(judged);
        setShowAnswer(true);
        if (!recorded) {
          recorded = true;
          noteSpeak(currentWord.id, judged.label, spokenIndex, inBookSpeak);
        }
      }
    };
    recRef.current = rec;
    setSpeechError("");
    setListening(true);
    setVerdict(null);
    rec.start();
  }

  function stopMic() {
    if (recRef.current) recRef.current.stop();
  }

  function savePlan() {
    const plan = Engine.planFromDays(draftDays, bankWords.length || 1);
    const countPlan = Number(draftCount) === plan.dailyNew
      ? plan
      : Engine.planFromCount(draftCount, bankWords.length || 1);
    const nextStore = Object.assign({}, store, {
      planned: true,
      startDate: draftStart || today,
      totalDays: countPlan.totalDays,
      dailyNew: countPlan.dailyNew,
      bank: bankId,
      listenDay: today,
      listenIndex: 0,
      speakDay: today,
      speakIndex: 0,
      bankedAhead: 0,
      aheadPending: 0,
      aheadDate: ""
    });
    const ids = Engine.dayQueue(bankWords, nextStore, today).queue.map(function (item) { return item.id; });
    nextStore.sessionDay = today;
    nextStore.sessionKey = makeSessionKey(nextStore, bankWords.length);
    nextStore.sessionBase = ids;
    nextStore.sessionQueue = ids.slice();
    persist(nextStore);
    setDraftDays(countPlan.totalDays);
    setDraftCount(countPlan.dailyNew);
    setScreen("listen");
  }

  function onDays(value) {
    const plan = Engine.planFromDays(value, bankWords.length || 1);
    setDraftDays(plan.totalDays);
    setDraftCount(plan.dailyNew);
  }

  function onCount(value) {
    const plan = Engine.planFromCount(value, bankWords.length || 1);
    setDraftDays(plan.totalDays);
    setDraftCount(plan.dailyNew);
  }

  function enterBank(nextBank) {
    const list = Engine.inBank(practiceWords, nextBank);
    const states = Engine.bankStates(practiceWords, bankId, store.grades, store.mistakes);
    const target = states.filter(function (item) { return item.id === nextBank; })[0];
    if (!target || !target.unlocked) return;
    const plan = Engine.planFromCount(Math.min(80, Math.max(5, store.dailyNew || 10)), list.length || 1);
    const nextStore = Object.assign({}, store, {
      bank: nextBank,
      planned: true,
      totalDays: plan.totalDays,
      dailyNew: plan.dailyNew,
      listenIndex: 0,
      speakIndex: 0,
      listenDay: today,
      speakDay: today,
      bankedAhead: 0,
      aheadPending: 0,
      aheadDate: ""
    });
    const ids = Engine.dayQueue(list, nextStore, today).queue.map(function (item) { return item.id; });
    nextStore.sessionDay = today;
    nextStore.sessionKey = makeSessionKey(nextStore, list.length);
    nextStore.sessionBase = ids;
    nextStore.sessionQueue = ids.slice();
    persist(nextStore);
    setScreen("listen");
  }

  function submitAuth() {
    const result = authMode === "register"
      ? Engine.register(authName, authPass, store)
      : Engine.login(authName, authPass, words.length);
    if (!result.ok) {
      setAuthError(result.error);
      return;
    }
    setAuthError("");
    setAuthPass("");
    setUserName(result.name);
    if (authMode === "login") {
      setStore(result.store);
      setDraftDays(result.store.totalDays);
      setDraftCount(result.store.dailyNew);
      setDraftStart(result.store.startDate);
    }
  }

  function signOut() {
    const result = Engine.logout(words.length);
    setUserName("");
    setStore(result.store);
    setDraftDays(result.store.totalDays);
    setDraftCount(result.store.dailyNew);
    setDraftStart(result.store.startDate);
    setScreen("me");
  }

  function sameIds(left, right) {
    if (left.length !== right.length) return false;
    const seen = {};
    left.forEach(function (id) { seen[id] = true; });
    return right.every(function (id) { return seen[id]; });
  }

  function shuffleIds(ids, avoidFirst) {
    const copy = ids.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    if (copy.length > 1 && avoidFirst != null && copy[0] === avoidFirst) copy.push(copy.shift());
    return copy;
  }

  function noteSpeak(wordId, label, spokenIndex, inBookSpeak) {
    const current = storeRef.current;
    let mistakes = current.mistakes || {};
    let bookQueue = (current.bookQueue || []).slice();
    let bookSpeakDone = (current.bookSpeakDone || []).slice();
    let speakPatch = null;
    if (label === "未对上") {
      mistakes = Engine.noteMistake(mistakes, wordId, "speak", today);
      speakPatch = { speak: 1, speakMiss: 1 };
    } else if (label === "正确") speakPatch = { speak: 1, speakOk: 1 };
    else if (label === "接近") speakPatch = { speak: 1, speakNear: 1 };
    if (inBookSpeak && (label === "正确" || label === "接近")) {
      if (bookSpeakDone.indexOf(wordId) < 0) bookSpeakDone.push(wordId);
      bookQueue = bookQueue.filter(function (item, at) { return at <= spokenIndex || item !== wordId; });
      if (label === "正确") {
        const mark = mistakes[String(wordId)];
        const listenMiss = mark && ((mark.vague || 0) + (mark.forgot || 0) + (mark.unfamiliar || 0) > 0);
        if (!listenMiss) mistakes = Engine.closeMistake(mistakes, wordId);
      }
    }
    persist(Object.assign({}, current, {
      mistakes: mistakes,
      bookQueue: bookQueue,
      bookSpeakDone: bookSpeakDone,
      bookSpeakDay: today,
      log: speakPatch ? Engine.bumpDay(current.log, today, speakPatch, wordId) : current.log
    }));
  }

  function startBook(kind, forceNew) {
    const hidden = store.hidden || {};
    let ids = Engine.openIds(store.mistakes || {}).filter(function (id) { return !hidden[String(id)]; });
    let doneIds = store.bookSpeakDay === today ? (store.bookSpeakDone || []) : [];
    if (kind === "bookSpeak" && !forceNew) {
      const done = {};
      doneIds.forEach(function (id) { done[id] = true; });
      const pending = ids.filter(function (id) { return !done[id]; });
      if (pending.length) ids = pending;
      else if (doneIds.length) forceNew = true;
    }
    if (forceNew) doneIds = [];
    if (!ids.length) return;
    const prev = store.bookQueue || [];
    const at = store.bookIndex || 0;
    const resume = !forceNew && store.bookKind === kind && at > 0 && at < prev.length && sameIds(prev, ids);
    const queue = resume ? prev : (kind === "bookSpeak" ? shuffleIds(ids, store.bookSpeakLead) : ids.slice());
    persist(Object.assign({}, store, {
      bookQueue: queue,
      bookIndex: resume ? at : 0,
      bookKind: kind,
      bookSpeakDone: doneIds,
      bookSpeakLead: queue.length ? queue[0] : null,
      bookSpeakDay: today
    }));
    setScreen(kind);
  }

  function toggleFavorite(id) {
    const favorites = Object.assign({}, store.favorites || {});
    const key = String(id);
    if (favorites[key]) delete favorites[key];
    else favorites[key] = true;
    persist(Object.assign({}, store, { favorites: favorites }));
  }

  function toggleHidden(id) {
    const hidden = Object.assign({}, store.hidden || {});
    const key = String(id);
    if (hidden[key]) delete hidden[key];
    else hidden[key] = true;
    persist(Object.assign({}, store, { hidden: hidden }));
  }

  function dropMistake(id) {
    const grades = Object.assign({}, store.grades);
    grades[String(id)] = { grade: "know", next: Engine.addDays(today, 5), at: today };
    const bookQueue = (store.bookQueue || []).filter(function (item) { return item !== id; });
    let bookIndex = store.bookIndex || 0;
    if (bookIndex > bookQueue.length) bookIndex = bookQueue.length;
    persist(Object.assign({}, store, {
      grades: grades,
      mistakes: Engine.closeMistake(store.mistakes || {}, id),
      bookQueue: bookQueue,
      bookIndex: bookIndex
    }));
  }

  function studyAhead() {
    const boost = Engine.aheadBoost(store, today);
    setRevealed(false);
    setCanChoose(false);
    revealedRef.current = false;
    persist(Object.assign({}, store, {
      aheadPending: boost + 1,
      aheadDate: today
    }));
    setScreen("listen");
  }

  function startRandom(kind) {
    const ids = bankWords.map(function (item) { return item.id; });
    if (!ids.length) return;
    const queue = shuffleIds(ids, store.randomLead);
    setRevealed(false);
    setCanChoose(false);
    revealedRef.current = false;
    persist(Object.assign({}, store, {
      randomQueue: queue,
      randomIndex: 0,
      randomKind: kind,
      randomLead: queue[0]
    }));
    setScreen(kind === "speak" ? "randomSpeak" : "randomListen");
  }

  function replayToday() {
    setRevealed(false);
    persist(Object.assign({}, store, {
      sessionQueue: (store.sessionBase || []).slice(),
      listenIndex: 0,
      listenDay: today
    }));
  }

  const done = word == null;
  const progress = baseIds.length ? mastered / baseIds.length : 0;
  const bookProgress = activeQueue.length ? Math.min(1, index / activeQueue.length) : 0;
  const bar = bookMode || speaking || randomListen ? bookProgress : progress;
  const practiceOpenIds = openIds.filter(function (id) { return !(store.hidden && store.hidden[String(id)]); });
  const openCount = practiceOpenIds.length;
  const hiddenOpenCount = openIds.length - openCount;
  const dayLog = store.log || {};
  const streak = Engine.streakCount(dayLog, today);
  const checkedDays = Object.keys(dayLog).filter(function (key) { return Engine.dayActive(dayLog[key]); });
  const monthKey = calMonth.y + "-" + (calMonth.m < 9 ? "0" : "") + (calMonth.m + 1);
  const monthCount = checkedDays.filter(function (key) { return key.indexOf(monthKey) === 0; }).length;
  const todayEntry = dayLog[today];
  const todayOn = Engine.dayActive(todayEntry);
  const calCells = Engine.monthCells(calMonth.y, calMonth.m);
  const pickedEntry = dayLog[calDay] || {};
  const pickedOn = Engine.dayActive(pickedEntry);
  const pickedWords = Object.keys(pickedEntry.words || {}).length;
  const nowMonth = new Date();
  const canNextMonth = calMonth.y < nowMonth.getFullYear() || (calMonth.y === nowMonth.getFullYear() && calMonth.m < nowMonth.getMonth());

  function shiftMonth(delta) {
    setCalMonth(function (prev) {
      const nextDate = new Date(prev.y, prev.m + delta, 1);
      const next = { y: nextDate.getFullYear(), m: nextDate.getMonth() };
      const cap = new Date();
      if (next.y > cap.getFullYear() || (next.y === cap.getFullYear() && next.m > cap.getMonth())) return prev;
      return next;
    });
  }

  function dayText(value) {
    const parts = String(value || "").split("-");
    if (parts.length < 3) return "";
    return Number(parts[1]) + "月" + Number(parts[2]) + "日";
  }

  function practiceLine(entry) {
    const parts = [];
    if ((entry.listen || 0) > 0) parts.push("听写认识 " + (entry.know || 0) + " 个，没记住 " + (entry.miss || 0) + " 个");
    if ((entry.speak || 0) > 0) parts.push("口述正确 " + (entry.speakOk || 0) + " 个，接近 " + (entry.speakNear || 0) + " 个，没对上 " + (entry.speakMiss || 0) + " 个");
    return parts.join("；");
  }

  const bankOrder = Engine.bankList();
  const bankPos = bankOrder.findIndex(function (item) { return item.id === bankId; });
  const nextBank = bankPos >= 0 && bankPos < bankOrder.length - 1 ? bankOrder[bankPos + 1] : null;
  const currentStat = Engine.bankStat(practiceWords, bankId, store.grades, store.mistakes);
  const listenWaiting = listeningMode && !revealed && !!word && (store.planned || randomListen);

  function onListenSurfaceClick(event) {
    if (!listenWaiting) return;
    const target = event.target;
    if (target && target.closest && target.closest("button, a, input, textarea, select, label")) return;
    openDetail();
  }

  return (
    <div className={(speaking && store.planned && word ? "app practice" : "app") + (listenWaiting ? " listen-open" : "")} onClick={onListenSurfaceClick}>
      <header className="topbar">
        <div className="brand">
          <b>听写室</b>
          <span>{userName ? userName + " · " : ""}{bankInfo.title} · 第 {pack.day + 1} / {store.totalDays} 天{pack.batch > pack.day ? " · 提前到第 " + (pack.batch + 1) + " 天" : ""} · 错题 {openCount}</span>
        </div>
        <nav className="nav">
          <button type="button" aria-current={screen === "listen" ? "page" : undefined} onClick={function () { setScreen("listen"); }}><IconHeadphones /><span>听写</span></button>
          <button type="button" aria-current={screen === "speak" ? "page" : undefined} onClick={function () { setScreen("speak"); }}><IconMic /><span>口述</span></button>
          <button type="button" aria-current={screen === "random" || randomMode ? "page" : undefined} onClick={function () { setScreen("random"); }}><IconShuffle /><span>随机</span></button>
          <button type="button" aria-current={screen === "book" || bookMode ? "page" : undefined} onClick={function () { setScreen("book"); }}><IconNotebook /><span>错题</span></button>
          <button type="button" aria-current={screen === "banks" || screen === "browse" ? "page" : undefined} onClick={function () { setScreen("banks"); }}><IconLayers /><span>词库</span></button>
          <button type="button" aria-current={screen === "me" || screen === "plan" ? "page" : undefined} onClick={function () { setScreen("me"); }}><IconUser /><span>我的</span></button>
        </nav>
      </header>

      {(screen === "listen" || screen === "speak" || bookMode) && !store.planned ? (
        <main className="stage" data-screen-label="先定计划">
          <section className="sheet">
            <p className="kicker">{bankInfo.title}</p>
            <h1>先定每天听多少</h1>
            <p className="explain">每天的新词和天数在「我的」里。定好之后，听写、口述和错题才会按这个计划走。</p>
            <div className="done-actions">
              <button type="button" className="primary" onClick={function () { setScreen("me"); }}>去我的</button>
            </div>
          </section>
        </main>
      ) : null}

      {listeningMode && (store.planned || randomListen) ? (
        <main
          className="stage"
          data-screen-label={randomListen ? "随机听写" : bookMode ? "错题听写" : "听写"}
        >
          <div className="progress" aria-hidden="true"><i style={{ width: (bar * 100) + "%" }}></i></div>
          <p className="quiet">{randomListen
            ? "随机听写 · " + (activeQueue.length ? Math.min(activeQueue.length, done ? activeQueue.length : index + 1) : 0) + " / " + activeQueue.length
            : bookMode
            ? "错题听写 · 还剩 " + (function () {
              const left = {};
              activeIds.slice(index).forEach(function (id) { left[id] = true; });
              return Object.keys(left).length;
            })() + " 个，选知道意思后移出"
            : "已掌握 " + mastered + " / " + (baseIds.length || 0) + " · 还在循环 " + Math.max(0, baseIds.length - mastered)}</p>
          {done ? (
            <section className="sheet">
              <p className="kicker">{randomListen ? "随机" : bookMode ? "错题本" : "听写"}</p>
              <h1>{randomListen ? "这一轮随机听完了" : bookMode ? "这本听完了" : "今天的听写听完了"}</h1>
              <p className="explain">{randomListen
                ? "这一库是打乱练的，不占今天的新词名额。没记住的词还在错题本里。"
                : bookMode
                ? "刚刚选过知道意思的词已经移出错题本。"
                : "今天这些词你都选过知道意思。模糊和完全不记得的还在错题本里，可以再练。" + (pack.hasNext ? " 也可以先学下一天的新词，明天这些词就不会再当新词。" : "")}</p>
              <div className="done-actions">
                <button type="button" className="ghost" disabled={!activeQueue.length} onClick={goBack}>上一个</button>
                {randomListen ? (
                  <React.Fragment>
                    <button type="button" className="primary" onClick={function () { startRandom("listen"); }}>换个顺序再来</button>
                    <button type="button" className="ghost" onClick={function () { setScreen("random"); }}>回到随机</button>
                  </React.Fragment>
                ) : bookMode ? (
                  <button type="button" className="primary" onClick={function () { setScreen("book"); }}>回到错题本</button>
                ) : (
                  <React.Fragment>
                    {pack.hasNext ? (
                      <button type="button" className="primary" onClick={studyAhead}>提前学下一天</button>
                    ) : null}
                    {nextBank ? (
                      <button type="button" className="ghost" onClick={function () { enterBank(nextBank.id); }}>进入{nextBank.title}</button>
                    ) : null}
                    <button type="button" className="ghost" onClick={function () { setScreen("speak"); }}>开始口述</button>
                    <button type="button" className="ghost" onClick={function () { setScreen("book"); }}>去错题本</button>
                    <button type="button" className="ghost" onClick={replayToday}>再听一遍今天</button>
                  </React.Fragment>
                )}
              </div>
            </section>
          ) : (
            <React.Fragment>
              {!revealed ? (
                <div className="cup-wrap listen-tap">
                  <div className="cup">
                    <Wave active={playing} />
                    <small>{seconds}</small>
                  </div>
                  <button type="button" className={"replay" + (playing && playingMark === "again" ? " is-on" : "")} aria-label="再听一次" onClick={function () { play(word.say, "again"); }}>
                    <IconSpeaker />
                  </button>
                  <p className="hint">点一下看这个词。5 秒没点会直接出现，这次不能选</p>
                  <div className="choices">
                    <button type="button" className="ghost" disabled={index <= 0} onClick={goBack}>上一个</button>
                  </div>
                </div>
              ) : (
                <section className="sheet">
                  <p className="kicker">{canChoose ? "看过再选" : holdLabel === "vague" ? "模糊" : holdLabel === "forgot" ? "完全不记得" : "还不熟悉"}</p>
                  <div className="word-head">
                    <h1>{word.en}</h1>
                    {word.tag === "游戏" ? <p className="tags"><span className="tag game">游戏行业</span></p> : null}
                    <p className="ipa">{word.ipa ? "/" + word.ipa + "/" : ""}</p>
                  </div>
                  <p className="gloss">{word.gloss}</p>
                  <p className="explain">{word.explain}</p>
                  <div className="choices">
                    {canChoose ? (
                      <React.Fragment>
                        <button type="button" className="ghost" disabled={index <= 0} onClick={goBack}>上一个</button>
                        <button type="button" className="know" onClick={function () { rate("know"); }}>知道意思</button>
                        <button type="button" className="vague" onClick={function () { markMiss("vague"); }}>模糊</button>
                        <button type="button" className="forgot" onClick={function () { markMiss("forgot"); }}>完全不记得</button>
                        <button type="button" className={"icon-btn" + (playing && playingMark === "again" ? " is-on" : "")} aria-label="再听一次" onClick={function () { play(word.say, "again"); }}>
                          <IconSpeaker />
                        </button>
                      </React.Fragment>
                    ) : timedOut ? (
                      <button type="button" className="primary" onClick={goNext}>下一个</button>
                    ) : (
                      <React.Fragment>
                        <button type="button" className="ghost" disabled={index <= 0} onClick={goBack}>上一个</button>
                        <button type="button" className="primary" onClick={goNext}>下一个</button>
                        <button type="button" className={"icon-btn" + (playing && playingMark === "again" ? " is-on" : "")} aria-label="再听一次" onClick={function () { play(word.say, "again"); }}>
                          <IconSpeaker />
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                </section>
              )}
            </React.Fragment>
          )}
        </main>
      ) : null}

      {speaking && (store.planned || randomSpeak) ? (
        <main className={done ? "stage" : "stage fit"} data-screen-label={randomSpeak ? "随机口述" : bookMode ? "错题口述" : "口述"}>
          <div className="progress" aria-hidden="true"><i style={{ width: ((activeQueue.length ? Math.min(1, index / activeQueue.length) : 0) * 100) + "%" }}></i></div>
          <p className="quiet">{randomSpeak ? "随机口述" : bookMode ? "错题口述" : "看中文说英文"} · {done ? activeQueue.length : index + 1} / {activeQueue.length || 0}</p>
          {done ? (
            <section className="sheet">
              <p className="kicker">{randomSpeak ? "随机" : "口述"}</p>
              <h1>{randomSpeak ? "这一轮随机说完了" : bookMode ? "这本说完了" : "今天这组说完了"}</h1>
              <p className="explain">{randomSpeak
                ? "这一库是打乱说的。发音没对上的词会记进错题本。"
                : bookMode
                ? "说对的词已经从这一轮拿掉。如果它只是因为发音进来的，也会移出错题本。听写里没记住的还会留着。"
                : "发音没对上的词会记进错题本。听写里没掌握的词，第二天还会再出现。"}</p>
              <div className="done-actions">
                <button type="button" className="ghost" disabled={!activeQueue.length} onClick={goBack}>上一个</button>
                {randomSpeak ? (
                  <button type="button" className="ghost" onClick={function () { startRandom("speak"); }}>换个顺序再来</button>
                ) : bookMode ? (
                  <button type="button" className="ghost" onClick={function () { startBook("bookSpeak", true); }}>换个顺序再来</button>
                ) : null}
                <button type="button" className="primary" onClick={function () { setScreen(randomSpeak ? "random" : bookMode ? "book" : "listen"); }}>{randomSpeak ? "回到随机" : bookMode ? "回到错题本" : "回到听写"}</button>
              </div>
            </section>
          ) : (
            <section className="sheet speak-sheet">
              <div className="word-head">
                <h1 className={showAnswer ? "word-en" : "word-pending"} aria-hidden={showAnswer ? undefined : true}>{showAnswer ? word.en : "\u00a0"}</h1>
                <p className="ipa">{showAnswer && word.ipa ? "/" + word.ipa + "/" : ""}</p>
                <div className="game-slot">{showAnswer && word.tag === "游戏" ? <span className="tag game">游戏行业</span> : null}</div>
              </div>
              <p className="gloss">{word.gloss}</p>
              <p className="explain">{word.explain}</p>
              <div className="feedback">
                {heard ? <p className="heard">你说的：{heard}</p> : null}
                {verdict ? (
                  <div className={"verdict " + (verdict.label === "正确" ? "ok" : verdict.label === "接近" ? "near" : "bad")}>
                    <b>{verdict.label}</b>
                  </div>
                ) : null}
                {speechError ? <p className="explain">{speechError}</p> : null}
              </div>
              <div className="speak-actions">
                <button type="button" className="ghost" disabled={index <= 0} onClick={goBack}>上一个</button>
                <button type="button" className={listening ? "mic-live" : "primary"} onClick={function () { listening ? stopMic() : startMic(); }}>
                  <IconMic />
                  {listening ? " 正在听" : " 开始说"}
                </button>
                <button type="button" className={"icon-btn" + (playing && playingMark === "answer" ? " is-on" : "")} aria-label="听正确发音" onClick={function () { setShowAnswer(true); play(word.say, "answer"); }}>
                  <IconSpeaker />
                </button>
                <button type="button" className="ghost" onClick={goNext}>下一个</button>
              </div>
            </section>
          )}
        </main>
      ) : null}

      {screen === "random" ? (
        <main className="stage" data-screen-label="随机练习">
          <section className="sheet">
            <p className="kicker">{bankInfo.title}</p>
            <h1>随机练习</h1>
            <p className="explain">把这一库 {bankWords.length} 个词打乱再练。听写还是点开以后再选，5 秒没点会记成还不熟悉。口述还是看中文说英文。这个练习不占今天的新词名额。</p>
            <div className="done-actions">
              <button type="button" className="primary" disabled={!bankWords.length} onClick={function () { startRandom("listen"); }}>随机听写</button>
              <button type="button" className="ghost" disabled={!bankWords.length} onClick={function () { startRandom("speak"); }}>随机口述</button>
            </div>
          </section>
        </main>
      ) : null}

      {screen === "book" ? (
        <main className="stage top" data-screen-label="错题本">
          <section className="sheet lilac">
            <p className="kicker">错题本</p>
            <h1>{openCount ? "还有 " + openCount + " 个要再认" : "这本是空的"}</h1>
            <p className="explain">听写里选过模糊、完全不记得，或 5 秒没选的词会留在这里，口述时发音没对上的也会进来。再点「口述这本」会换一个顺序，并从上次没说完的地方继续。说对的词会离开这一轮。{hiddenOpenCount ? " 另有 " + hiddenOpenCount + " 个已从练习里隐藏。" : ""}</p>
            <div className="done-actions">
              <button type="button" className="primary" disabled={!openCount} onClick={function () { startBook("bookListen"); }}>听写这本</button>
              <button type="button" className="ghost" disabled={!openCount} onClick={function () { startBook("bookSpeak"); }}>口述这本</button>
            </div>
          </section>
          {openIds.length ? (
            <div className="book-list">
              {openIds.map(function (id) {
                const item = byId[id];
                const mark = (store.mistakes || {})[String(id)];
                if (!item || !mark) return null;
                return (
                  <article className="book-row" key={id}>
                    <div>
                      <h2>{item.en}</h2>
                      {item.tag === "游戏" ? <p className="tags"><span className="tag game">游戏行业</span></p> : null}
                      {item.ipa ? <p className="ipa">/{item.ipa}/</p> : null}
                      <p className="gloss">{item.gloss}</p>
                      <p className="tags">
                        {store.hidden && store.hidden[String(id)] ? <span className="tag pm">已隐藏</span> : null}
                        {mark.unfamiliar ? <span className="tag forgot">还不熟悉 {mark.unfamiliar}</span> : null}
                        {mark.forgot ? <span className="tag forgot">完全不记得 {mark.forgot}</span> : null}
                        {mark.vague ? <span className="tag vague">模糊 {mark.vague}</span> : null}
                        {mark.speak ? <span className="tag speak">发音未对上 {mark.speak}</span> : null}
                      </p>
                    </div>
                    <div className="book-actions">
                      <button type="button" className={"icon-btn" + (playing && playingMark === "m" + id ? " is-on" : "")} aria-label={"听 " + item.en} onClick={function () { play(item.say, "m" + id); }}>
                        <IconSpeaker />
                      </button>
                      <button type="button" className="tool" aria-label="移出" title="移出" onClick={function () { dropMistake(id); }}><IconClose /></button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}
        </main>
      ) : null}

      {screen === "banks" ? (
        <main className="stage top" data-screen-label="词库">
          <section className="sheet lilac">
            <p className="kicker">词库</p>
            <h1>十个词库都可以进</h1>
            <p className="explain">不用先练完上一库。当前在练{bankInfo.title}，已认识 {currentStat.known} / {currentStat.total}。带「游戏行业」的，是游戏项目里常听到的词。</p>
          </section>
          <div className="book-list">
            {Engine.bankStates(practiceWords, bankId, store.grades, store.mistakes).map(function (item) {
              return (
                <article className={"bank-card" + (item.current ? " current" : "")} key={item.id}>
                  <div>
                    <p className="kicker">{item.status}</p>
                    <h2>{item.title}</h2>
                    <p className="explain">{item.detail}</p>
                    <p className="bank-meta">已认识 {item.known} / {item.total}{item.open ? " · 错题 " + item.open : ""}</p>
                  </div>
                  <div className="bank-actions">
                    <button type="button" className={item.current ? "ghost" : "primary"} onClick={function () { enterBank(item.id); }}>
                      {item.current ? "继续听写" : "进入这一库"}
                    </button>
                    <button type="button" className="tool list-tool" aria-label="单词表" title="单词表" onClick={function () { setBrowseBank(item.id); setBrowseFilter("all"); setScreen("browse"); }}><IconList /></button>
                  </div>
                </article>
              );
            })}
          </div>
        </main>
      ) : null}

      {screen === "browse" ? (
        <main className="stage top browse-stage" data-screen-label="单词表">
          {(function () {
            const info = Engine.bankList().filter(function (item) { return item.id === browseBank; })[0] || Engine.bankList()[0];
            const all = Engine.inBank(words, info.id);
            const gameWords = all.filter(function (item) { return item.tag === "游戏"; });
            const pmWords = all.filter(function (item) { return item.tag !== "游戏"; });
            const picked = browseFilter === "game" ? gameWords : browseFilter === "pm" ? pmWords : browseFilter === "saved" ? all.filter(function (item) { return store.favorites && store.favorites[String(item.id)]; }) : all;
            function renderLine(item) {
              const hidden = !!(store.hidden && store.hidden[String(item.id)]);
              const savedWord = !!(store.favorites && store.favorites[String(item.id)]);
              return (
                <article className={"word-line" + (hidden ? " is-hidden" : "") + (hideEn ? " zh-only" : "")} key={item.id}>
                  <button type="button" className={"icon-btn word-speak" + (playing && playingMark === "b" + item.id ? " is-on" : "")} aria-label={hideEn ? "听这个词" : "听 " + item.en} onClick={function () { play(item.say, "b" + item.id); }}>
                    <IconSpeaker />
                  </button>
                  <div className="line-main">
                    {hideEn ? (
                      <h2>{item.gloss}</h2>
                    ) : (
                      <React.Fragment>
                        <h2>{item.en}</h2>
                        <p className="ipa-row">
                          {item.ipa ? <span className="ipa">/{item.ipa}/</span> : null}
                          <span className="gloss">{item.gloss}</span>
                        </p>
                      </React.Fragment>
                    )}
                    {item.explain ? <p className="explain">{item.explain}</p> : null}
                    <span className={item.tag === "游戏" ? "tag game" : "tag pm"}>{item.tag === "游戏" ? "游戏行业" : "项目管理"}</span>
                  </div>
                  <div className="book-actions">
                    <button type="button" className={"tool" + (savedWord ? " is-on warm" : "")} aria-pressed={savedWord} aria-label={savedWord ? "取消收藏" : "收藏"} title={savedWord ? "取消收藏" : "收藏"} onClick={function () { toggleFavorite(item.id); }}><IconStar on={savedWord} /></button>
                    <button type="button" className={"tool" + (hidden ? " is-on soft" : "")} aria-pressed={hidden} aria-label={hidden ? "恢复" : "隐藏"} title={hidden ? "恢复" : "隐藏"} onClick={function () { toggleHidden(item.id); }}>{hidden ? <IconPlus /> : <IconMinus />}</button>
                  </div>
                </article>
              );
            }
            return (
              <React.Fragment>
                <section className="sheet lilac">
                  <p className="kicker">单词表</p>
                  <h1>{info.title}</h1>
                  <p className="explain">{hideEn
                    ? "英文和音标先藏起来。看着中文名词和概念自己说，再点喇叭对发音。"
                    : "这一库 " + all.length + " 个词。点喇叭听读音。音标旁边是中文译名，下面是这个词的概念。"}</p>
                  <div className="auth-switch">
                    <button type="button" aria-current={browseFilter === "all" ? "page" : undefined} onClick={function () { setBrowseFilter("all"); }}>全部</button>
                    <button type="button" aria-current={browseFilter === "game" ? "page" : undefined} onClick={function () { setBrowseFilter("game"); }}>游戏行业</button>
                    <button type="button" aria-current={browseFilter === "pm" ? "page" : undefined} onClick={function () { setBrowseFilter("pm"); }}>项目管理</button>
                    <button type="button" className="icon-chip" aria-label="收藏" title="收藏" aria-current={browseFilter === "saved" ? "page" : undefined} onClick={function () { setBrowseFilter("saved"); }}><IconStar on={browseFilter === "saved"} /></button>
                  </div>
                  <div className="browse-foot">
                    <button type="button" className="tool" aria-label="返回词库" title="返回词库" onClick={function () { setScreen("banks"); }}><IconBack /></button>
                  </div>
                  <button type="button" className={"corner-toggle" + (hideEn ? " is-on" : "")} aria-pressed={hideEn} aria-label={hideEn ? "显示英文" : "隐藏英文"} title={hideEn ? "显示英文" : "隐藏英文"} onClick={function () { setHideEn(function (on) { return !on; }); }}>
                    <IconEye off={hideEn} />
                  </button>
                </section>
                {picked.length ? (
                  <div className="book-list">
                    {browseFilter === "all" ? (
                      <React.Fragment>
                        {gameWords.length ? <p className="quiet">游戏行业</p> : null}
                        {gameWords.map(renderLine)}
                        {pmWords.length ? <p className="quiet">项目管理</p> : null}
                        {pmWords.map(renderLine)}
                      </React.Fragment>
                    ) : picked.map(renderLine)}
                  </div>
                ) : (
                  <section className="sheet"><p className="explain">这里还没有词。</p></section>
                )}
              </React.Fragment>
            );
          })()}
        </main>
      ) : null}

      {screen === "me" || screen === "plan" ? (
        <main className="stage top" data-screen-label="我的">
          <section className="sheet">
            <p className="kicker">{bankInfo.title}</p>
            <h1>每天听多少</h1>
            <p className="explain">这一库有 {bankWords.length} 个词。天数和每天的新词会互相算出另一个数。词库里每一库都可以直接进入。</p>
            <div className="plan">
              <label className="field">
                <span>用多少天过完</span>
                <input type="number" min="7" max="180" value={draftDays} onChange={function (event) { onDays(event.target.value); }} />
              </label>
              <label className="field">
                <span>每天新词</span>
                <input type="number" min="5" max="80" value={draftCount} onChange={function (event) { onCount(event.target.value); }} />
              </label>
            </div>
            <label className="field">
              <span>从哪一天开始</span>
              <input type="date" value={draftStart} onChange={function (event) { setDraftStart(event.target.value); }} />
            </label>
            <p className="explain">第 1 天先听这一库最常见的 {draftCount} 个。点开单词后再选知道意思、模糊或完全不记得。5 秒没点开会直接出现单词，并记成还不熟悉。</p>
            <div className="done-actions">
              <button type="button" className="primary" onClick={savePlan}>开始今天的听写</button>
            </div>
          </section>
          <section className="sheet mint">
            <p className="kicker">打卡</p>
            <h1>{checkedDays.length ? "连续 " + streak + " 天" : "还没有打卡"}</h1>
            <p className="explain">{todayOn
              ? "今天已经打卡。" + practiceLine(todayEntry) + "。"
              : (streak
                ? "今天还没打卡。连续天数还算着，听写里选一次，或者口述里说出一个词，就会接上。"
                : "听写里做出选择，或者口述里说出一个词，这一天就算打卡。只是打开页面不算。")}</p>
            <div className="cal-stats">
              <p>本月 {monthCount} 天</p>
              <p>累计 {checkedDays.length} 天</p>
            </div>
            <div className="cal-nav">
              <button type="button" className="tool" aria-label="上个月" title="上个月" onClick={function () { shiftMonth(-1); }}><IconChevron dir="left" /></button>
              <b>{calMonth.y}年{calMonth.m + 1}月</b>
              <button type="button" className="tool" aria-label="下个月" title="下个月" disabled={!canNextMonth} onClick={function () { shiftMonth(1); }}><IconChevron dir="right" /></button>
            </div>
            <div className="cal-week" aria-hidden="true">
              <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
            </div>
            <div className="cal-grid" aria-label="打卡日历">
              {calCells.map(function (iso, index) {
                if (!iso) return <span key={"pad-" + index}></span>;
                const on = Engine.dayActive(dayLog[iso]);
                const future = iso > today;
                return (
                  <button
                    key={iso}
                    type="button"
                    className={"cal-day" + (on ? " on" : "") + (iso === today ? " today" : "")}
                    aria-current={iso === calDay ? "date" : undefined}
                    aria-label={dayText(iso) + (on ? "，已打卡" : "，未打卡")}
                    disabled={future}
                    onClick={function () { setCalDay(iso); }}
                  >{Number(iso.slice(8))}</button>
                );
              })}
            </div>
            <div className="cal-detail">
              <p><b>{dayText(calDay)}</b>{pickedOn ? " · 已打卡" : " · 未打卡"}</p>
              {pickedOn ? (
                <React.Fragment>
                  <p>练过 {pickedWords} 个不同的词。</p>
                  {(pickedEntry.listen || 0) ? <p>听写：认识 {pickedEntry.know || 0}，没记住 {pickedEntry.miss || 0}。</p> : null}
                  {(pickedEntry.speak || 0) ? <p>口述：正确 {pickedEntry.speakOk || 0}，接近 {pickedEntry.speakNear || 0}，没对上 {pickedEntry.speakMiss || 0}。</p> : null}
                </React.Fragment>
              ) : (
                <p>{calDay > today ? "这一天还没到。" : "这一天还没听写，也没口述。"}</p>
              )}
            </div>
          </section>
          <section className="sheet lilac">
            <p className="kicker">我的</p>
            <h1>{userName ? userName : "还没有登录"}</h1>
            <p className="explain">{userName
              ? "这个账号的听写计划、词库进度和错题记在这台浏览器里。下次用同一个名字和密码登录，会回到现在的进度。"
              : "注册一个名字，当前的计划和进度会记到这个账号上。登录后换一台浏览器的进度不会跟着走。"}</p>
            {userName ? (
              <div className="me-stats">
                <p>当前词库 · {bankInfo.title}</p>
                <p>本库已认识 {Engine.bankStat(words, bankId, store.grades, store.mistakes).known} / {bankWords.length}</p>
                <p>今天第 {pack.day + 1} / {store.totalDays} 天 · 每天 {store.dailyNew} 个新词</p>
                <p>错题 {openCount}</p>
              </div>
            ) : null}
            {userName ? (
              <div className="done-actions">
                <button type="button" className="ghost" onClick={signOut}>退出登录</button>
              </div>
            ) : (
              <form className="auth" onSubmit={function (event) { event.preventDefault(); submitAuth(); }}>
                <div className="auth-switch">
                  <button type="button" aria-current={authMode === "login" ? "page" : undefined} onClick={function () { setAuthMode("login"); setAuthError(""); }}>登录</button>
                  <button type="button" aria-current={authMode === "register" ? "page" : undefined} onClick={function () { setAuthMode("register"); setAuthError(""); }}>注册</button>
                </div>
                <label className="field compact">
                  <span>名字</span>
                  <input value={authName} autoComplete="username" onChange={function (event) { setAuthName(event.target.value); }} />
                </label>
                <label className="field compact">
                  <span>密码</span>
                  <input type="password" value={authPass} autoComplete={authMode === "register" ? "new-password" : "current-password"} onChange={function (event) { setAuthPass(event.target.value); }} />
                </label>
                {authError ? <p className="explain">{authError}</p> : null}
                <div className="done-actions">
                  <button type="submit" className="primary">{authMode === "register" ? "注册并记住进度" : "登录"}</button>
                </div>
              </form>
            )}
          </section>
        </main>
      ) : null}

      <TweaksPanel title="风格">
        <TweakSection label="听写" />
        <TweakSlider label="语速" value={tw.rate} min={0.8} max={1.15} step={0.05} onChange={function (value) { setTweak("rate", value); }} />
        <TweakRadio label="发音宽严" value={tw.strictness} options={["宽松", "标准", "严格"]} onChange={function (value) { setTweak("strictness", value); }} />
        <TweakToggle label="听完进入口述" value={tw.thenSpeak} onChange={function (value) { setTweak("thenSpeak", value); }} />
      </TweaksPanel>
    </div>
  );
}

Object.assign(window, { App: App });
