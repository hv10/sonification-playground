(this["webpackJsonpsonification-playground"]=this["webpackJsonpsonification-playground"]||[]).push([[408],{724:function(n,t){!function(n){function t(n,t,e){return{pattern:RegExp("<#"+n+"[\\s\\S]*?#>"),alias:"block",inside:{delimiter:{pattern:RegExp("^<#"+n+"|#>$"),alias:"important"},content:{pattern:/[\s\S]+/,inside:t,alias:e}}}}n.languages["t4-templating"]=Object.defineProperty({},"createT4",{value:function(e){var a=n.languages[e],i="language-"+e;return{block:{pattern:/<#[\s\S]+?#>/,inside:{directive:t("@",{"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/,inside:{punctuation:/^=|^["']|["']$/}},keyword:/\w+(?=\s)/,"attr-name":/\w+/}),expression:t("=",a,i),"class-feature":t("\\+",a,i),standard:t("",a,i)}}}}})}(Prism)}}]);
//# sourceMappingURL=408.6d254f8f.chunk.js.map