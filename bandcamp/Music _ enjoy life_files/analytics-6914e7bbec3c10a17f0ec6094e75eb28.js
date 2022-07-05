!function(){"use strict";const t=JSON.parse(document.currentScript.dataset.data||"null"),e=JSON.parse(document.currentScript.dataset.items||"null"),i=document.createElement("script");i.src="https://www.google-analytics.com/analytics.js",i.async=!0,document.head.appendChild(i),window.ga=window.ga||function(){const t=Array.prototype.slice.call(arguments);return(ga.q=ga.q||[]).push(t)},window.Analytics={properties:[],call_queue:[],test_ids:["UA-4189134-10","UA-4189134-13"],live_ids:["UA-4189134-2","UA-4189134-11"],environments:{0:{sample_rate:100},1:{sample_rate:100,cookie_domain:"staging.bcdevs.com"},2:{sample_rate:8,use_live_ids:!0,cookie_domain:"bandcamp.com"}},dimensions:{LOGIN_STATE:"dimension1",CLIENT_ID:"dimension2"},metrics:{RESPONSE_END_TIME:"metric1",DOM_LOAD_TIME:"metric2",WINDOW_LOAD_TIME:"metric3"},currentCurrency:"USD",data:null,inited:!1,ecommerce:!1,init:function(){if(this.data=t||window.AnalyticsData,!this.data||this.inited)return;Identities.bmgr.bands().length>0?this.data.login_state="logged_in_band":Identities.user()?this.data.login_state="logged_in_user":this.data.login_state="not_logged_in";const e=this.environments[this.data.env];this.data.sample_rate=e.sample_rate,this.data.our_ids||(this.data.our_ids=e.use_live_ids?this.live_ids:this.test_ids),this.data.cookie_domain=this.data.domain_match?this.data.cookie_domain||e.cookie_domain:"auto",this.inited=!0;const i=this.data.send_full_url;this.split=window.location.href.split("?"),this.params=this.split[1]&&this.split[1].split("&");const n=[];this.params=this.params&&this.params.filter((function(t){const e="utm_"===t.substr(0,4),s="email="!==t.substr(0,6);return e&&n.push(t.split("=")[0]),i?s:e})),n.length>0&&HiddenParams.hide(n);let s=0;this.data.our_ids.forEach((function(t){this.properties.push(this.createPropertySendPageview(t,!0,s)),s++}),this),this.data.band_id&&this.createPropertySendPageview(this.data.band_id,!1,s),this.collectClientIds(),this.sendCheckoutItems(),this.sendTimings(),this.processQueuedEvents()},createPropertySendPageview:function(t,e,i){const n=(e?"bandcamp_":"band_")+i,s={name:n};e&&(s.cookieDomain=this.data.cookie_domain,s.sampleRate=this.data.sample_rate),ga("create",t,s);var a={id:t,ours:e,name:n,call:function(){const t=Array.prototype.slice.call(arguments);t[0]=a.name+"."+t[0],ga.apply(window,t)}};if(a.call("set","anonymizeIp",!0),a.call("set","forceSSL",!0),a.call("set","transport","beacon"),e&&a.call("set",this.dimensions.LOGIN_STATE,this.data.login_state),this.params){const t=this.params.length>0?"?"+this.params.join("&"):"",e=this.data.send_full_url?window.location.pathname+t:window.location.pathname;a.call("set","page",e),a.call("set","location",this.split[0]+t)}return a.call("send","pageview"),a},collectClientIds:function(){const t=this;ga((function(){const e=window.Analytics.properties,i=ga.getAll();for(let n=0;n<i.length;n++){const s=i[n].get("trackingId"),a=i[n].get("clientId");for(let i=0;i<e.length;i++){const n=e[i];n.id===s&&n.call("set",t.dimensions.CLIENT_ID,a)}}}))},sendCheckoutItems:function(){const t=e||window.AnalyticsItems;if(!t||0==t.length)return;const i={};t.forEach((function(t){(i[t.payment_id]=i[t.payment_id]||[]).push(t)}));let n=!1;if("undefined"!=typeof URLSearchParams){const t=Url.parseQuery(window.location.search);n=t&&t.always_send_txns}const s="analytics_processed_ids";let a=JSON.parse(localStorage.getItem(s)||"[]");const r=[];for(let t=0,e=Object.keys(i);t<e.length;t++)(n||-1===a.indexOf(e[t]))&&r.push(e[t]);if(0==r.length)return;const o={};r.forEach((function(t){i[t].forEach((function(t){const e=t.txn_id.slice();delete t.payment_id,delete t.txn_id,null==o[e]&&(o[e]=[]),o[e].push(t)}))})),this.requireEcommerce();const c=this;Object.keys(o).forEach((function(t){o[t].forEach((function(t){c.setCurrency(t.currency),delete t.currency,c.callOurProperties("ec:addProduct",t)})),c.callOurProperties("ec:setAction","purchase",{id:t})})),a=a.slice(Math.max(a.length-1e3,0)),localStorage.setItem(s,JSON.stringify(a.concat(r)))},sendTimings:function(){if(!window.performance||!window.performance.timing)return;if("complete"!=document.readyState)return void window.addEventListener("load",(function(){window.Analytics.sendTimings()}));const t=performance.timing,e=t.navigationStart,i=Math.round(t.responseEnd-e),n=Math.round(t.domContentLoadedEventStart-e),s=Math.round(t.loadEventStart-e);if(function(t){let e=!0;return t.forEach((function(t){(t<=0||t>=1e6)&&(e=!1)})),e}([i,n,s])){const t={eventCategory:"Navigation Timing",eventAction:"track",nonInteraction:!0};t[this.metrics.RESPONSE_END_TIME]=i,t[this.metrics.DOM_LOAD_TIME]=n,t[this.metrics.WINDOW_LOAD_TIME]=s,this.callOurProperties("send","event",t)}},processQueuedEvents:function(){for(;this.call_queue.length>0;)this.callOurProperties.apply(this,this.call_queue.shift())},callOurProperties:function(){const t=Array.prototype.slice.call(arguments);this.inited?this.properties.forEach((function(e){e.ours&&e.call.apply(null,t)})):this.call_queue.push(t)},setCurrency:function(t){t&&t!=this.currentCurrency&&(this.callOurProperties("set","currencyCode",t),this.currentCurrency=t)},cartItemEvent:function(t,e){const i="add"==t;this.requireEcommerce(),this.setCurrency(e.currency),this.callOurProperties("ec:addProduct",{id:e.item_type+e.item_id,name:e.item_title,category:e.item_type,price:e.unit_price,variant:e.is_gift?"gift":"_none",quantity:e.quantity}),this.callOurProperties("ec:setAction",i?"add":"remove"),this.callOurProperties("send","event","Checkout",i?"add_to_cart":"remove_from_cart",e.item_type,e.item_id)},requireEcommerce:function(){this.ecommerce||(this.callOurProperties("require","ec"),this.ecommerce=!0)}},window.Analytics.init()}();
