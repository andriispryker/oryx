import{noChange as e,_$LH as t}from"./lit-html.js";import{PartType as r}from"./directive.js";import{isPrimitive as n,isTemplateResult as o,isSingleExpression as l}from"./directive-helpers.js";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{R:i,D:a,V:s,I:c,F:d}=t,f=(e,t,r={})=>{if(void 0!==t._$litPart$)throw Error("container already contains a live render");let n,o;const l=[],i=document.createTreeWalker(t,NodeFilter.SHOW_COMMENT,null,!1);let a;for(;null!==(a=i.nextNode());){const t=a.data;if(t.startsWith("lit-part")){if(0===l.length&&void 0!==n)throw Error("there must be only one root part per container");o=p(e,a,l,r),null!=n||(n=o)}else if(t.startsWith("lit-node"))h(a,l,r);else if(t.startsWith("/lit-part")){if(1===l.length&&o!==n)throw Error("internal error");o=u(a,o,l)}}console.assert(void 0!==n,"there should be exactly one root part in a render container"),t._$litPart$=n},p=(t,r,l,d)=>{let f,p;if(0===l.length)p=new c(r,null,void 0,d),f=t;else{const e=l[l.length-1];if("template-instance"===e.type)p=new c(r,null,e.instance,d),e.instance.u.push(p),f=e.result.values[e.instancePartIndex++],e.templatePartIndex++;else if("iterable"===e.type){p=new c(r,null,e.part,d);const t=e.iterator.next();if(t.done)throw f=void 0,e.done=!0,Error("Unhandled shorter than expected iterable");f=t.value,e.part._$AH.push(p)}else p=new c(r,null,e.part,d)}if(f=s(p,f),f===e)l.push({part:p,type:"leaf"});else if(n(f))l.push({part:p,type:"leaf"}),p._$AH=f;else if(o(f)){const e="lit-part "+m(f);if(r.data!==e)throw Error("Hydration value mismatch: Unexpected TemplateResult rendered to part");{const e=c.prototype._$AC(f),t=new i(e,p);l.push({type:"template-instance",instance:t,part:p,templatePartIndex:0,instancePartIndex:0,result:f}),p._$AH=t}}else a(f)?(l.push({part:p,type:"iterable",value:f,iterator:f[Symbol.iterator](),done:!1}),p._$AH=[]):(l.push({part:p,type:"leaf"}),p._$AH=null==f?"":f);return p},u=(e,t,r)=>{if(void 0===t)throw Error("unbalanced part marker");t._$AB=e;const n=r.pop();if("iterable"===n.type&&!n.iterator.next().done)throw Error("unexpected longer than expected iterable");if(r.length>0)return r[r.length-1].part},h=(e,t,n)=>{var o;const i=/lit-node (\d+)/.exec(e.data),a=parseInt(i[1]),c=null!==(o=e.previousElementSibling)&&void 0!==o?o:e.parentElement;if(null===c)throw Error("could not find node for attribute parts");c.removeAttribute("defer-hydration");let f=t[t.length-1],p=1;for(;"template-instance"!==f.type&&t.length-p>=0;)f=t[t.length-p],p++;if("template-instance"!==f.type)throw Error("internal error");{const e=f.instance;for(;;){const t=e._$AD.parts[f.templatePartIndex];if(void 0===t||t.type!==r.ATTRIBUTE&&t.type!==r.ELEMENT||t.index!==a)break;if(t.type===r.ATTRIBUTE){const o=new t.ctor(c,t.name,t.strings,f.instance,n),i=l(o)?f.result.values[f.instancePartIndex]:f.result.values,a=!(o.type===r.EVENT||o.type===r.PROPERTY);o._$AI(i,o,f.instancePartIndex,a),f.instancePartIndex+=t.strings.length-1,e.u.push(o)}else{const t=new d(c,f.instance,n);s(t,f.result.values[f.instancePartIndex++]),e.u.push(t)}f.templatePartIndex++}}},m=e=>{const t=new Uint32Array(2).fill(5381);for(const r of e.strings)for(let e=0;e<r.length;e++)t[e%2]=33*t[e%2]^r.charCodeAt(e);return btoa(String.fromCharCode(...new Uint8Array(t.buffer)))};export{m as digestForTemplateResult,f as hydrate};
//# sourceMappingURL=experimental-hydrate.js.map
