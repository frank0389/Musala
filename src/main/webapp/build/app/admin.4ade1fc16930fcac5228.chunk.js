"use strict";(self.webpackChunkwebapp=self.webpackChunkwebapp||[]).push([[328],{9151:function(e,r,t){t(47941),t(82772),t(82526),t(41817),t(67294);var n=t(95305),a=t(58653),o=t(72962),i=t(24498),s=t(94439),l=t(77745),c=t(85893),u=["onClose","onAccept","description","title","open","cancelButtonText","acceptButtonText"];r.Z=function(e){var r=e.onClose,t=e.onAccept,d=e.description,m=e.title,f=e.open,g=e.cancelButtonText,p=e.acceptButtonText,h=(function(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}}(e,u),function(){r()});return(0,c.jsxs)(a.Z,{open:f,onClose:h,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,c.jsx)(l.Z,{id:"alert-dialog-title",children:m}),(0,c.jsx)(i.Z,{children:(0,c.jsx)(s.Z,{id:"alert-dialog-description",children:d})}),(0,c.jsxs)(o.Z,{children:[(0,c.jsx)(n.Z,{onClick:h,autoFocus:!0,children:g}),(0,c.jsx)(n.Z,{onClick:function(){t()},children:p})]})]})}},38596:function(e,r,t){t.d(r,{Z:function(){return B}}),t(69070),t(82526),t(41817),t(41539),t(32165),t(66992),t(78783),t(33948),t(47042),t(91038),t(74916),t(77601);var n=t(81719),a=t(41796),o=t(78227),i=t(42761),s=t(67294),l=t(96486),c=t(18720),u=t(50130),d=t(56143),m=t(81602),f=(t(47941),t(82772),t(57327),t(38880),t(54747),t(49337),t(33321),t(21249),t(95305)),g=t(58653),p=t(72962),h=t(24498),x=t(77745),j=t(18037),y=t(88904),b=t(20399),v=t(85893),Z=["onCancel","onAccept","valueProp","options","title","open","cancelButtonText","acceptButtonText"];function O(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function N(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?O(Object(t),!0).forEach((function(r){w(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function w(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function P(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var S=function(e){var r,t,n=e.onCancel,a=e.onAccept,o=e.valueProp,i=e.options,l=e.title,c=e.open,u=e.cancelButtonText,d=e.acceptButtonText,m=function(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}(e,Z),O=(r=s.useState(o),t=2,function(e){if(Array.isArray(e))return e}(r)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o=[],i=!0,s=!1;try{for(t=t.call(e);!(i=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);i=!0);}catch(e){s=!0,a=e}finally{try{i||null==t.return||t.return()}finally{if(s)throw a}}return o}}(r,t)||function(e,r){if(e){if("string"==typeof e)return P(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?P(e,r):void 0}}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),w=O[0],S=O[1],C=s.useRef(null);return s.useEffect((function(){c||S(o)}),[o,c]),(0,v.jsxs)(g.Z,N(N({sx:{"& .MuiDialog-paper":{width:"80%",maxHeight:435}},maxWidth:"xs",TransitionProps:{onEntering:function(){null!=C.current&&C.current.focus()}},open:c},m),{},{children:[(0,v.jsx)(x.Z,{id:"alert-dialog-title",children:l}),(0,v.jsx)(h.Z,{dividers:!0,children:(0,v.jsx)(y.Z,{ref:C,"aria-label":"ringtone",name:"ringtone",value:w,onChange:function(e){S(e.target.value)},children:i.map((function(e){return(0,v.jsx)(j.Z,{value:e,control:(0,v.jsx)(b.Z,{}),label:e},e)}))})}),(0,v.jsxs)(p.Z,{children:[(0,v.jsx)(f.Z,{autoFocus:!0,onClick:function(){n()},children:u}),(0,v.jsx)(f.Z,{onClick:function(){a(w)},children:d})]})]}))},C=t(22327);function E(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o=[],i=!0,s=!1;try{for(t=t.call(e);!(i=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);i=!0);}catch(e){s=!0,a=e}finally{try{i||null==t.return||t.return()}finally{if(s)throw a}}return o}}(e,r)||function(e,r){if(e){if("string"==typeof e)return A(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?A(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function I(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var k=(0,n.ZP)("div")((function(e){var r=e.theme;return I({position:"relative",borderRadius:r.shape.borderRadius,backgroundColor:(0,a.Fq)(r.palette.common.white,.15),"&:hover":{backgroundColor:(0,a.Fq)(r.palette.common.white,.25)},marginRight:r.spacing(2),marginLeft:0,width:"100%"},r.breakpoints.up("sm"),{marginLeft:r.spacing(3),width:"auto"})})),T=(0,n.ZP)("div")((function(e){return{padding:e.theme.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"}})),W=(0,n.ZP)(o.ZP)((function(e){var r=e.theme;return{color:"inherit","& .MuiInputBase-input":I({padding:r.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(r.spacing(4),")"),transition:r.transitions.create("width"),width:"100%"},r.breakpoints.up("md"),{width:"20ch"})}})),B=function(e){var r=e.onSearchHandler,t=e.options,n=(0,C.$)("search").t,a=E(s.useState(!1),2),o=a[0],f=a[1],g=E(s.useState(t.length?t[0]:""),2),p=g[0],h=g[1],x=(0,l.debounce)((function(e){r(e.target.value,p)}),500);return(0,v.jsxs)(c.Z,{sx:{display:"flex"},children:[(0,v.jsx)(S,{onCancel:function(){f(!1)},onAccept:function(e){h(e),f(!1)},valueProp:p,options:t,title:n("dialog.title"),open:o,cancelButtonText:n("dialog.cancelButtonText"),acceptButtonText:n("dialog.acceptButtonText")}),(0,v.jsxs)(k,{children:[(0,v.jsx)(T,{children:(0,v.jsx)(i.Z,{})}),(0,v.jsx)(W,{placeholder:n("placeholder")+" "+p,inputProps:{"aria-label":"search"},onChange:x})]}),(0,v.jsx)(m.Z,{title:"Filter",children:(0,v.jsx)(u.Z,{onClick:function(){f(!0)},children:(0,v.jsx)(d.Z,{})})})]})}},43260:function(e,r,t){t.r(r),t.d(r,{default:function(){return ge}});var n=t(96974),a=t(67294),o=t(48120),i=t(85893),s=function(e){return(0,i.jsx)(o.Z,{maxWidth:!1,children:(0,i.jsx)(n.j3,{})})},l=(t(82772),t(21249),t(82526),t(41817),t(41539),t(32165),t(66992),t(78783),t(33948),t(47042),t(91038),t(74916),t(77601),t(69070),t(47941),t(57327),t(38880),t(54747),t(49337),t(33321),t(91647)),c=t(30030),u=t(76482),d=t(18720),m=t(68354),f=t(40147),g=t(50130),p=t(12530),h=t(22949),x=t(17888),j=t(18508),y=t(2785),b=t(42853),v=t(33483),Z=t(9144),O=t(95305),N=t(22327),w=t(29723),P=t(39704),S=t(88638),C=t(74825),E=t(63949),A=t(35247),I=t(62097),k=t(54384),T=t(25722);function W(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function B(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?W(Object(t),!0).forEach((function(r){D(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):W(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function D(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function K(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o=[],i=!0,s=!1;try{for(t=t.call(e);!(i=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);i=!0);}catch(e){s=!0,a=e}finally{try{i||null==t.return||t.return()}finally{if(s)throw a}}return o}}(e,r)||function(e,r){if(e){if("string"==typeof e)return M(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?M(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function R(e,r,t){return{fontWeight:-1===r.indexOf(e)?t.typography.fontWeightRegular:t.typography.fontWeightMedium}}var q=function(e){var r=(0,N.$)("newu").t,t=(0,n.s0)(),s=(0,P.I0)(),W=(0,I.Z)(),D=K((0,a.useState)({error:!1,message:""}),2),M=D[0],q=D[1],F=K((0,a.useState)([]),2),$=F[0],H=F[1],U=K((0,a.useState)({error:!1,message:""}),2),L=U[0],z=U[1],V=K((0,a.useState)({error:!1,message:""}),2),G=V[0],J=V[1],X=K((0,a.useState)({error:!1,message:""}),2),Q=X[0],Y=X[1],_=K((0,a.useState)({error:!1,message:""}),2),ee=_[0],re=_[1],te=K((0,a.useState)({firstName:"",lastName:"",userName:"",roles:[],langKey:""}),2),ne=te[0],ae=te[1],oe=(0,P.v9)(E.eH),ie=(0,P.v9)(E.dS),se=(0,P.v9)(E.SM),le=(0,P.v9)(E.b5);return(0,a.useEffect)((function(){s((0,E.F3)())}),[]),0===le.length?(0,i.jsx)(S.Z,{open:!0}):(0,i.jsxs)(o.Z,{component:"main",maxWidth:"md",children:[(0,i.jsx)(S.Z,{open:"loading"===ie}),(0,i.jsx)(m.Z,{in:"failed"===ie,children:(0,i.jsx)(f.Z,{color:"error",severity:"error",sx:{mb:2,backgroundColor:"transparent"},children:r("errorMessage")+"."+oe})}),(0,i.jsx)(m.Z,{in:!0===se,children:(0,i.jsx)(f.Z,{color:"success",severity:"success",sx:{mb:2,backgroundColor:"transparent"},children:r("successMessage")})}),(0,i.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,i.jsx)(c.ZP,{item:!0,xs:12,children:(0,i.jsx)(T.Z,{children:(0,i.jsxs)(k.Z,{children:[(0,i.jsx)(g.Z,{edge:"start",color:"inherit","aria-label":"Add User",sx:{mr:.5},children:(0,i.jsx)(w.Z,{})}),(0,i.jsx)(l.Z,{variant:"h6",color:"inherit",component:"div",children:r("title")})]})})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,children:(0,i.jsx)(u.Z,{children:(0,i.jsx)(p.Z,{children:(0,i.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsx)(h.Z,{error:M.error,helperText:M.message,autoComplete:"given-name",name:"firstName",fullWidth:!0,id:"firstName",label:r("firstName"),onChange:function(e){q({error:!1,message:""}),ae(B(B({},ne),{},{firstName:e.target.value}))},value:ne.firstName,autoFocus:!0,variant:"standard"})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsx)(h.Z,{error:L.error,helperText:L.message,fullWidth:!0,id:"lastName",label:r("lastName"),onChange:function(e){z({error:!1,message:""}),ae(B(B({},ne),{},{lastName:e.target.value}))},value:ne.lastName,name:"lastName",autoComplete:"family-name",variant:"standard"})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsx)(h.Z,{error:ee.error,helperText:ee.message,fullWidth:!0,id:"user",label:r("userName"),name:"user",autoComplete:"userName",onChange:function(e){re({error:!1,message:""}),ae(B(B({},ne),{},{userName:e.target.value}))},value:ne.userName,variant:"standard"})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsxs)(x.Z,{fullWidth:!0,children:[(0,i.jsx)(j.Z,{id:"language-label",children:r("language")}),(0,i.jsx)(y.Z,{labelId:"language-label",id:"language",error:Q.error,value:ne.langKey,label:r("language"),variant:"standard",onChange:function(e){Y({error:!1,message:""}),ae(B(B({},ne),{},{langKey:e.target.value}))},children:["es","en"].map((function(e){return(0,i.jsxs)(C.Z,{value:e,children:[e," "]},e)}))}),(0,i.jsx)(b.Z,{children:Q.message})]})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsxs)(x.Z,{sx:{width:"100%"},children:[(0,i.jsxs)(j.Z,{id:"select-role-label",children:[r("roles")," "]}),(0,i.jsx)(y.Z,{id:"multiple",multiple:!0,error:G.error,value:ne.roles,onChange:function(e){J({error:!1,message:""});var r=e.target.value;H("string"==typeof r?r.split(","):r),ae(B(B({},ne),{},{roles:"string"==typeof r?r.split(","):r}))},variant:"standard",renderValue:function(e){return(0,i.jsx)(d.Z,{sx:{display:"flex",border:"none",flexWrap:"wrap",gap:.5},children:e.map((function(e){return(0,i.jsx)(v.Z,{icon:(0,A.I)(e),variant:"outlined",label:e},e)}))})},children:le.map((function(e){return(0,i.jsx)(C.Z,{value:e.name,style:R(e.name,$,W),children:e.name},e.id)}))}),(0,i.jsx)(b.Z,{children:G.message})]})})]})})})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,children:(0,i.jsx)(d.Z,{display:"flex",justifyContent:"flex-end",children:(0,i.jsxs)(Z.Z,{direction:"row",spacing:2,children:[(0,i.jsx)(O.Z,{variant:"contained",color:"primary",onClick:function(){t("/admin/users")},children:r("cancelButtonText")}),(0,i.jsx)(O.Z,{variant:"contained",color:"primary",onClick:function(){null==ne.firstName||null==ne.firstName||0==ne.firstName.length?(z({error:!1,message:""}),Y({error:!1,message:""}),setEmailInputError({error:!1,message:""}),J({error:!1,message:""}),q({error:!0,message:r("requiredError")})):null==ne.lastName||null==ne.lastName||0==ne.lastName.length?(q({error:!1,message:""}),setEmailInputError({error:!1,message:""}),Y({error:!1,message:""}),J({error:!1,message:""}),z({error:!0,message:r("requiredError")})):null==ne.userName||null==ne.userName||0==ne.userName.length?(z({error:!1,message:""}),q({error:!1,message:""}),Y({error:!1,message:""}),J({error:!1,message:""}),re({error:!0,message:r("requiredError")})):null==ne.langKey||null==ne.langKey||0==ne.langKey.length?(z({error:!1,message:""}),q({error:!1,message:""}),setEmailInputError({error:!1,message:""}),J({error:!1,message:""}),Y({error:!0,message:r("requiredError")})):0==ne.roles.length?(z({error:!1,message:""}),q({error:!1,message:""}),setEmailInputError({error:!1,message:""}),Y({error:!1,message:""}),J({error:!0,message:r("requiredError")})):(ae({firstName:"",lastName:"",userName:"",roles:[],langKey:""}),s((0,E.r4)({firstName:ne.firstName,lastName:ne.lastName,userName:ne.userName,roles:ne.roles,langKey:ne.langKey})))},children:r("acceptButtonText")})]})})})]})]})},F=(t(38862),t(14182));function $(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function H(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?$(Object(t),!0).forEach((function(r){U(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):$(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function U(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function L(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o=[],i=!0,s=!1;try{for(t=t.call(e);!(i=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);i=!0);}catch(e){s=!0,a=e}finally{try{i||null==t.return||t.return()}finally{if(s)throw a}}return o}}(e,r)||function(e,r){if(e){if("string"==typeof e)return z(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?z(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function V(e,r,t){return{fontWeight:-1===r.indexOf(e)?t.typography.fontWeightRegular:t.typography.fontWeightMedium}}var G=function(e){var r=(0,N.$)("editu").t,t=(0,I.Z)(),s=(0,n.s0)(),w=(0,n.UO)().userName,W=L((0,a.useState)({error:!1,message:""}),2),B=W[0],D=W[1],K=L((0,a.useState)({error:!1,message:""}),2),M=K[0],R=K[1],q=L((0,a.useState)({error:!1,message:""}),2),$=q[0],U=q[1],z=L((0,a.useState)({error:!1,message:""}),2),G=z[0],J=z[1],X=L((0,a.useState)({error:!1,message:""}),2),Q=X[0],Y=X[1],_=L((0,a.useState)([]),2),ee=_[0],re=_[1],te=L((0,a.useState)(null),2),ne=te[0],ae=te[1],oe=(0,P.I0)(),ie=(0,P.v9)(E.f2),se=(0,P.v9)(E.dS),le=(0,P.v9)(E.np),ce=(0,P.v9)(E.eH),ue=(0,P.v9)(E.b5);return(0,a.useEffect)((function(){oe((0,E.F3)()),oe((0,E.PR)(w))}),[w]),(0,a.useEffect)((function(){null!=le&&ae(le)}),[le]),null===ne||0===ue.length?(0,i.jsx)(S.Z,{open:!0}):(0,i.jsxs)(o.Z,{component:"main",maxWidth:"md",children:[(0,i.jsx)(S.Z,{open:"loading"===se}),(0,i.jsx)(m.Z,{in:"failed"===se,children:(0,i.jsx)(f.Z,{color:"error",severity:"error",sx:{mb:2,backgroundColor:"transparent"},children:r("errorMessage")+"."+ce})}),(0,i.jsx)(m.Z,{in:!0===ie,children:(0,i.jsx)(f.Z,{color:"success",severity:"success",sx:{mb:2,backgroundColor:"transparent"},children:r("successMessage")})}),(0,i.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,i.jsx)(c.ZP,{item:!0,xs:12,children:(0,i.jsx)(T.Z,{children:(0,i.jsxs)(k.Z,{children:[(0,i.jsx)(g.Z,{edge:"start",color:"inherit","aria-label":"Add User",sx:{mr:.5},children:(0,i.jsx)(F.Z,{})}),(0,i.jsx)(l.Z,{variant:"h6",color:"inherit",component:"div",children:r("title")})]})})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,children:(0,i.jsx)(u.Z,{children:(0,i.jsx)(p.Z,{children:(0,i.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsx)(h.Z,{error:$.error,helperText:$.message,autoComplete:"given-name",name:"firstName",fullWidth:!0,id:"firstName",label:r("firstName"),value:ne.firstName,onChange:function(e){U({error:!1,message:""}),ae(H(H({},ne),{},{firstName:e.target.value}))},autoFocus:!0,variant:"standard"})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsx)(h.Z,{error:G.error,helperText:G.message,fullWidth:!0,id:"lastName",label:r("lastName"),onChange:function(e){J({error:!1,message:""}),ae(H(H({},ne),{},{lastName:e.target.value}))},value:ne.lastName,name:"lastName",autoComplete:"family-name",variant:"standard"})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsx)(h.Z,{error:M.error,helperText:M.message,fullWidth:!0,id:"userName",label:r("userName"),onChange:function(e){R({error:!1,message:""}),ae(H(H({},ne),{},{userName:e.target.value}))},value:ne.userName,name:"userName",autoComplete:"userName",variant:"standard"})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsxs)(x.Z,{fullWidth:!0,children:[(0,i.jsx)(j.Z,{id:"language-label",children:r("language")}),(0,i.jsx)(y.Z,{labelId:"language-label",id:"language",error:B.error,value:ne.langKey,label:r("language"),variant:"standard",onChange:function(e){D({error:!1,message:""}),ae(H(H({},ne),{},{langKey:e.target.value}))},children:["es","en"].map((function(e){return(0,i.jsxs)(C.Z,{value:e,children:[e," "]},e)}))}),(0,i.jsx)(b.Z,{children:B.message})]})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsxs)(x.Z,{sx:{width:"100%"},children:[(0,i.jsxs)(j.Z,{id:"select-role-label",children:[r("roles")," "]}),(0,i.jsx)(y.Z,{id:"multiple",multiple:!0,error:Q.error,value:ne.roles,onChange:function(e){Y({error:!1,message:""});var r=e.target.value;re("string"==typeof r?r.split(","):r),ae(H(H({},ne),{},{roles:"string"==typeof r?r.split(","):r}))},variant:"standard",renderValue:function(e){return(0,i.jsx)(d.Z,{sx:{display:"flex",border:"none",flexWrap:"wrap",gap:.5},children:e.map((function(e){return(0,i.jsx)(v.Z,{icon:(0,A.I)(e),variant:"outlined",label:e},e)}))})},children:ue.map((function(e){return(0,i.jsx)(C.Z,{value:e.name,style:V(e.name,ee,t),children:e.name},e.id)}))}),(0,i.jsx)(b.Z,{children:Q.message})]})})]})})})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,children:(0,i.jsx)(d.Z,{display:"flex",justifyContent:"flex-end",children:(0,i.jsxs)(Z.Z,{direction:"row",spacing:2,children:[(0,i.jsx)(O.Z,{variant:"contained",color:"primary",onClick:function(){s("/admin/users")},children:r("cancelButtonText")}),(0,i.jsx)(O.Z,{variant:"contained",color:"primary",onClick:function(){null==ne.firstName||null==ne.firstName||0==ne.firstName.length?(J({error:!1,message:""}),D({error:!1,message:""}),setEmailInputError({error:!1,message:""}),Y({error:!1,message:""}),U({error:!0,message:r("requiredError")})):null==ne.lastName||null==ne.lastName||0==ne.lastName.length?(U({error:!1,message:""}),setEmailInputError({error:!1,message:""}),D({error:!1,message:""}),Y({error:!1,message:""}),J({error:!0,message:r("requiredError")})):null==ne.userName||null==ne.userName||0==ne.userName.length?(J({error:!1,message:""}),U({error:!1,message:""}),D({error:!1,message:""}),Y({error:!1,message:""}),R({error:!0,message:r("requiredError")})):null==ne.langKey||null==ne.langKey||0==ne.langKey.length?(J({error:!1,message:""}),U({error:!1,message:""}),setEmailInputError({error:!1,message:""}),Y({error:!1,message:""}),D({error:!0,message:r("requiredError")})):0==ne.roles.length?(J({error:!1,message:""}),U({error:!1,message:""}),setEmailInputError({error:!1,message:""}),D({error:!1,message:""}),Y({error:!0,message:r("requiredError")})):(console.log(JSON.stringify(ne)),oe((0,E.uz)(ne)))},children:r("acceptButtonText")})]})})})]})]})},J=(t(69826),t(2707),t(91058),t(13150)),X=t(66140),Q=t(3030),Y=t(93406),_=t(58561),ee=t(56322),re=t(48736),te=t(81602),ne=t(95135),ae=t(51797),oe=t(19717),ie=t(81680),se=t(13113),le=t(38596),ce=t(9151),ue=t(173);function de(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,o=[],i=!0,s=!1;try{for(t=t.call(e);!(i=(n=t.next()).done)&&(o.push(n.value),!r||o.length!==r);i=!0);}catch(e){s=!0,a=e}finally{try{i||null==t.return||t.return()}finally{if(s)throw a}}return o}}(e,r)||function(e,r){if(e){if("string"==typeof e)return me(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?me(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function me(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var fe=function(e){var r=(0,N.$)("user").t,t=[{id:"id",label:"ID",minWidth:100,sort:!0},{id:"userName",label:r("column.user"),minWidth:100,sort:!0},{id:"firstName",label:r("column.firstName"),minWidth:100,sort:!0},{id:"lastName",label:r("column.lastName"),minWidth:100,sort:!0},{id:"roles",label:r("column.roles"),minWidth:100,sort:!1},{id:"actions",label:r("column.actions"),minWidth:100,align:"center",sort:!1}],s=[r("column.user"),r("column.firstName"),r("column.lastName")],l=(0,P.I0)(),c=(0,n.s0)(),u=(0,P.v9)(E.eH),p=(0,P.v9)(E.dS),h=(0,P.v9)(ue.DI),x=(0,P.v9)(E.cn),j=(0,P.v9)(E.CK),y=de((0,a.useState)(0),2),b=y[0],v=y[1],Z=de((0,a.useState)(5),2),O=Z[0],w=Z[1],C=de((0,a.useState)({property:"id",direction:"asc"}),2),A=C[0],I=C[1],W=de((0,a.useState)({column:"",text:""}),2),B=W[0],D=W[1],K=de((0,a.useState)(!1),2),M=K[0],R=K[1],q=de(a.useState(""),2),F=q[0],$=q[1],H=function(e){return function(r){var t="asc"===A.direction;I({property:e,direction:t?"desc":"asc"}),l((0,E.Rf)(B.column,B.text,b,O,A))}};return(0,a.useEffect)((function(){l((0,E.Rf)(B.column,B.text,b,O,A))}),[]),(0,i.jsxs)(o.Z,{maxWidth:!1,children:[(0,i.jsx)(S.Z,{open:"loading"===p}),(0,i.jsx)(ce.Z,{open:M,title:r("confirmDialogTitle"),description:r("confirmDialogDescription"),onClose:function(){R(!1)},onAccept:function(){R(!1),h.userName!==F&&"admin"!==F&&l((0,E.kX)(F,B.column,B.text,b,O,A))},cancelButtonText:r("cancelButtonText"),acceptButtonText:r("acceptButtonText")}),(0,i.jsx)(m.Z,{in:"failed"===p,children:(0,i.jsx)(f.Z,{color:"error",severity:"error",sx:{mb:2,backgroundColor:"transparent"},children:u})}),(0,i.jsxs)(T.Z,{sx:{width:"100%",overflow:"hidden"},children:[(0,i.jsxs)(k.Z,{children:[(0,i.jsx)(d.Z,{sx:{flexGrow:1}}),(0,i.jsx)(le.Z,{onSearchHandler:function(e,r){if(null==e||0===e.length)D({column:"",text:""}),l((0,E.Rf)("","",b,O,A));else{var n=t.find((function(e){return e.label===r}));n&&(D({column:n.id,text:e}),l((0,E.Rf)(n.id,e,b,O,A)))}},options:s}),(0,i.jsx)(te.Z,{title:r("add"),children:(0,i.jsx)(g.Z,{onClick:function(){c("/admin/users/new")},color:"primary",children:(0,i.jsx)(ne.Z,{sx:{fontSize:40}})})})]}),(0,i.jsx)(Y.Z,{sx:{maxHeight:440},children:(0,i.jsxs)(J.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,i.jsx)(_.Z,{children:(0,i.jsx)(re.Z,{children:t.map((function(e){return!0===e.sort?(0,i.jsx)(Q.Z,{align:e.align,sortDirection:A.property===e.id&&A.direction,children:(0,i.jsxs)(ie.Z,{active:A.property===e.id,direction:A.property===e.id?A.direction:"asc",onClick:H(e.id),children:[r(e.label),A.property===e.id?(0,i.jsx)(d.Z,{component:"span",sx:se.Z,children:"desc"===A.direction?"sorted descending":"sorted ascending"}):null]})},e.id):(0,i.jsx)(Q.Z,{align:e.align,style:{minWidth:e.minWidth},children:e.label},e.id)}))})}),(0,i.jsx)(X.Z,{children:x.map((function(e){return(0,i.jsx)(re.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:t.map((function(r){if("actions"===r.id)return(0,i.jsxs)(Q.Z,{align:"center",children:[(0,i.jsx)(g.Z,{disabled:"admin"===e.userName,sx:{ml:2},color:"inherit",onClick:function(){$(e.userName),c("/admin/users/"+e.userName)},children:(0,i.jsx)(ae.Z,{})}),(0,i.jsx)(g.Z,{disabled:"admin"===e.userName||e.userName===h.userName,align:"left",onClick:function(){$(e.userName),R(!0)},children:(0,i.jsx)(oe.Z,{color:"secondary"})})]},r.id);var t="roles"===r.id?e[r.id].join():e[r.id];return(0,i.jsx)(Q.Z,{align:r.align,children:r.format&&"number"==typeof t?r.format(t):t},r.id)}))},e.userName)}))})]})}),(0,i.jsx)(ee.Z,{rowsPerPageOptions:[5,10,25,100],component:"div",count:parseInt(j),rowsPerPage:O,page:b,onPageChange:function(e,r){v(r),l((0,E.Rf)(B.column,B.text,r,O,A))},onRowsPerPageChange:function(e){w(+e.target.value),v(0),l((0,E.Rf)(B.column,B.text,0,e.target.value,A))}})]})]})},ge=function(e){return(0,i.jsx)(n.Z5,{children:(0,i.jsxs)(n.AW,{path:"users/*",element:(0,i.jsx)(s,{}),children:[(0,i.jsx)(n.AW,{index:!0,element:(0,i.jsx)(fe,{})}),(0,i.jsx)(n.AW,{path:"new",element:(0,i.jsx)(q,{})}),(0,i.jsx)(n.AW,{path:":userName",element:(0,i.jsx)(G,{})})]})})}}}]);
//# sourceMappingURL=admin.4ade1fc16930fcac5228.chunk.js.map