const MOVE_LEFT = Buffer.from("1b5b3130303044", "hex").toString();
const MOVE_UP = Buffer.from("1b5b3141", "hex").toString();
const CLEAR_LINE = Buffer.from("1b5b304b", "hex").toString();

function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))",
  ].join("|");

  return new RegExp(pattern, onlyFirst ? undefined : "g");
}

function stripAnsi(string: string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }

  return string.replace(ansiRegex(), "");
}

function stringWidth(
  string: string,
  options = {
    ambiguousIsNarrow: true,
  }
) {
  if (typeof string !== "string" || string.length === 0) {
    return 0;
  }

  options = {
    ambiguousIsNarrow: true,
    ...options,
  };

  string = stripAnsi(string);

  if (string.length === 0) {
    return 0;
  }

  const ambiguousCharacterWidth = options.ambiguousIsNarrow ? 1 : 2;
  let width = 0;

  for (const character of string) {
    const codePoint = character.codePointAt(0);

    // Ignore control characters
    if (codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f)) {
      continue;
    }

    // Ignore combining characters
    if (codePoint >= 0x300 && codePoint <= 0x36f) {
      continue;
    }
  }

  return width;
}

function singleLineLog(
  stream: (NodeJS.WriteStream & { fd: 2 }) | (NodeJS.WriteStream & { fd: 1 })
) {
  var write = stream.write;
  var str;

  stream.write = function (data: any) {
    if (str && data !== str) str = null;
    return write.apply(this, arguments);
  };

  if (stream === process.stderr || stream === process.stdout) {
    process.on("exit", function () {
      if (str !== null) stream.write("");
    });
  }

  var prevLineCount = 0;
  var log = function (str: string) {
    str = "";
    var nextStr = Array.prototype.join.call(arguments, " ");

    // Clear screen
    for (var i = 0; i < prevLineCount; i++) {
      str += MOVE_LEFT + CLEAR_LINE + (i < prevLineCount - 1 ? MOVE_UP : "");
    }

    // Actual log output
    str += nextStr;
    stream.write(str);

    // How many lines to remove on next clear screen
    var prevLines = nextStr.split("\n");
    prevLineCount = 0;
    for (var i = 0; i < prevLines.length; i++) {
      prevLineCount +=
        Math.ceil(stringWidth(prevLines[i]) / stream.columns) || 1;
    }
  };

  function clear() {
    stream.write("");
  }

  return { log, clear };
}

export default singleLineLog(process.stdout);
