import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { parse } from "@babel/parser";
import en from "../src/locales/en.js";
import ur from "../src/locales/ur.js";
import { resolveLanguage, translate } from "../src/services/locale.js";
import { featuredProjects, moreProjects } from "../src/data/projects.js";

test("locale precedence respects valid links, saved choice, and English default", () => {
  assert.equal(resolveLanguage("/?lang=ur#work", "en"), "ur");
  assert.equal(resolveLanguage("/?lang=en", "ur"), "en");
  assert.equal(resolveLanguage("/?lang=invalid", "ur"), "ur");
  assert.equal(resolveLanguage("/", "invalid"), "en");
  assert.equal(resolveLanguage("/", null), "en");
});
test("catalogues have matching keys, nonempty messages, and interpolation parameters", () => {
  assert.deepEqual(Object.keys(en).sort(), Object.keys(ur).sort());
  for (const key of Object.keys(en)) {
    assert.ok(ur[key].trim(), key);
    assert.ok(!ur[key].includes("\ufffd"), key);
    assert.deepEqual(
      ur[key].match(/\{\w+\}/g)?.sort(),
      en[key].match(/\{\w+\}/g)?.sort(),
      key,
    );
  }
});
test("every static translation lookup is present in both catalogues", () => {
  const files = [
    "src/App.jsx",
    ...["src/pages", "src/components"].flatMap((dir) =>
      fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".jsx"))
        .map((f) => `${dir}/${f}`),
    ),
  ];
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (
      node.type === "CallExpression" &&
      node.callee.name === "t" &&
      node.arguments[0]?.type === "StringLiteral"
    )
      assert.ok(node.arguments[0].value in en, node.arguments[0].value);
    for (const [key, value] of Object.entries(node)) {
      if (["loc", "start", "end"].includes(key)) continue;
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === "object") visit(value);
    }
  }
  files.forEach((file) =>
    visit(
      parse(fs.readFileSync(file, "utf8"), {
        sourceType: "module",
        plugins: ["jsx"],
      }),
    ),
  );
});
test("all case-study copy is translated by stable project IDs", () => {
  for (const p of [...featuredProjects, ...moreProjects]) {
    assert.ok(p.id);
    for (const field of [
      "category",
      "subtitle",
      "description",
      "problem",
      "approach",
      "outcome",
      "role",
      "caption",
    ]) {
      if (p[field]) {
        const key = `projects.${p.id}.${field}`;
        assert.equal(en[key], p[field], key);
        assert.ok(ur[key], key);
      }
    }
    p.previews?.forEach((v, i) => {
      for (const field of ["label", "alt"])
        assert.ok(ur[`projects.${p.id}.previews.${i}.${field}`]);
    });
  }
});
test("translations interpolate safely and retain readable English fallback", () => {
  assert.equal(
    translate("en", "{name} source code", { name: "NovaWorks" }),
    "NovaWorks source code",
  );
  assert.ok(
    translate("ur", "{name} source code", { name: "NovaWorks" }).includes(
      "\u2068NovaWorks\u2069",
    ),
  );
  assert.equal(translate("ur", "React"), "React");
});
