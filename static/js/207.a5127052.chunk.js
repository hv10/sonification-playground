(this["webpackJsonpsonification-playground"]=this["webpackJsonpsonification-playground"]||[]).push([[207],{523:function(n,t){!function(n){var t=n.languages.javascript["template-string"],e=t.pattern.source,r=t.inside.interpolation,a=r.inside["interpolation-punctuation"],i=r.pattern.source;function o(t,r){if(n.languages[t])return{pattern:RegExp("((?:"+r+")\\s*)"+e),lookbehind:!0,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},"embedded-code":{pattern:/[\s\S]+/,alias:t}}}}function s(t,e,r){var a={code:t,grammar:e,language:r};return n.hooks.run("before-tokenize",a),a.tokens=n.tokenize(a.code,a.grammar),n.hooks.run("after-tokenize",a),a.tokens}function p(t){var e={};e["interpolation-punctuation"]=a;var i=n.tokenize(t,e);if(3===i.length){var o=[1,1];o.push.apply(o,s(i[1],n.languages.javascript,"javascript")),i.splice.apply(i,o)}return new n.Token("interpolation",i,r.alias,t)}function l(t,e,r){var a=n.tokenize(t,{interpolation:{pattern:RegExp(i),lookbehind:!0}}),o=0,l={},g=s(a.map((function(n){if("string"==typeof n)return n;for(var e,a=n.content;-1!==t.indexOf((i=o++,e="___"+r.toUpperCase()+"_"+i+"___")););return l[e]=a,e;var i})).join(""),e,r),u=Object.keys(l);return o=0,function n(t){for(var e=0;e<t.length;e++){if(o>=u.length)return;var r=t[e];if("string"==typeof r||"string"==typeof r.content){var a=u[o],i="string"==typeof r?r:r.content,s=i.indexOf(a);if(-1!==s){++o;var g=i.substring(0,s),c=p(l[a]),f=i.substring(s+a.length),y=[];if(g&&y.push(g),y.push(c),f){var v=[f];n(v),y.push.apply(y,v)}"string"==typeof r?(t.splice.apply(t,[e,1].concat(y)),e+=y.length-1):r.content=y}}else{var d=r.content;Array.isArray(d)?n(d):n([d])}}}(g),new n.Token(r,g,"language-"+r,t)}n.languages.javascript["template-string"]=[o("css","\\b(?:styled(?:\\([^)]*\\))?(?:\\s*\\.\\s*\\w+(?:\\([^)]*\\))*)*|css(?:\\s*\\.\\s*(?:global|resolve))?|createGlobalStyle|keyframes)"),o("html","\\bhtml|\\.\\s*(?:inner|outer)HTML\\s*\\+?="),o("svg","\\bsvg"),o("markdown","\\b(?:md|markdown)"),o("graphql","\\b(?:gql|graphql(?:\\s*\\.\\s*experimental)?)"),t].filter(Boolean);var g={javascript:!0,js:!0,typescript:!0,ts:!0,jsx:!0,tsx:!0};function u(n){return"string"==typeof n?n:Array.isArray(n)?n.map(u).join(""):u(n.content)}n.hooks.add("after-tokenize",(function(t){t.language in g&&function t(e){for(var r=0,a=e.length;r<a;r++){var i=e[r];if("string"!=typeof i){var o=i.content;if(Array.isArray(o))if("template-string"===i.type){var s=o[1];if(3===o.length&&"string"!=typeof s&&"embedded-code"===s.type){var p=u(s),g=s.alias,c=Array.isArray(g)?g[0]:g,f=n.languages[c];if(!f)continue;o[1]=l(p,f,c)}}else t(o);else"string"!=typeof o&&t([o])}}}(t.tokens)}))}(Prism)}}]);
//# sourceMappingURL=207.a5127052.chunk.js.map