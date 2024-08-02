(() => {
  var e = {
      481: (e) => {
        e.exports = (function e(t, n, i) {
          function r(a, o) {
            if (!n[a]) {
              if (!t[a]) {
                if (s) return s(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw ((c.code = "MODULE_NOT_FOUND"), c);
              }
              var l = (n[a] = { exports: {} });
              t[a][0].call(
                l.exports,
                function (e) {
                  return r(t[a][1][e] || e);
                },
                l,
                l.exports,
                e,
                t,
                n,
                i
              );
            }
            return n[a].exports;
          }
          for (var s = void 0, a = 0; a < i.length; a++) r(i[a]);
          return r;
        })(
          {
            1: [
              function (e, t, n) {
                "use strict";
                var i = e("fs"),
                  r = e("path"),
                  s = e("./utils"),
                  a = !1,
                  o = e("../package.json").version,
                  c = "locals",
                  l = [
                    "delimiter",
                    "scope",
                    "context",
                    "debug",
                    "compileDebug",
                    "client",
                    "_with",
                    "rmWhitespace",
                    "strict",
                    "filename",
                    "async",
                  ],
                  d = l.concat("cache"),
                  u = /^\uFEFF/;
                function h(e, t) {
                  var r;
                  if (
                    t.some(function (t) {
                      return (r = n.resolveInclude(e, t, !0)), i.existsSync(r);
                    })
                  )
                    return r;
                }
                function m(e, t) {
                  var i,
                    r = e.filename,
                    s = arguments.length > 1;
                  if (e.cache) {
                    if (!r) throw new Error("cache option requires a filename");
                    if ((i = n.cache.get(r))) return i;
                    s || (t = f(r).toString().replace(u, ""));
                  } else if (!s) {
                    if (!r)
                      throw new Error(
                        "Internal EJS error: no file name or template provided"
                      );
                    t = f(r).toString().replace(u, "");
                  }
                  return (i = n.compile(t, e)), e.cache && n.cache.set(r, i), i;
                }
                function p(e, t, i) {
                  var r;
                  if (!i) {
                    if ("function" == typeof n.promiseImpl)
                      return new n.promiseImpl(function (n, i) {
                        try {
                          n((r = m(e)(t)));
                        } catch (e) {
                          i(e);
                        }
                      });
                    throw new Error("Please provide a callback function");
                  }
                  try {
                    r = m(e)(t);
                  } catch (e) {
                    return i(e);
                  }
                  i(null, r);
                }
                function f(e) {
                  return n.fileLoader(e);
                }
                function v(e, t) {
                  var r = s.shallowCopy({}, t);
                  if (
                    ((r.filename = (function (e, t) {
                      var r,
                        s,
                        a = t.views,
                        o = /^[A-Za-z]+:\\|^\//.exec(e);
                      if (o && o.length)
                        (e = e.replace(/^\/*/, "")),
                          (r = Array.isArray(t.root)
                            ? h(e, t.root)
                            : n.resolveInclude(e, t.root || "/", !0));
                      else if (
                        (t.filename &&
                          ((s = n.resolveInclude(e, t.filename)),
                          i.existsSync(s) && (r = s)),
                        !r && Array.isArray(a) && (r = h(e, a)),
                        !r && "function" != typeof t.includer)
                      )
                        throw new Error(
                          'Could not find the include file "' +
                            t.escapeFunction(e) +
                            '"'
                        );
                      return r;
                    })(e, r)),
                    "function" == typeof t.includer)
                  ) {
                    var a = t.includer(e, r.filename);
                    if (
                      a &&
                      (a.filename && (r.filename = a.filename), a.template)
                    )
                      return m(r, a.template);
                  }
                  return m(r);
                }
                function g(e, t, n, i, r) {
                  var s = t.split("\n"),
                    a = Math.max(i - 3, 0),
                    o = Math.min(s.length, i + 3),
                    c = r(n),
                    l = s
                      .slice(a, o)
                      .map(function (e, t) {
                        var n = t + a + 1;
                        return (n == i ? " >> " : "    ") + n + "| " + e;
                      })
                      .join("\n");
                  throw (
                    ((e.path = c),
                    (e.message =
                      (c || "ejs") + ":" + i + "\n" + l + "\n\n" + e.message),
                    e)
                  );
                }
                function b(e) {
                  return e.replace(/;(\s*$)/, "$1");
                }
                function x(e, t) {
                  t = t || {};
                  var i = {};
                  (this.templateText = e),
                    (this.mode = null),
                    (this.truncate = !1),
                    (this.currentLine = 1),
                    (this.source = ""),
                    (i.client = t.client || !1),
                    (i.escapeFunction =
                      t.escape || t.escapeFunction || s.escapeXML),
                    (i.compileDebug = !1 !== t.compileDebug),
                    (i.debug = !!t.debug),
                    (i.filename = t.filename),
                    (i.openDelimiter =
                      t.openDelimiter || n.openDelimiter || "<"),
                    (i.closeDelimiter =
                      t.closeDelimiter || n.closeDelimiter || ">"),
                    (i.delimiter = t.delimiter || n.delimiter || "%"),
                    (i.strict = t.strict || !1),
                    (i.context = t.context),
                    (i.cache = t.cache || !1),
                    (i.rmWhitespace = t.rmWhitespace),
                    (i.root = t.root),
                    (i.includer = t.includer),
                    (i.outputFunctionName = t.outputFunctionName),
                    (i.localsName = t.localsName || n.localsName || c),
                    (i.views = t.views),
                    (i.async = t.async),
                    (i.destructuredLocals = t.destructuredLocals),
                    (i.legacyInclude =
                      void 0 === t.legacyInclude || !!t.legacyInclude),
                    i.strict
                      ? (i._with = !1)
                      : (i._with = void 0 === t._with || t._with),
                    (this.opts = i),
                    (this.regex = this.createRegex());
                }
                (n.cache = s.cache),
                  (n.fileLoader = i.readFileSync),
                  (n.localsName = c),
                  (n.promiseImpl = new Function("return this;")().Promise),
                  (n.resolveInclude = function (e, t, n) {
                    var i = r.dirname,
                      s = r.extname,
                      a = (0, r.resolve)(n ? t : i(t), e);
                    return s(e) || (a += ".ejs"), a;
                  }),
                  (n.compile = function (e, t) {
                    return (
                      t &&
                        t.scope &&
                        (a ||
                          (console.warn(
                            "`scope` option is deprecated and will be removed in EJS 3"
                          ),
                          (a = !0)),
                        t.context || (t.context = t.scope),
                        delete t.scope),
                      new x(e, t).compile()
                    );
                  }),
                  (n.render = function (e, t, n) {
                    var i = t || {},
                      r = n || {};
                    return (
                      2 == arguments.length && s.shallowCopyFromList(r, i, l),
                      m(r, e)(i)
                    );
                  }),
                  (n.renderFile = function () {
                    var e,
                      t,
                      n,
                      i = Array.prototype.slice.call(arguments),
                      r = i.shift(),
                      a = { filename: r };
                    return (
                      "function" == typeof arguments[arguments.length - 1] &&
                        (e = i.pop()),
                      i.length
                        ? ((t = i.shift()),
                          i.length
                            ? s.shallowCopy(a, i.pop())
                            : (t.settings &&
                                (t.settings.views &&
                                  (a.views = t.settings.views),
                                t.settings["view cache"] && (a.cache = !0),
                                (n = t.settings["view options"]) &&
                                  s.shallowCopy(a, n)),
                              s.shallowCopyFromList(a, t, d)),
                          (a.filename = r))
                        : (t = {}),
                      p(a, t, e)
                    );
                  }),
                  (n.Template = x),
                  (n.clearCache = function () {
                    n.cache.reset();
                  }),
                  (x.modes = {
                    EVAL: "eval",
                    ESCAPED: "escaped",
                    RAW: "raw",
                    COMMENT: "comment",
                    LITERAL: "literal",
                  }),
                  (x.prototype = {
                    createRegex: function () {
                      var e = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",
                        t = s.escapeRegExpChars(this.opts.delimiter),
                        n = s.escapeRegExpChars(this.opts.openDelimiter),
                        i = s.escapeRegExpChars(this.opts.closeDelimiter);
                      return (
                        (e = e
                          .replace(/%/g, t)
                          .replace(/</g, n)
                          .replace(/>/g, i)),
                        new RegExp(e)
                      );
                    },
                    compile: function () {
                      var e,
                        t,
                        n,
                        i = this.opts,
                        a = "",
                        o = "",
                        c = i.escapeFunction,
                        l = i.filename
                          ? JSON.stringify(i.filename)
                          : "undefined";
                      if (!this.source) {
                        if (
                          (this.generateSource(),
                          (a +=
                            '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n'),
                          i.outputFunctionName &&
                            (a +=
                              "  var " +
                              i.outputFunctionName +
                              " = __append;\n"),
                          i.destructuredLocals && i.destructuredLocals.length)
                        ) {
                          for (
                            var d =
                                "  var __locals = (" +
                                i.localsName +
                                " || {}),\n",
                              u = 0;
                            u < i.destructuredLocals.length;
                            u++
                          ) {
                            var h = i.destructuredLocals[u];
                            u > 0 && (d += ",\n  "),
                              (d += h + " = __locals." + h);
                          }
                          a += d + ";\n";
                        }
                        !1 !== i._with &&
                          ((a += "  with (" + i.localsName + " || {}) {\n"),
                          (o += "  }\n")),
                          (o += "  return __output;\n"),
                          (this.source = a + this.source + o);
                      }
                      (e = i.compileDebug
                        ? "var __line = 1\n  , __lines = " +
                          JSON.stringify(this.templateText) +
                          "\n  , __filename = " +
                          l +
                          ";\ntry {\n" +
                          this.source +
                          "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n"
                        : this.source),
                        i.client &&
                          ((e =
                            "escapeFn = escapeFn || " +
                            c.toString() +
                            ";\n" +
                            e),
                          i.compileDebug &&
                            (e =
                              "rethrow = rethrow || " +
                              g.toString() +
                              ";\n" +
                              e)),
                        i.strict && (e = '"use strict";\n' + e),
                        i.debug && console.log(e),
                        i.compileDebug &&
                          i.filename &&
                          (e = e + "\n//# sourceURL=" + l + "\n");
                      try {
                        if (i.async)
                          try {
                            n = new Function(
                              "return (async function(){}).constructor;"
                            )();
                          } catch (e) {
                            throw e instanceof SyntaxError
                              ? new Error(
                                  "This environment does not support async/await"
                                )
                              : e;
                          }
                        else n = Function;
                        t = new n(
                          i.localsName + ", escapeFn, include, rethrow",
                          e
                        );
                      } catch (e) {
                        throw (
                          (e instanceof SyntaxError &&
                            (i.filename && (e.message += " in " + i.filename),
                            (e.message += " while compiling ejs\n\n"),
                            (e.message +=
                              "If the above error is not helpful, you may want to try EJS-Lint:\n"),
                            (e.message +=
                              "https://github.com/RyanZim/EJS-Lint"),
                            i.async ||
                              ((e.message += "\n"),
                              (e.message +=
                                "Or, if you meant to create an async function, pass `async: true` as an option."))),
                          e)
                        );
                      }
                      var m = i.client
                        ? t
                        : function (e) {
                            return t.apply(i.context, [
                              e || {},
                              c,
                              function (t, n) {
                                var r = s.shallowCopy({}, e);
                                return (
                                  n && (r = s.shallowCopy(r, n)), v(t, i)(r)
                                );
                              },
                              g,
                            ]);
                          };
                      if (
                        i.filename &&
                        "function" == typeof Object.defineProperty
                      ) {
                        var p = i.filename,
                          f = r.basename(p, r.extname(p));
                        try {
                          Object.defineProperty(m, "name", {
                            value: f,
                            writable: !1,
                            enumerable: !1,
                            configurable: !0,
                          });
                        } catch (e) {}
                      }
                      return m;
                    },
                    generateSource: function () {
                      this.opts.rmWhitespace &&
                        (this.templateText = this.templateText
                          .replace(/[\r\n]+/g, "\n")
                          .replace(/^\s+|\s+$/gm, "")),
                        (this.templateText = this.templateText
                          .replace(/[ \t]*<%_/gm, "<%_")
                          .replace(/_%>[ \t]*/gm, "_%>"));
                      var e = this,
                        t = this.parseTemplateText(),
                        n = this.opts.delimiter,
                        i = this.opts.openDelimiter,
                        r = this.opts.closeDelimiter;
                      t &&
                        t.length &&
                        t.forEach(function (s, a) {
                          var o;
                          if (
                            0 === s.indexOf(i + n) &&
                            0 !== s.indexOf(i + n + n) &&
                            (o = t[a + 2]) != n + r &&
                            o != "-" + n + r &&
                            o != "_" + n + r
                          )
                            throw new Error(
                              'Could not find matching close tag for "' +
                                s +
                                '".'
                            );
                          e.scanLine(s);
                        });
                    },
                    parseTemplateText: function () {
                      for (
                        var e,
                          t = this.templateText,
                          n = this.regex,
                          i = n.exec(t),
                          r = [];
                        i;

                      )
                        0 !== (e = i.index) &&
                          (r.push(t.substring(0, e)), (t = t.slice(e))),
                          r.push(i[0]),
                          (t = t.slice(i[0].length)),
                          (i = n.exec(t));
                      return t && r.push(t), r;
                    },
                    _addOutput: function (e) {
                      if (
                        (this.truncate &&
                          ((e = e.replace(/^(?:\r\n|\r|\n)/, "")),
                          (this.truncate = !1)),
                        !e)
                      )
                        return e;
                      (e = (e = (e = (e = e.replace(/\\/g, "\\\\")).replace(
                        /\n/g,
                        "\\n"
                      )).replace(/\r/g, "\\r")).replace(/"/g, '\\"')),
                        (this.source += '    ; __append("' + e + '")\n');
                    },
                    scanLine: function (e) {
                      var t,
                        n = this.opts.delimiter,
                        i = this.opts.openDelimiter,
                        r = this.opts.closeDelimiter;
                      switch (((t = e.split("\n").length - 1), e)) {
                        case i + n:
                        case i + n + "_":
                          this.mode = x.modes.EVAL;
                          break;
                        case i + n + "=":
                          this.mode = x.modes.ESCAPED;
                          break;
                        case i + n + "-":
                          this.mode = x.modes.RAW;
                          break;
                        case i + n + "#":
                          this.mode = x.modes.COMMENT;
                          break;
                        case i + n + n:
                          (this.mode = x.modes.LITERAL),
                            (this.source +=
                              '    ; __append("' +
                              e.replace(i + n + n, i + n) +
                              '")\n');
                          break;
                        case n + n + r:
                          (this.mode = x.modes.LITERAL),
                            (this.source +=
                              '    ; __append("' +
                              e.replace(n + n + r, n + r) +
                              '")\n');
                          break;
                        case n + r:
                        case "-" + n + r:
                        case "_" + n + r:
                          this.mode == x.modes.LITERAL && this._addOutput(e),
                            (this.mode = null),
                            (this.truncate =
                              0 === e.indexOf("-") || 0 === e.indexOf("_"));
                          break;
                        default:
                          if (this.mode) {
                            switch (this.mode) {
                              case x.modes.EVAL:
                              case x.modes.ESCAPED:
                              case x.modes.RAW:
                                e.lastIndexOf("//") > e.lastIndexOf("\n") &&
                                  (e += "\n");
                            }
                            switch (this.mode) {
                              case x.modes.EVAL:
                                this.source += "    ; " + e + "\n";
                                break;
                              case x.modes.ESCAPED:
                                this.source +=
                                  "    ; __append(escapeFn(" + b(e) + "))\n";
                                break;
                              case x.modes.RAW:
                                this.source += "    ; __append(" + b(e) + ")\n";
                                break;
                              case x.modes.COMMENT:
                                break;
                              case x.modes.LITERAL:
                                this._addOutput(e);
                            }
                          } else this._addOutput(e);
                      }
                      this.opts.compileDebug &&
                        t &&
                        ((this.currentLine += t),
                        (this.source +=
                          "    ; __line = " + this.currentLine + "\n"));
                    },
                  }),
                  (n.escapeXML = s.escapeXML),
                  (n.__express = n.renderFile),
                  (n.VERSION = o),
                  (n.name = "ejs"),
                  "undefined" != typeof window && (window.ejs = n);
              },
              { "../package.json": 6, "./utils": 2, fs: 3, path: 4 },
            ],
            2: [
              function (e, t, n) {
                "use strict";
                var i = /[|\\{}()[\]^$+*?.]/g;
                n.escapeRegExpChars = function (e) {
                  return e ? String(e).replace(i, "\\$&") : "";
                };
                var r = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&#34;",
                    "'": "&#39;",
                  },
                  s = /[&<>'"]/g;
                function a(e) {
                  return r[e] || e;
                }
                (n.escapeXML = function (e) {
                  return null == e ? "" : String(e).replace(s, a);
                }),
                  (n.escapeXML.toString = function () {
                    return (
                      Function.prototype.toString.call(this) +
                      ';\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'
                    );
                  }),
                  (n.shallowCopy = function (e, t) {
                    for (var n in (t = t || {})) e[n] = t[n];
                    return e;
                  }),
                  (n.shallowCopyFromList = function (e, t, n) {
                    for (var i = 0; i < n.length; i++) {
                      var r = n[i];
                      void 0 !== t[r] && (e[r] = t[r]);
                    }
                    return e;
                  }),
                  (n.cache = {
                    _data: {},
                    set: function (e, t) {
                      this._data[e] = t;
                    },
                    get: function (e) {
                      return this._data[e];
                    },
                    remove: function (e) {
                      delete this._data[e];
                    },
                    reset: function () {
                      this._data = {};
                    },
                  }),
                  (n.hyphenToCamel = function (e) {
                    return e.replace(/-[a-z]/g, function (e) {
                      return e[1].toUpperCase();
                    });
                  });
              },
              {},
            ],
            3: [function (e, t, n) {}, {}],
            4: [
              function (e, t, n) {
                (function (e) {
                  function t(e, t) {
                    for (var n = 0, i = e.length - 1; i >= 0; i--) {
                      var r = e[i];
                      "." === r
                        ? e.splice(i, 1)
                        : ".." === r
                        ? (e.splice(i, 1), n++)
                        : n && (e.splice(i, 1), n--);
                    }
                    if (t) for (; n--; n) e.unshift("..");
                    return e;
                  }
                  function i(e, t) {
                    if (e.filter) return e.filter(t);
                    for (var n = [], i = 0; i < e.length; i++)
                      t(e[i], i, e) && n.push(e[i]);
                    return n;
                  }
                  (n.resolve = function () {
                    for (
                      var n = "", r = !1, s = arguments.length - 1;
                      s >= -1 && !r;
                      s--
                    ) {
                      var a = s >= 0 ? arguments[s] : e.cwd();
                      if ("string" != typeof a)
                        throw new TypeError(
                          "Arguments to path.resolve must be strings"
                        );
                      a && ((n = a + "/" + n), (r = "/" === a.charAt(0)));
                    }
                    return (
                      (r ? "/" : "") +
                        (n = t(
                          i(n.split("/"), function (e) {
                            return !!e;
                          }),
                          !r
                        ).join("/")) || "."
                    );
                  }),
                    (n.normalize = function (e) {
                      var s = n.isAbsolute(e),
                        a = "/" === r(e, -1);
                      return (
                        (e = t(
                          i(e.split("/"), function (e) {
                            return !!e;
                          }),
                          !s
                        ).join("/")) ||
                          s ||
                          (e = "."),
                        e && a && (e += "/"),
                        (s ? "/" : "") + e
                      );
                    }),
                    (n.isAbsolute = function (e) {
                      return "/" === e.charAt(0);
                    }),
                    (n.join = function () {
                      var e = Array.prototype.slice.call(arguments, 0);
                      return n.normalize(
                        i(e, function (e, t) {
                          if ("string" != typeof e)
                            throw new TypeError(
                              "Arguments to path.join must be strings"
                            );
                          return e;
                        }).join("/")
                      );
                    }),
                    (n.relative = function (e, t) {
                      function i(e) {
                        for (var t = 0; t < e.length && "" === e[t]; t++);
                        for (var n = e.length - 1; n >= 0 && "" === e[n]; n--);
                        return t > n ? [] : e.slice(t, n - t + 1);
                      }
                      (e = n.resolve(e).substr(1)),
                        (t = n.resolve(t).substr(1));
                      for (
                        var r = i(e.split("/")),
                          s = i(t.split("/")),
                          a = Math.min(r.length, s.length),
                          o = a,
                          c = 0;
                        c < a;
                        c++
                      )
                        if (r[c] !== s[c]) {
                          o = c;
                          break;
                        }
                      var l = [];
                      for (c = o; c < r.length; c++) l.push("..");
                      return (l = l.concat(s.slice(o))).join("/");
                    }),
                    (n.sep = "/"),
                    (n.delimiter = ":"),
                    (n.dirname = function (e) {
                      if (("string" != typeof e && (e += ""), 0 === e.length))
                        return ".";
                      for (
                        var t = e.charCodeAt(0),
                          n = 47 === t,
                          i = -1,
                          r = !0,
                          s = e.length - 1;
                        s >= 1;
                        --s
                      )
                        if (47 === (t = e.charCodeAt(s))) {
                          if (!r) {
                            i = s;
                            break;
                          }
                        } else r = !1;
                      return -1 === i
                        ? n
                          ? "/"
                          : "."
                        : n && 1 === i
                        ? "/"
                        : e.slice(0, i);
                    }),
                    (n.basename = function (e, t) {
                      var n = (function (e) {
                        "string" != typeof e && (e += "");
                        var t,
                          n = 0,
                          i = -1,
                          r = !0;
                        for (t = e.length - 1; t >= 0; --t)
                          if (47 === e.charCodeAt(t)) {
                            if (!r) {
                              n = t + 1;
                              break;
                            }
                          } else -1 === i && ((r = !1), (i = t + 1));
                        return -1 === i ? "" : e.slice(n, i);
                      })(e);
                      return (
                        t &&
                          n.substr(-1 * t.length) === t &&
                          (n = n.substr(0, n.length - t.length)),
                        n
                      );
                    }),
                    (n.extname = function (e) {
                      "string" != typeof e && (e += "");
                      for (
                        var t = -1,
                          n = 0,
                          i = -1,
                          r = !0,
                          s = 0,
                          a = e.length - 1;
                        a >= 0;
                        --a
                      ) {
                        var o = e.charCodeAt(a);
                        if (47 !== o)
                          -1 === i && ((r = !1), (i = a + 1)),
                            46 === o
                              ? -1 === t
                                ? (t = a)
                                : 1 !== s && (s = 1)
                              : -1 !== t && (s = -1);
                        else if (!r) {
                          n = a + 1;
                          break;
                        }
                      }
                      return -1 === t ||
                        -1 === i ||
                        0 === s ||
                        (1 === s && t === i - 1 && t === n + 1)
                        ? ""
                        : e.slice(t, i);
                    });
                  var r = function (e, t, n) {
                    return e.substr(t, n);
                  };
                }).call(this, e("_process"));
              },
              { _process: 5 },
            ],
            5: [
              function (e, t, n) {
                var i,
                  r,
                  s = (t.exports = {});
                function a() {
                  throw new Error("setTimeout has not been defined");
                }
                function o() {
                  throw new Error("clearTimeout has not been defined");
                }
                function c(e) {
                  if (i === setTimeout) return setTimeout(e, 0);
                  if ((i === a || !i) && setTimeout)
                    return (i = setTimeout), setTimeout(e, 0);
                  try {
                    return i(e, 0);
                  } catch (t) {
                    try {
                      return i.call(null, e, 0);
                    } catch (t) {
                      return i.call(this, e, 0);
                    }
                  }
                }
                !(function () {
                  try {
                    i = "function" == typeof setTimeout ? setTimeout : a;
                  } catch (e) {
                    i = a;
                  }
                  try {
                    r = "function" == typeof clearTimeout ? clearTimeout : o;
                  } catch (e) {
                    r = o;
                  }
                })();
                var l,
                  d = [],
                  u = !1,
                  h = -1;
                function m() {
                  u &&
                    l &&
                    ((u = !1),
                    l.length ? (d = l.concat(d)) : (h = -1),
                    d.length && p());
                }
                function p() {
                  if (!u) {
                    var e = c(m);
                    u = !0;
                    for (var t = d.length; t; ) {
                      for (l = d, d = []; ++h < t; ) l && l[h].run();
                      (h = -1), (t = d.length);
                    }
                    (l = null),
                      (u = !1),
                      (function (e) {
                        if (r === clearTimeout) return clearTimeout(e);
                        if ((r === o || !r) && clearTimeout)
                          return (r = clearTimeout), clearTimeout(e);
                        try {
                          r(e);
                        } catch (t) {
                          try {
                            return r.call(null, e);
                          } catch (t) {
                            return r.call(this, e);
                          }
                        }
                      })(e);
                  }
                }
                function f(e, t) {
                  (this.fun = e), (this.array = t);
                }
                function v() {}
                (s.nextTick = function (e) {
                  var t = new Array(arguments.length - 1);
                  if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++)
                      t[n - 1] = arguments[n];
                  d.push(new f(e, t)), 1 !== d.length || u || c(p);
                }),
                  (f.prototype.run = function () {
                    this.fun.apply(null, this.array);
                  }),
                  (s.title = "browser"),
                  (s.browser = !0),
                  (s.env = {}),
                  (s.argv = []),
                  (s.version = ""),
                  (s.versions = {}),
                  (s.on = v),
                  (s.addListener = v),
                  (s.once = v),
                  (s.off = v),
                  (s.removeListener = v),
                  (s.removeAllListeners = v),
                  (s.emit = v),
                  (s.prependListener = v),
                  (s.prependOnceListener = v),
                  (s.listeners = function (e) {
                    return [];
                  }),
                  (s.binding = function (e) {
                    throw new Error("process.binding is not supported");
                  }),
                  (s.cwd = function () {
                    return "/";
                  }),
                  (s.chdir = function (e) {
                    throw new Error("process.chdir is not supported");
                  }),
                  (s.umask = function () {
                    return 0;
                  });
              },
              {},
            ],
            6: [
              function (e, t, n) {
                t.exports = {
                  name: "ejs",
                  description: "Embedded JavaScript templates",
                  keywords: ["template", "engine", "ejs"],
                  version: "3.1.6",
                  author:
                    "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
                  license: "Apache-2.0",
                  bin: { ejs: "./bin/cli.js" },
                  main: "./lib/ejs.js",
                  jsdelivr: "ejs.min.js",
                  unpkg: "ejs.min.js",
                  repository: {
                    type: "git",
                    url: "git://github.com/mde/ejs.git",
                  },
                  bugs: "https://github.com/mde/ejs/issues",
                  homepage: "https://github.com/mde/ejs",
                  dependencies: { jake: "^10.6.1" },
                  devDependencies: {
                    browserify: "^16.5.1",
                    eslint: "^6.8.0",
                    "git-directory-deploy": "^1.5.1",
                    jsdoc: "^3.6.4",
                    "lru-cache": "^4.0.1",
                    mocha: "^7.1.1",
                    "uglify-js": "^3.3.16",
                  },
                  engines: { node: ">=0.10.0" },
                  scripts: { test: "mocha" },
                };
              },
              {},
            ],
          },
          {},
          [1]
        )(1);
      },
      748: (e) => {
        "use strict";
        e.exports =
          '<!DOCTYPE html>\n<html lang="en">\n  <head> \n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" crossorigin="anonymous">\n\n    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" crossorigin="anonymous">\n\n    <link rel="shortcut icon" href="https://raw.githubusercontent.com/benc-uk/k6-reporter/main/assets/icon.png" type="image/png">\n\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>K6 Test Result: <%= title %></title>\n    <style>\n      body {\n        margin: 1rem;\n      }\n      footer { \n        float: right;\n        font-size: 0.8rem;\n        color: #777;\n      }\n      footer a {\n        text-decoration: none;\n        color: #777;\n      }\n      .failed {\n        background-color: #ff6666 !important;\n      }     \n      .good {\n        background-color: #3abe3a !important;\n      }   \n      td.failed {\n        font-weight: bold;\n      }\n      h2 {\n        padding-bottom: 4px;\n        border-bottom: solid 3px #cccccc;\n      }\n      .tabs {\n        display: flex;\n        flex-wrap: wrap; \n      }\n      .tabs label {\n        order: 1; \n        display: block;\n        padding: 1rem 2rem;\n        margin-right: 0.2rem;\n        cursor: pointer;\n        color: #666;\n        background: #ddd;\n        font-weight: bold;\n        font-size: 1.2rem;\n        flex: 1 1;\n        transition: background ease 0.2s;\n        border-top-left-radius: 0.3rem;\n        border-top-right-radius: 0.3rem;\n        border-color: #ccc;\n        border-style: solid;\n        border-width: 2px 2px 0px;\n        box-shadow: inset 0px -3px 7px -1px rgba(0,0,0,0.33);\n      }\n      .tabs .tab {\n        order: 99;\n        flex-grow: 1;\n        width: 100%;\n        display: none;\n        padding: 1rem;\n        background: #fff;\n      }\n      .tabs input[type="radio"] {\n        display: none;\n      }\n      .tabs input[type="radio"]:checked + label {\n        background: #fff;\n        box-shadow: none;\n        color: #000;\n      }\n      .tabs input[type="radio"]:checked + label + .tab {\n        display: block;\n      }\n      .box {\n        flex: 1 1;\n        border-radius: 0.3rem;\n        background-color: #3abe3a;\n        margin: 1rem;\n        padding: 0.5rem;\n        font-size: 2vw; \n        box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.49);\n        color: white;\n        position: relative;\n        overflow: hidden;\n      }\n      .box h4 {\n        margin: 0;\n        padding-bottom: 0.5rem;\n        text-align: center;\n        position: relative;\n        z-index: 50;\n      }\n      .row {\n        display: flex;\n      }\n      .row div {\n        flex: 1 1;\n        text-align: center;\n        margin-top: 0;\n        }\n      .bignum {\n        position: relative;\n        font-size: min(6vw, 60px);\n        font-weight: bold;\n        z-index: 20;\n      }\n      table {\n        font-size: min(2vw, 22px);\n        width: 100%;\n      }\n      .icon { \n        position: absolute;\n        top: 60%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        color: #0000002d;\n        font-size: 8vw;\n        z-index: 1;\n      }\n      .metricbox {\n        background-color: #5697e2;\n        font-size: 3vw;\n        height: auto;\n      }\n      .metricbox .row {\n        position: relative;\n        z-index: 20;\n      }\n    </style>\n  </head>\n\n  <body>\n    <h1>\n      <svg style="vertical-align:middle" width="50" height="45" viewBox="0 0 50 45" fill="none" class="footer-module--logo--_lkxx"><path d="M31.968 34.681a2.007 2.007 0 002.011-2.003c0-1.106-.9-2.003-2.011-2.003a2.007 2.007 0 00-2.012 2.003c0 1.106.9 2.003 2.012 2.003z" fill="#7D64FF"></path><path d="M39.575 0L27.154 16.883 16.729 9.31 0 45h50L39.575 0zM23.663 37.17l-2.97-4.072v4.072h-2.751V22.038l2.75 1.989v7.66l3.659-5.014 2.086 1.51-3.071 4.21 3.486 4.776h-3.189v.001zm8.305.17c-2.586 0-4.681-2.088-4.681-4.662 0-1.025.332-1.972.896-2.743l4.695-6.435 2.086 1.51-2.239 3.07a4.667 4.667 0 013.924 4.6c0 2.572-2.095 4.66-4.681 4.66z" fill="#7D64FF"></path></svg> \n      &nbsp; <span style="font-size:27px;margin-right:10px; word-spacing:-4px"><i>k6 Test Result:</i></span> <%= title %>\n    </h1>\n\n  <!--First Row-->\n<div class="row">\n<div class="box">\n<i class="fas fa-globe icon"></i>\n<h4>Total Requests</h4>\n<div class="bignum"><% if(data.metrics.http_reqs) { %><%= data.metrics.http_reqs.values.count %><% } %>\n</div>\n<div class="bignum"><% if(data.metrics.grpc_reqs) { %><%= data.metrics.grpc_reqs.values.count %><% } %>\n</div>\n</div>\n<% if(data.metrics.http_req_failed && data.metrics.http_req_failed.values) { %>\n<div class="box <% if(data.metrics.http_req_failed.values.passes > 0) { %> failed <% } %>">\n<i class="far fa-times-circle icon"></i>\n<h4>Failed Requests</h4>\n<div class="bignum"><%= data.metrics.http_req_failed.values.passes %>\n</div>\n</div>\n<% } %>\n<div class="box">\n<i class="fas fa-chart-bar icon"></i>\n<h4>2xx Responses</h4>\n<div class="bignum"><% if(data.metrics.ok_responses) { %><%= data.metrics.ok_responses.values.count %><% } %>\n</div>\n</div>\n<div class="box">\n<i class="fas fa-percentage icon"></i>\n<h4>Success Rate</h4>\n<div class="bignum"><% if(data.metrics.ok_responses && data.metrics.http_reqs) { %><% var totalRequests = data.metrics.http_reqs.values.count + (data.metrics.grpc_reqs ? data.metrics.grpc_reqs.values.count : 0); var successRate = (data.metrics.ok_responses.values.count / totalRequests) * 100; %><%= Math.round(successRate) %>%<% } %>\n</div>\n</div>\n</div>\n\n  <!-- first row end --> <!--Second Row-->\n<div class="row">\n<div class="box <% if(thresholdFailures > 0) { %> failed <% } %>">\n<i class="fas fa-chart-bar icon"></i>\n<h4>Breached Thresholds</h4>\n<div class="bignum"><%= thresholdFailures %></div>\n</div>\n<div class="box <% if(checkFailures > 0) { %> failed <% } %>">\n<i class="fas fa-eye icon"></i>\n<h4>Failed Checks</h4>\n<div class="bignum"><%= checkFailures %></div>\n</div>\n<div class="box">\n<i class="fas fa-chart-bar icon"></i>\n<h4>Peak RPM</h4>\n<div class="bignum"><% if(data.metrics.peak_rpm) { %><%= data.metrics.peak_rpm.values.count %><% } %>\n</div>\n</div>\n<div class="box <% if(thresholdFailures > 0) { %> failed <% } %>">\n<i class="fas fa-chart-bar icon"></i>\n<h4>Users Capacity</h4>\n<div class="bignum"><% if(data.metrics.real_users_capacity) { %><%= data.metrics.real_users_capacity.values.count %><% } %>\n</div>\n</div>\n</div>\n\n <!-- second row end --> <br>\n    \n    <div class="tabs">\n      <input type="radio" name="tabs" id="tabone" checked="checked">\n      <label for="tabone"><i class="far fa-clock"></i> &nbsp; Request Metrics</label>\n      <div class="tab">\n        <table class="pure-table pure-table-striped">\n          <tbody>\n            <thead>\n              <tr>\n                <th></th>\n                <th>Count</th>\n                <th>Rate</th>\n                <th>Average</th>\n                <th>Maximum</th>\n                <th>Median</th> \n                <th>Minimum</th>\n                <th>90th Percentile</th>\n                <th>95th Percentile</th>\n              </tr>\n            </thead>\n            \n            <% function checkFailed(metric, valName) {\n                if(!metric.thresholds) return \'\'\n                for(thres in metric.thresholds) {\n                  if(thres.includes(valName)) {\n                    if(!metric.thresholds[thres].ok) return \'failed\'\n                    return \'good\'\n                  }\n                }\n              }\n\n              for(metricName of standardMetrics) { \n                if(!data.metrics[metricName]) { continue }\n                var metric = data.metrics[metricName] \n            %>\n              <tr>\n                <td><b><%= metricName %></b></td>\n\n                <% if(metric.values.count) { %>\n                  <td class="<%= checkFailed(metric, \'count\') %>"><%= metric.values.count.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values.rate) { %>\n                  <td class="<%= checkFailed(metric, \'rate\') %>"><%= metric.values.rate.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n                \n                <% if(metric.values.avg) { %>\n                  <td class="<%= checkFailed(metric, \'avg\') %>"><%= metric.values.avg.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values.max) { %>\n                  <td class="<%= checkFailed(metric, \'max\') %>"><%= metric.values.max.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>  \n\n                <% if(metric.values.med) { %>\n                  <td class="<%= checkFailed(metric, \'med\') %>"><%= metric.values.med.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>  \n                \n                <% if(metric.values.min) { %>\n                  <td class="<%= checkFailed(metric, \'min\') %>"><%= metric.values.min.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>   \n                              \n                <% if(metric.values[\'p(90)\']) { %>\n                  <td class="<%= checkFailed(metric, \'p(90)\') %>"><%= metric.values[\'p(90)\'].toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values[\'p(95)\']) { %>\n                  <td class="<%= checkFailed(metric, \'p(95)\') %>"><%= metric.values[\'p(95)\'].toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td> \n                <% } %>\n              </tr>\n            <% } %>\n          </tbody>\n        </table>\n        <br>\n\n        <% \n          first = true \n          var sortedMetrics = {}\n          Object.keys(data.metrics).sort().forEach(function(k) {\n            sortedMetrics[k] = data.metrics[k]\n          });\n          for(metricName in sortedMetrics) {\n            if(standardMetrics.includes(metricName) || otherMetrics.includes(metricName)) { continue }\n            var metric = sortedMetrics[metricName] \n        %>\n          <% if(first) { first = false %> <h2>Custom Metrics</h2> \n          <table class="pure-table pure-table-striped">\n            <tbody>\n              <thead>\n                <tr>\n                  <th></th>\n                  <th>Count</th>\n                  <th>Rate</th>\n                  <th>Average</th>\n                  <th>Maximum</th>\n                  <th>Median</th> \n                  <th>Minimum</th>\n                  <th>90th Percentile</th>\n                  <th>95th Percentile</th>\n                </tr>\n              </thead>\n              <% } %>\n              <tr>\n                <td><b><%= metricName %></b></td>\n\n                <% if(metric.values.count) { %>\n                  <td class="<%= checkFailed(metric, \'count\') %>"><%= metric.values.count.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values.rate) { %>\n                  <td class="<%= checkFailed(metric, \'rate\') %>"><%= metric.values.rate.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n                \n                <% if(metric.values.avg) { %>\n                  <td class="<%= checkFailed(metric, \'avg\') %>"><%= metric.values.avg.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values.max) { %>\n                  <td class="<%= checkFailed(metric, \'max\') %>"><%= metric.values.max.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>  \n\n                <% if(metric.values.med) { %>\n                  <td class="<%= checkFailed(metric, \'med\') %>"><%= metric.values.med.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>  \n                \n                <% if(metric.values.min) { %>\n                  <td class="<%= checkFailed(metric, \'min\') %>"><%= metric.values.min.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>   \n                              \n                <% if(metric.values[\'p(90)\']) { %>\n                  <td class="<%= checkFailed(metric, \'p(90)\') %>"><%= metric.values[\'p(90)\'].toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values[\'p(95)\']) { %>\n                  <td class="<%= checkFailed(metric, \'p(95)\') %>"><%= metric.values[\'p(95)\'].toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td> \n                <% } %>\n              </tr>\n              <% } %>\n            </tbody>\n          </table>\n          <br>\n\n\n        &nbsp;&nbsp; Note. All times are in milli-seconds\n      </div> \n      \x3c!-- ---- end tab ---- --\x3e\n\n      <input type="radio" name="tabs" id="tabtwo">\n      <label for="tabtwo"><i class="fas fa-chart-line"></i> &nbsp; Other Stats</label>\n      <div class="tab">\n        <div class="row">\n          <% if (data.metrics.checks) { %>\n            <div class="box metricbox">\n              <h4>Checks</h4>\n              <i class="fas fa-eye icon"></i>\n              <div class="row"><div>Passed</div><div><%= data.metrics.checks.values.passes %></div></div>\n              <div class="row"><div>Failed</div><div><%= data.metrics.checks.values.fails %></div></div>\n            </div>\n          <% } %>\n\n          <% if (data.metrics.iterations) { %>\n            <div class="box metricbox">\n              <h4>Iterations</h4>\n              <i class="fas fa-redo icon"></i>\n              <div class="row"><div>Total</div><div><%= data.metrics.iterations.values.count %></div></div>\n              <div class="row"><div>Rate</div><div><%= data.metrics.iterations.values.rate.toFixed(2) %>/s</div></div>\n            </div>\n          <% } %>\n\n          <div class="box metricbox">\n            <h4>Virtual Users</h4>\n            <i class="fas fa-user icon"></i>\n            <div class="row"><div>Min</div><div><%= data.metrics.vus ? data.metrics.vus.values.min : 1 %></div></div>\n            <div class="row"><div>Max</div><div><%= data.metrics.vus ? data.metrics.vus.values.max : 1 %></div></div>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="box metricbox">\n            <h4>Requests</h4>\n            <i class="fas fa-globe icon"></i>\n            <div class="row"><div>Total</div><div><% if(data.metrics.http_reqs) { %><%= data.metrics.http_reqs.values.count %><% } %></div></div>\n            <div class="row"><div>Rate</div><div><% if(data.metrics.http_reqs) { %><%= data.metrics.http_reqs.values.rate.toFixed(2) %>/s<% } %></div></div>\n          </div>\n\n          <div class="box metricbox">\n            <h4>Data Received</h4>\n            <i class="fas fa-cloud-download-alt icon"></i>\n            <div class="row"><div>Total</div><div><%= (data.metrics.data_received.values.count/1000000).toFixed(2) %> MB</div></div>\n            <div class="row"><div>Rate</div><div><%= (data.metrics.data_received.values.rate/1000000).toFixed(2) %> mB/s</div></div>\n          </div>\n\n          <div class="box metricbox">\n            <h4>Data Sent</h4>\n            <i class="fas fa-cloud-upload-alt icon"></i>\n            <div class="row"><div>Total</div><div><%= (data.metrics.data_sent.values.count/1000000).toFixed(2) %> MB</div></div>\n            <div class="row"><div>Rate</div><div><%= (data.metrics.data_sent.values.rate/1000000).toFixed(2) %> mB/s</div></div>\n          </div>   \n        </div>\n      </div>  \n      \x3c!-- ---- end tab ---- --\x3e     \n\n      <input type="radio" name="tabs" id="tabthree">\n      <label for="tabthree"><i class="fas fa-tasks"></i> Checks & Groups</label>\n      <div class="tab">\n\n        <% for(group of data.root_group.groups) { %>\n          <h2>&bull; Group - <%= group.name %></h2>\n          <table class="pure-table pure-table-horizontal" style="width: 100%">\n            <thead>\n              <tr>\n                <th>Check Name</th>\n                <th>Passes</th>\n                <th>Failures</th>\n              </tr>\n            </thead>\n            <% for(check of group.checks) { %>\n              <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\n                <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\n              </tr>\n            <% } %>\n          </table>\n          <br>\n        <% } %>\n\n        <h2>&bull; Other Checks</h2>\n        <table class="pure-table pure-table-horizontal" style="width: 100%">\n          <thead>\n            <tr>\n              <th>Check Name</th>\n              <th>Passes</th>\n              <th>Failures</th>\n            </tr>\n          </thead>\n          <% for(check of data.root_group.checks) { %>\n            <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\n              <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\n            </tr>\n          <% } %>\n        </table>     \n      </div> \n      \x3c!-- ---- end tab ---- --\x3e\n    </div>\n    <footer>K6 Reporter v<%= version %> - Ben Coleman 2021, <a href="https://github.com/benc-uk/k6-reporter">[GitHub]</a></footer>\n  </body>\n</html>\n';
          '<!DOCTYPE html>\n<html lang="en">\n  <head> \n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" crossorigin="anonymous">\n\n    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" crossorigin="anonymous">\n\n    <link rel="shortcut icon" href="https://raw.githubusercontent.com/benc-uk/k6-reporter/main/assets/icon.png" type="image/png">\n\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>K6 Test Result: <%= title %></title>\n    <style>\n      body {\n        margin: 1rem;\n      }\n      footer { \n        float: right;\n        font-size: 0.8rem;\n        color: #777;\n      }\n      footer a {\n        text-decoration: none;\n        color: #777;\n      }\n      .failed {\n        background-color: #ff6666 !important;\n      }     \n      .good {\n        background-color: #3abe3a !important;\n      }   \n      td.failed {\n        font-weight: bold;\n      }\n      h2 {\n        padding-bottom: 4px;\n        border-bottom: solid 3px #cccccc;\n      }\n      .tabs {\n        display: flex;\n        flex-wrap: wrap; \n      }\n      .tabs label {\n        order: 1; \n        display: block;\n        padding: 1rem 2rem;\n        margin-right: 0.2rem;\n        cursor: pointer;\n        color: #666;\n        background: #ddd;\n        font-weight: bold;\n        font-size: 1.2rem;\n        flex: 1 1;\n        transition: background ease 0.2s;\n        border-top-left-radius: 0.3rem;\n        border-top-right-radius: 0.3rem;\n        border-color: #ccc;\n        border-style: solid;\n        border-width: 2px 2px 0px;\n        box-shadow: inset 0px -3px 7px -1px rgba(0,0,0,0.33);\n      }\n      .tabs .tab {\n        order: 99;\n        flex-grow: 1;\n        width: 100%;\n        display: none;\n        padding: 1rem;\n        background: #fff;\n      }\n      .tabs input[type="radio"] {\n        display: none;\n      }\n      .tabs input[type="radio"]:checked + label {\n        background: #fff;\n        box-shadow: none;\n        color: #000;\n      }\n      .tabs input[type="radio"]:checked + label + .tab {\n        display: block;\n      }\n      .box {\n        flex: 1 1;\n        border-radius: 0.3rem;\n        background-color: #3abe3a;\n        margin: 1rem;\n        padding: 0.5rem;\n        font-size: 2vw; \n        box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.49);\n        color: white;\n        position: relative;\n        overflow: hidden;\n      }\n      .box h4 {\n        margin: 0;\n        padding-bottom: 0.5rem;\n        text-align: center;\n        position: relative;\n        z-index: 50;\n      }\n      .row {\n        display: flex;\n      }\n      .row div {\n        flex: 1 1;\n        text-align: center;\n        margin-top: 0;\n        }\n      .bignum {\n        position: relative;\n        font-size: min(6vw, 60px);\n        font-weight: bold;\n        z-index: 20;\n      }\n      table {\n        font-size: min(2vw, 22px);\n        width: 100%;\n      }\n      .icon { \n        position: absolute;\n        top: 60%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        color: #0000002d;\n        font-size: 8vw;\n        z-index: 1;\n      }\n      .metricbox {\n        background-color: #5697e2;\n        font-size: 3vw;\n        height: auto;\n      }\n      .metricbox .row {\n        position: relative;\n        z-index: 20;\n      }\n    </style>\n  </head>\n\n  <body>\n    <h1>\n      <svg style="vertical-align:middle" width="50" height="45" viewBox="0 0 50 45" fill="none" class="footer-module--logo--_lkxx"><path d="M31.968 34.681a2.007 2.007 0 002.011-2.003c0-1.106-.9-2.003-2.011-2.003a2.007 2.007 0 00-2.012 2.003c0 1.106.9 2.003 2.012 2.003z" fill="#7D64FF"></path><path d="M39.575 0L27.154 16.883 16.729 9.31 0 45h50L39.575 0zM23.663 37.17l-2.97-4.072v4.072h-2.751V22.038l2.75 1.989v7.66l3.659-5.014 2.086 1.51-3.071 4.21 3.486 4.776h-3.189v.001zm8.305.17c-2.586 0-4.681-2.088-4.681-4.662 0-1.025.332-1.972.896-2.743l4.695-6.435 2.086 1.51-2.239 3.07a4.667 4.667 0 013.924 4.6c0 2.572-2.095 4.66-4.681 4.66z" fill="#7D64FF"></path></svg> \n      &nbsp; <span style="font-size:27px;margin-right:10px; word-spacing:-4px"><i>k6 Test Result:</i></span> <%= title %>\n    </h1>\n\n  <!--First Row-->\n<div class="row">\n<div class="box">\n<i class="fas fa-globe icon"></i>\n<h4>Total Requests</h4>\n<div class="bignum"><% if(data.metrics.http_reqs) { %><%= data.metrics.http_reqs.values.count %><% } %>\n</div>\n<div class="bignum"><% if(data.metrics.grpc_reqs) { %><%= data.metrics.grpc_reqs.values.count %><% } %>\n</div>\n</div>\n<% if(data.metrics.http_req_failed && data.metrics.http_req_failed.values) { %>\n<div class="box <% if(data.metrics.http_req_failed.values.passes > 0) { %> failed <% } %>">\n<i class="far fa-times-circle icon"></i>\n<h4>Failed Requests</h4>\n<div class="bignum"><%= data.metrics.http_req_failed.values.passes %>\n</div>\n</div>\n<% } %>\n<div class="box">\n<i class="fas fa-chart-bar icon"></i>\n<h4>2xx Responses</h4>\n<div class="bignum"><% if(data.metrics.ok_responses) { %><%= data.metrics.ok_responses.values.count %><% } %>\n</div>\n</div>\n<div class="box">\n<i class="fas fa-percentage icon"></i>\n<h4>Success Rate</h4>\n<div class="bignum"><% if(data.metrics.ok_responses && data.metrics.http_reqs) { %><% var totalRequests = data.metrics.http_reqs.values.count + (data.metrics.grpc_reqs ? data.metrics.grpc_reqs.values.count : 0); var successRate = (data.metrics.ok_responses.values.count / totalRequests) * 100; %><%= Math.round(successRate) %>%<% } %>\n</div>\n</div>\n</div>\n\n  <!-- first row end --> <!--Second Row-->\n<div class="row">\n<div class="box <% if(thresholdFailures > 0) { %> failed <% } %>">\n<i class="fas fa-chart-bar icon"></i>\n<h4>Breached Thresholds</h4>\n<div class="bignum"><%= thresholdFailures %></div>\n</div>\n<div class="box <% if(checkFailures > 0) { %> failed <% } %>">\n<i class="fas fa-eye icon"></i>\n<h4>Failed Checks</h4>\n<div class="bignum"><%= checkFailures %></div>\n</div>\n<div class="box">\n<i class="fas fa-chart-bar icon"></i>\n<h4>Peak RPM</h4>\n<div class="bignum"><% if(data.metrics.peak_rpm) { %><%= data.metrics.peak_rpm.values.count %><% } %>\n</div>\n</div>\n<div class="box <% if(thresholdFailures > 0) { %> failed <% } %>">\n<i class="fas fa-chart-bar icon"></i>\n<h4>Users Capacity</h4>\n<div class="bignum"><% if(data.metrics.real_users_capacity) { %><%= data.metrics.real_users_capacity.values.count %><% } %>\n</div>\n</div>\n</div>\n\n <!-- second row end --> <br>\n    \n    <div class="tabs">\n      <input type="radio" name="tabs" id="tabone" checked="checked">\n      <label for="tabone"><i class="far fa-clock"></i> &nbsp; Request Metrics</label>\n      <div class="tab">\n        <table class="pure-table pure-table-striped">\n          <tbody>\n            <thead>\n              <tr>\n                <th></th>\n                <th>Count</th>\n                <th>Rate</th>\n                <th>Average</th>\n                <th>Maximum</th>\n                <th>Median</th> \n                <th>Minimum</th>\n                <th>90th Percentile</th>\n                <th>95th Percentile</th>\n              </tr>\n            </thead>\n            \n            <% function checkFailed(metric, valName) {\n                if(!metric.thresholds) return \'\'\n                for(thres in metric.thresholds) {\n                  if(thres.includes(valName)) {\n                    if(!metric.thresholds[thres].ok) return \'failed\'\n                    return \'good\'\n                  }\n                }\n              }\n\n              for(metricName of standardMetrics) { \n                if(!data.metrics[metricName]) { continue }\n                var metric = data.metrics[metricName] \n            %>\n              <tr>\n                <td><b><%= metricName %></b></td>\n\n                <% if(metric.values.count) { %>\n                  <td class="<%= checkFailed(metric, \'count\') %>"><%= metric.values.count.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values.rate) { %>\n                  <td class="<%= checkFailed(metric, \'rate\') %>"><%= metric.values.rate.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n                \n                <% if(metric.values.avg) { %>\n                  <td class="<%= checkFailed(metric, \'avg\') %>"><%= metric.values.avg.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values.max) { %>\n                  <td class="<%= checkFailed(metric, \'max\') %>"><%= metric.values.max.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>  \n\n                <% if(metric.values.med) { %>\n                  <td class="<%= checkFailed(metric, \'med\') %>"><%= metric.values.med.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>  \n                \n                <% if(metric.values.min) { %>\n                  <td class="<%= checkFailed(metric, \'min\') %>"><%= metric.values.min.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>   \n                              \n                <% if(metric.values[\'p(90)\']) { %>\n                  <td class="<%= checkFailed(metric, \'p(90)\') %>"><%= metric.values[\'p(90)\'].toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values[\'p(95)\']) { %>\n                  <td class="<%= checkFailed(metric, \'p(95)\') %>"><%= metric.values[\'p(95)\'].toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td> \n                <% } %>\n              </tr>\n            <% } %>\n          </tbody>\n        </table>\n        <br>\n\n        <% \n          first = true \n          var sortedMetrics = {}\n          Object.keys(data.metrics).sort().forEach(function(k) {\n            sortedMetrics[k] = data.metrics[k]\n          });\n          for(metricName in sortedMetrics) {\n            if(standardMetrics.includes(metricName) || otherMetrics.includes(metricName)) { continue }\n            var metric = sortedMetrics[metricName] \n        %>\n          <% if(first) { first = false %> <h2>Custom Metrics</h2> \n          <table class="pure-table pure-table-striped">\n            <tbody>\n              <thead>\n                <tr>\n                  <th></th>\n                  <th>Count</th>\n                  <th>Rate</th>\n                  <th>Average</th>\n                  <th>Maximum</th>\n                  <th>Median</th> \n                  <th>Minimum</th>\n                  <th>90th Percentile</th>\n                  <th>95th Percentile</th>\n                </tr>\n              </thead>\n              <% } %>\n              <tr>\n                <td><b><%= metricName %></b></td>\n\n                <% if(metric.values.count) { %>\n                  <td class="<%= checkFailed(metric, \'count\') %>"><%= metric.values.count.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values.rate) { %>\n                  <td class="<%= checkFailed(metric, \'rate\') %>"><%= metric.values.rate.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n                \n                <% if(metric.values.avg) { %>\n                  <td class="<%= checkFailed(metric, \'avg\') %>"><%= metric.values.avg.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values.max) { %>\n                  <td class="<%= checkFailed(metric, \'max\') %>"><%= metric.values.max.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>  \n\n                <% if(metric.values.med) { %>\n                  <td class="<%= checkFailed(metric, \'med\') %>"><%= metric.values.med.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>  \n                \n                <% if(metric.values.min) { %>\n                  <td class="<%= checkFailed(metric, \'min\') %>"><%= metric.values.min.toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>   \n                              \n                <% if(metric.values[\'p(90)\']) { %>\n                  <td class="<%= checkFailed(metric, \'p(90)\') %>"><%= metric.values[\'p(90)\'].toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td>\n                <% } %>\n\n                <% if(metric.values[\'p(95)\']) { %>\n                  <td class="<%= checkFailed(metric, \'p(95)\') %>"><%= metric.values[\'p(95)\'].toFixed(2) %></td>\n                <% } else { %>\n                  <td>-</td> \n                <% } %>\n              </tr>\n              <% } %>\n            </tbody>\n          </table>\n          <br>\n\n\n        &nbsp;&nbsp; Note. All times are in milli-seconds\n      </div> \n      \x3c!-- ---- end tab ---- --\x3e\n\n      <input type="radio" name="tabs" id="tabtwo">\n      <label for="tabtwo"><i class="fas fa-chart-line"></i> &nbsp; Other Stats</label>\n      <div class="tab">\n        <div class="row">\n          <% if (data.metrics.checks) { %>\n            <div class="box metricbox">\n              <h4>Checks</h4>\n              <i class="fas fa-eye icon"></i>\n              <div class="row"><div>Passed</div><div><%= data.metrics.checks.values.passes %></div></div>\n              <div class="row"><div>Failed</div><div><%= data.metrics.checks.values.fails %></div></div>\n            </div>\n          <% } %>\n\n          <% if (data.metrics.iterations) { %>\n            <div class="box metricbox">\n              <h4>Iterations</h4>\n              <i class="fas fa-redo icon"></i>\n              <div class="row"><div>Total</div><div><%= data.metrics.iterations.values.count %></div></div>\n              <div class="row"><div>Rate</div><div><%= data.metrics.iterations.values.rate.toFixed(2) %>/s</div></div>\n            </div>\n          <% } %>\n\n          <div class="box metricbox">\n            <h4>Virtual Users</h4>\n            <i class="fas fa-user icon"></i>\n            <div class="row"><div>Min</div><div><%= data.metrics.vus ? data.metrics.vus.values.min : 1 %></div></div>\n            <div class="row"><div>Max</div><div><%= data.metrics.vus ? data.metrics.vus.values.max : 1 %></div></div>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="box metricbox">\n            <h4>Requests</h4>\n            <i class="fas fa-globe icon"></i>\n            <div class="row"><div>Total</div><div><% if(data.metrics.http_reqs) { %><%= data.metrics.http_reqs.values.count %><% } %></div></div>\n            <div class="row"><div>Rate</div><div><% if(data.metrics.http_reqs) { %><%= data.metrics.http_reqs.values.rate.toFixed(2) %>/s<% } %></div></div>\n          </div>\n\n          <div class="box metricbox">\n            <h4>Data Received</h4>\n            <i class="fas fa-cloud-download-alt icon"></i>\n            <div class="row"><div>Total</div><div><%= (data.metrics.data_received.values.count/1000000).toFixed(2) %> MB</div></div>\n            <div class="row"><div>Rate</div><div><%= (data.metrics.data_received.values.rate/1000000).toFixed(2) %> mB/s</div></div>\n          </div>\n\n          <div class="box metricbox">\n            <h4>Data Sent</h4>\n            <i class="fas fa-cloud-upload-alt icon"></i>\n            <div class="row"><div>Total</div><div><%= (data.metrics.data_sent.values.count/1000000).toFixed(2) %> MB</div></div>\n            <div class="row"><div>Rate</div><div><%= (data.metrics.data_sent.values.rate/1000000).toFixed(2) %> mB/s</div></div>\n          </div>   \n        </div>\n      </div>  \n      \x3c!-- ---- end tab ---- --\x3e     \n\n      <input type="radio" name="tabs" id="tabthree">\n      <label for="tabthree"><i class="fas fa-tasks"></i> Checks & Groups</label>\n      <div class="tab">\n\n        <% for(group of data.root_group.groups) { %>\n          <h2>&bull; Group - <%= group.name %></h2>\n          <table class="pure-table pure-table-horizontal" style="width: 100%">\n            <thead>\n              <tr>\n                <th>Check Name</th>\n                <th>Passes</th>\n                <th>Failures</th>\n              </tr>\n            </thead>\n            <% for(check of group.checks) { %>\n              <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\n                <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\n              </tr>\n            <% } %>\n          </table>\n          <br>\n        <% } %>\n\n        <h2>&bull; Other Checks</h2>\n        <table class="pure-table pure-table-horizontal" style="width: 100%">\n          <thead>\n            <tr>\n              <th>Check Name</th>\n              <th>Passes</th>\n              <th>Failures</th>\n            </tr>\n          </thead>\n          <% for(check of data.root_group.checks) { %>\n            <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\n              <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\n            </tr>\n          <% } %>\n        </table>     \n      </div> \n      \x3c!-- ---- end tab ---- --\x3e\n    </div>\n    <footer>K6 Reporter v<%= version %> - Ben Coleman 2021, <a href="https://github.com/benc-uk/k6-reporter">[GitHub]</a></footer>\n  </body>\n</html>\n';
      },
    },
    t = {};
  function n(i) {
    var r = t[i];
    if (void 0 !== r) return r.exports;
    var s = (t[i] = { exports: {} });
    return e[i](s, s.exports, n), s.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var i in t)
        n.o(t, i) &&
          !n.o(e, i) &&
          Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    });
  var i = {};
  (() => {
    "use strict";
    n.r(i), n.d(i, { htmlReport: () => s });
    var e = n(481),
      t = n.n(e),
      r = n(748);
    function s(e, n = {}) {
      n.title ||
        (n.title = new Date().toISOString().slice(0, 16).replace("T", " ")),
        n.hasOwnProperty("debug") || (n.debug = !1),
        console.log("[k6-reporter v2.3.0] Generating HTML summary report");
      let i = [];
      n.debug && console.log(JSON.stringify(e, null, 2));
      let s = 0,
        o = 0;
      for (let t in e.metrics)
        if ((i.push(t), e.metrics[t].thresholds)) {
          o++;
          let n = e.metrics[t].thresholds;
          for (let e in n) n[e].ok || s++;
        }
      let c = 0,
        l = 0;
      if (e.root_group.checks) {
        let { passes: t, fails: n } = a(e.root_group.checks);
        (c += n), (l += t);
      }
      for (let t of e.root_group.groups)
        if (t.checks) {
          let { passes: e, fails: n } = a(t.checks);
          (c += n), (l += e);
        }
      return t().render(r, {
        data: e,
        title: n.title,
        standardMetrics: [
          "grpc_req_duration",
          "http_req_duration",
          "http_req_waiting",
          "http_req_connecting",
          "http_req_tls_handshaking",
          "http_req_sending",
          "http_req_receiving",
          "http_req_blocked",
          "iteration_duration",
          "group_duration",
          "ws_connecting",
          "ws_msgs_received",
          "ws_msgs_sent",
          "ws_sessions",
        ],
        otherMetrics: [
          "iterations",
          "data_sent",
          "checks",
          "http_reqs",
          "data_received",
          "vus_max",
          "vus",
          "http_req_failed",
          "http_req_duration{expected_response:true}",
          "ok_responses",
          "peak_rpm",
          "real_users_capacity"
        ],
        thresholdFailures: s,
        thresholdCount: o,
        checkFailures: c,
        checkPasses: l,
        version: "2.3.0",
      });
    }
    function a(e) {
      let t = 0,
        n = 0;
      for (let i of e) (t += parseInt(i.passes)), (n += parseInt(i.fails));
      return { passes: t, fails: n };
    }
  })();
  var r = exports;
  for (var s in i) r[s] = i[s];
  i.__esModule && Object.defineProperty(r, "__esModule", { value: !0 });
})();
