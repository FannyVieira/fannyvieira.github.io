(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{169:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return h}));var o=n(1),i=n(9),r=(n(0),n(174)),a={id:"what-ive-learned-contributing-for-firefox-dev-tools",title:"What i've learned contributing for firefox dev tools",author:"Fanny Vieira",author_title:"Enterprise Engineer Intern @ Facebook",author_url:"https://github.com/fanny",author_image_url:"https://i.imgur.com/QMznITd.jpg",tags:["opensource","firefox","mozilla","contributors"]},s={permalink:"/blog/what-ive-learned-contributing-for-firefox-dev-tools",source:"@site/blog/2019-07-19-what-ive-learned-contributing-for-firefox-dev-tools.md",description:"It's very common when we join in a community, we feel that don't be capable, or that don't have knowledge enough to fix a problem. Mainly, when it is Firefox, that is a gigantic community, i also passed through this, and i will tell you how i got over. \x3c!--truncate--\x3e",date:"2019-07-19T00:00:00.000Z",tags:[{label:"opensource",permalink:"/blog/tags/opensource"},{label:"firefox",permalink:"/blog/tags/firefox"},{label:"mozilla",permalink:"/blog/tags/mozilla"},{label:"contributors",permalink:"/blog/tags/contributors"}],title:"What i've learned contributing for firefox dev tools",truncated:!0,prevItem:{title:"The beauty of functional programming",permalink:"/blog/the-beauty-of-functional-programming"}},l=[],c={rightToc:l};function h(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"It's very common when we join in a community, we feel that don't be capable, or that don't have knowledge enough to fix a problem. Mainly, when it is Firefox, that is a gigantic community, i also passed through this, and i will tell you how i got over. "),Object(r.b)("h1",{id:"dont-be-afraid"},"Don't be afraid"),Object(r.b)("p",null,Object(r.b)("img",Object(o.a)({parentName:"p"},{src:"https://media.giphy.com/media/AFTWK5Qo22V2g/giphy.gif",alt:null}))),Object(r.b)("p",null,"Beginning to read and try to understand the project, naturally, there were many snippets that I didn't understand, but there were anothers, that is very similar to my university projects, see ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/mozilla/gecko-dev/blob/master/devtools/client/webconsole/components/FilterBar.js"}),"this component")," of dev tools project:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),'/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/. */\n"use strict";\n\nconst { Component, createFactory } = require("devtools/client/shared/vendor/react");\nconst dom = require("devtools/client/shared/vendor/react-dom-factories");\nconst { connect } = require("devtools/client/shared/vendor/react-redux");\nconst { getAllFilters } = require("devtools/client/webconsole/selectors/filters");\nconst { getFilteredMessagesCount } = require("devtools/client/webconsole/selectors/messages");\nconst { getAllUi } = require("devtools/client/webconsole/selectors/ui");\nconst actions = require("devtools/client/webconsole/actions/index");\nconst { l10n } = require("devtools/client/webconsole/utils/messages");\nconst { PluralForm } = require("devtools/shared/plural-form");\nconst {\n  FILTERS,\n  FILTERBAR_DISPLAY_MODES,\n} = require("../constants");\n\nconst FilterButton = require("devtools/client/webconsole/components/FilterButton");\nconst FilterCheckbox = require("devtools/client/webconsole/components/FilterCheckbox");\nconst SearchBox = createFactory(require("devtools/client/shared/components/SearchBox"));\n\nloader.lazyRequireGetter(this, "PropTypes", "devtools/client/shared/vendor/react-prop-types");\n\nclass FilterBar extends Component {\n  static get propTypes() {\n    return {\n      dispatch: PropTypes.func.isRequired,\n      filter: PropTypes.object.isRequired,\n      persistLogs: PropTypes.bool.isRequired,\n      hidePersistLogsCheckbox: PropTypes.bool.isRequired,\n      showContentMessages: PropTypes.bool.isRequired,\n      hideShowContentMessagesCheckbox: PropTypes.bool.isRequired,\n      filteredMessagesCount: PropTypes.object.isRequired,\n      closeButtonVisible: PropTypes.bool,\n      closeSplitConsole: PropTypes.func,\n      displayMode:\n        PropTypes.oneOf([...Object.values(FILTERBAR_DISPLAY_MODES)]).isRequired,\n    };\n  }\n\n  static get defaultProps() {\n    return {\n      hidePersistLogsCheckbox: false,\n      hideShowContentMessagesCheckbox: true,\n    };\n  }\n\n  constructor(props) {\n    super(props);\n\n    this.onClickMessagesClear = this.onClickMessagesClear.bind(this);\n    this.onSearchBoxChange = this.onSearchBoxChange.bind(this);\n    this.onChangePersistToggle = this.onChangePersistToggle.bind(this);\n    this.onChangeShowContent = this.onChangeShowContent.bind(this);\n    this.renderFiltersConfigBar = this.renderFiltersConfigBar.bind(this);\n\n    this.maybeUpdateLayout = this.maybeUpdateLayout.bind(this);\n    this.resizeObserver = new ResizeObserver(this.maybeUpdateLayout);\n  }\n\n  componentDidMount() {\n    this.filterInputMinWidth = 150;\n    try {\n      const filterInput = this.wrapperNode.querySelector(".devtools-searchbox");\n      this.filterInputMinWidth =\n        Number(window.getComputedStyle(filterInput)["min-width"].replace("px", ""));\n    } catch (e) {\n      // If the min-width of the filter input isn\'t set, or is set in a different unit\n      // than px.\n      console.error("min-width of the filter input couldn\'t be retrieved.", e);\n    }\n\n    this.maybeUpdateLayout();\n    this.resizeObserver.observe(this.wrapperNode);\n  }\n\n  shouldComponentUpdate(nextProps, nextState) {\n    const {\n      filter,\n      persistLogs,\n      showContentMessages,\n      filteredMessagesCount,\n      closeButtonVisible,\n      displayMode,\n    } = this.props;\n\n    // ...\n    if (\n      JSON.stringify(nextProps.filteredMessagesCount) !==\n        JSON.stringify(filteredMessagesCount)\n    ) {\n      return true;\n    }\n\n    if (nextProps.closeButtonVisible != closeButtonVisible) {\n      return true;\n    }\n\n    if (nextProps.displayMode != displayMode) {\n      return true;\n    }\n\n    return false;\n  }\n\n  /**\n   * Update the boolean state that informs where the filter buttons should be rendered.\n   * If the filter buttons are rendered inline with the filter input and the filter\n   * input width is reduced below a threshold, the filter buttons are rendered on a new\n   * row. When the filter buttons are on a separate row and the filter input grows\n   * wide enough to display the filter buttons without dropping below the threshold,\n   * the filter buttons are rendered inline.\n   */\n  maybeUpdateLayout() {\n    const {\n      dispatch,\n      displayMode,\n    } = this.props;\n\n    const filterInput = this.wrapperNode.querySelector(".devtools-searchbox");\n    const {width: filterInputWidth} = filterInput.getBoundingClientRect();\n\n    if (displayMode === FILTERBAR_DISPLAY_MODES.WIDE) {\n      if (filterInputWidth <= this.filterInputMinWidth) {\n        dispatch(actions.filterBarDisplayModeSet(FILTERBAR_DISPLAY_MODES.NARROW));\n      }\n\n      return;\n    }\n\n    if (displayMode === FILTERBAR_DISPLAY_MODES.NARROW) {\n      const filterButtonsToolbar =\n        this.wrapperNode.querySelector(".webconsole-filterbar-secondary");\n\n      const buttonMargin = 5;\n      const filterButtonsToolbarWidth = Array.from(filterButtonsToolbar.children).reduce(\n        (width, el) => width + el.getBoundingClientRect().width + buttonMargin, 0);\n\n      if (filterInputWidth - this.filterInputMinWidth > filterButtonsToolbarWidth) {\n        dispatch(actions.filterBarDisplayModeSet(FILTERBAR_DISPLAY_MODES.WIDE));\n      }\n    }\n  }\n')),Object(r.b)("p",null,'So, i thought, "Ok, when i don\'t understand something in a project that i developed with my university colleagues, i try understand, searching or asking to them, why i dont make the same here?"'),Object(r.b)("p",null,"Initially, i was very ashamed of asking to someone(who knows me, knows that i very ashamed, fortunately i'm working on this in last days haha), but as i became aware of developer interactions with the community, I saw how much each one is always willing to teach how each thing is done and help you deal with some problem."),Object(r.b)("p",null,"And so I started to get involved, I went to download the project and set up, and i had many problems, the majority i got resolve looking the issues reported and resolved by community, but  there was one, that i can't remember, that i couldn't. I had to send a message in firefox chat and in few minutes, a developer answered me and i got fix the problem(Thanks to ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://twitter.com/nicolaschevobbe"}),"Nicholas Chevobbe"),")"),Object(r.b)("p",null,"And it was so that i finally got set up the project in my machine, then, don't be afraid of ask for help, when you feel very lost in a thing, surely, there will be someone willing to help you."),Object(r.b)("p",null,"An ",Object(r.b)("strong",{parentName:"p"},"important")," part that I forgot to mention is that in order to set things up on my machine, I first read ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://docs.firefox-dev.tools/"}),"this documentation"),". And i follow the instructions, it's very complete both explains the configuration and their workflow, code patterns etc"),Object(r.b)("h1",{id:"first-things-first"},"First things first"),Object(r.b)("p",null,Object(r.b)("img",Object(o.a)({parentName:"p"},{src:"https://media.giphy.com/media/7zYMmNDKi8SYDAbxLB/giphy.gif",alt:null}))),Object(r.b)("p",null,"Once i had set up the project, i was very excited to start developing, after all, i was almost achieving realize my dream of contribute to firefox!!"),Object(r.b)("p",null,'One more time, i was a little confuse, then what should i do? I asked to the guy who helped me, as i could start to contribute. Who has a little experience with open source, knows that the majority of communities have some issues labeled as "Good First Issue", so what he recommended for me was look two links:\n1. ',Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://codetribute.mozilla.org/projects/devtools?tag%3Dgood-first-bug"}),"CodeTribute Good First Issues"),"\n2. ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://bugs.firefox-dev.tools/?easy&tool=all"}),"Firefox Dev Tools Bugs")),Object(r.b)("p",null,"Then, i read one problem, ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://bugzilla.mozilla.org/show_bug.cgi?id=1421342"}),"this"),', I thought, "HERE IS MY FIRST PROBLEM!", I, as well as the mentor, we underestimate the problem, when reopening the discussion, the maintaners realized that it was not so simple, I had to talk to the network team, change some files that are not so intuitive for beginners, which made me look for others problems'),Object(r.b)("p",null,"The second that i found was ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://bugzilla.mozilla.org/show_bug.cgi?id=1457111"}),"this"),". In short, when we had a link tag, we needed to show an option to copy the link from that tag. Previously, we needed to copy the entire tag and manually extract the link. If you read the topic, I initially understood the problem in a different way, i wanted to use regex, because I did not know it included an html tag. But then a mentor went there and explained what really should be done, and he even suggested a tool to debug and better visualize what I was doing and that starts the next topic."),Object(r.b)("p",null,"(As you noticed, i fail many times, but fortunately always there was someone who helped me, so do not be afraid to try !!)"),Object(r.b)("h1",{id:"use-tools-to-your-favor--debug"},"Use tools to your favor & debug"),Object(r.b)("p",null,Object(r.b)("img",Object(o.a)({parentName:"p"},{src:"https://media.giphy.com/media/102h4wsmCG2s12/giphy.gif",alt:null}))),Object(r.b)("p",null,"As i said before, the documentation explains very well each module, for example, when i needed modified some thing in console, i went directly in ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/mozilla/gecko-dev/tree/master/devtools/client/webconsole"}),"webconsole directory")," and i tried to find a code relationed with the issue description."),Object(r.b)("p",null,"To help me debug the code of the browser, i used the ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Tools/Browser_Toolbox"}),"tool")," quoted earlier, it's very important that you use it, because we are accustomed to do to analyze a web development project looking at the browser console, but what happens if we are developing the browser console?"),Object(r.b)("p",null,"We can not see through the console, the code of the browser console itself, so we use it, and it is so indispensable in our development."),Object(r.b)("p",null,"Also, to complement the documentation studies, I found ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Tools"}),"this link")," is quite interesting, because it gives an explanation of some internal things of these tools ."),Object(r.b)("p",null,"Basically I analyzed the code using this browser tool box tool, and looking at the doc along with that link, and sometimes when I did not really find the link of the thing I needed, I would ask someone else, then once again DO NOT FEEL FEAR!!!"),Object(r.b)("p",null,"Once you've done that, you'll already have the knowledge to submit your first pr (or what they call it, your patch) in the documentation, explain everything right, how you assign it to a reviewer, how to commit. It's worth mentioning that they use a different git system, it's the mercurial one, but it's very similar to the way things are done, so if you know git, you'll be able to unroll."),Object(r.b)("p",null,"One of the coolest parts when I submitted my first pr and it was accepted was to be recognized in the chat, I was so happy, so happy that I even took print of that moment:"),Object(r.b)("p",null,Object(r.b)("img",Object(o.a)({parentName:"p"},{src:"https://user-images.githubusercontent.com/14113480/57582306-536d4880-7499-11e9-9c24-14d69c7d9477.png",alt:"Captura de tela_2019-03-23_11-04-14"}))),Object(r.b)("p",null,"In addition, almost every week, they post on their blog the update of the week, including the work of contributors, and my name appeared on the page, twice, people, I was very happy !!!!!!!!!!!!!!!!"),Object(r.b)("p",null,Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://blog.nightly.mozilla.org/2019/03/15/these-weeks-in-firefox-issue-55/"}),"Week 1"),"\n",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://blog.nightly.mozilla.org/2019/04/05/these-weeks-in-firefox-issue-56/"}),"Week 2")),Object(r.b)("p",null,"So once again, do not be afraid to contribute to the firefox community, I overcame my fear and shame, and I felt very accomplished, and not only that, be sure that you will be very well recognized for your work, the community is very receptive and welcoming, so I leave here my experience and suggestion as an excellent community to contribute."))}h.isMDXComponent=!0},174:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var o=n(0),i=n.n(o);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=i.a.createContext({}),h=function(e){var t=i.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},d=function(e){var t=h(e.components);return i.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},p=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,a=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=h(n),p=o,b=d["".concat(a,".").concat(p)]||d[p]||u[p]||r;return n?i.a.createElement(b,s({ref:t},c,{components:n})):i.a.createElement(b,s({ref:t},c))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<r;c++)a[c]=n[c];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);